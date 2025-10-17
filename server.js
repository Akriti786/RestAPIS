const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(express.json());

// Routes
app.use('/employee', employeeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('🌐 Employee API is running!');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
