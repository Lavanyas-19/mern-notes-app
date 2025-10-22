const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/notes', noteRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` API Link: http://localhost:${PORT}/api/notes`);
});
