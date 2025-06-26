const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Routes
app.get('/api/pdfs', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({ error: 'Error reading PDFs' });
    }
    
    const pdfFiles = files
      .filter(file => file.endsWith('.pdf'))
      .map(file => ({
        name: file,
        path: `/uploads/${file}`,
        url: `/api/pdfs/${file}`,
        createdAt: fs.statSync(path.join(uploadsDir, file)).birthtime
      }));
    
    res.json(pdfFiles);
  });
});

app.get('/api/pdfs/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  
  if (fs.existsSync(filePath)) {
    // Check if the file is a PDF
    if (path.extname(filePath).toLowerCase() !== '.pdf') {
      return res.status(400).json({ error: 'File is not a PDF' });
    }
    
    // Send the PDF file
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'PDF not found' });
  }
});

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    console.log('Upload request received:', req.file);
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File details:', {
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

    // Check if file exists and is accessible
    try {
      await fs.promises.access(req.file.path, fs.constants.R_OK);
    } catch (err) {
      console.error('File access error:', err);
      return res.status(500).json({ error: 'Error accessing uploaded file' });
    }

    try {
      // Extract text from PDF for potential search functionality
      const dataBuffer = fs.readFileSync(req.file.path);
      console.log('File read successfully, size:', dataBuffer.length);
      
      const data = await pdfParse(dataBuffer);
      console.log('PDF parsed successfully');
      
      res.status(201).json({
        message: 'File uploaded successfully',
        file: {
          name: req.file.originalname,
          filename: req.file.filename,
          path: `/uploads/${req.file.filename}`,
          url: `/api/pdfs/${req.file.filename}`,
          text: data.text ? data.text.substring(0, 200) + '...' : 'No text extracted'
        }
      });
    } catch (parseError) {
      console.error('Error parsing PDF:', parseError);
      throw parseError; // This will be caught by the outer catch
    }
  } catch (error) {
    console.error('Error in upload handler:', error);
    res.status(500).json({ 
      error: 'Error processing file',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date().toISOString() });
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
