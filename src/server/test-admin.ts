import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin';

dotenv.config();

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB!');

    const adminData = {
      username: 'admin',
      password: 'admin123', // This will be hashed by the pre-save hook
      email: process.env.EMAIL_USER || 'koushikyadavgundaveni@gmail.com'
    };

    console.log('Creating admin account...');
    const admin = new Admin(adminData);
    await admin.save();
    console.log('Admin account created successfully!');

    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin account:', error);
    process.exit(1);
  }
};

createAdmin(); 