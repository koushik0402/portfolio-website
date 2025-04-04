import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Successfully connected to MongoDB!');
    
    // Test creating a document
    const testSchema = new mongoose.Schema({
      test: String
    });
    const Test = mongoose.model('Test', testSchema);
    
    const testDoc = new Test({ test: 'Hello MongoDB!' });
    await testDoc.save();
    console.log('Successfully created a test document!');
    
    // Clean up
    await Test.deleteMany({});
    console.log('Test document cleaned up!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

testConnection(); 