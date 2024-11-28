const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/mern-stack', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// MongoDB schema
const NameSchema = new mongoose.Schema({
  name: String
});
const Name = mongoose.model('Name', NameSchema);

// Routes
app.post('/add-name', async (req, res) => {
  const newName = new Name({ name: req.body.name });
  await newName.save();
  res.send('Name added successfully!');
});

app.get('/names', async (req, res) => {
  const names = await Name.find();
  res.json(names);
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
