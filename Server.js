const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://impanab:LO9bNZzNTeHd4T6r@cluster0.mfuivmf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model('FormData', FormDataSchema);


app.use(bodyParser.json());
app.use(cors({
  origin:['http://localhost:3000','https://impana-b-portfolio.netlify.app']
})); 


app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const formData = new FormData({
      name,
      email,
      message,
    });

    await formData.save();
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Failed to save form data' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
