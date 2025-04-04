import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Subscriber from './models/Subscriber';
import Admin from './models/Admin';
import { auth } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Admin registration (you may want to remove this after creating the first admin)
app.post('/api/admin/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const admin = new Admin({ username, password, email });
    await admin.save();
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your-default-secret');
    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create admin' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      throw new Error('Invalid credentials');
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your-default-secret');
    res.json({ admin, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Email to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'koushikyadavgundaveni@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me',
      html: `
        <h3>Thank you for reaching out!</h3>
        <p>Hi ${name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Koushik Yadav</p>
      `
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to newsletter' });
  }
});

// Protected subscriber management endpoints
app.get('/api/subscribers', auth, async (_req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers' });
  }
});

// Delete subscriber
app.delete('/api/subscribers/:id', auth, async (req: Request, res: Response) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      res.status(404).json({ message: 'Subscriber not found' });
      return;
    }
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscriber' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 