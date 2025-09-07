const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔍 DEBUG: Check environment variables
console.log('🔍 Environment Variables Check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Missing');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅ Loaded' : '❌ Missing');
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✅ Loaded' : '❌ Missing');
console.log('PORT:', process.env.PORT || 5000);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://DigiBlaise-client.onrender.com'], // Add your frontend URLs
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('💡 Please check your MONGODB_URI in the .env file');
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Gmail Transporter with better error handling
let transporter = null;

const setupEmailTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('⚠️  Email service disabled - missing Gmail credentials');
    return null;
  }

  const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Verify email configuration
  emailTransporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email configuration error:', error.message);
      console.error('💡 Please check your Gmail credentials in .env file');
    } else {
      console.log('✅ Gmail transporter is ready to send emails');
    }
  });

  return emailTransporter;
};

transporter = setupEmailTransporter();

// Contact Form Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields' 
      });
    }

    // Additional validation
    if (name.length > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name cannot exceed 100 characters' 
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message cannot exceed 1000 characters' 
      });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Save to database
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      message: message.trim()
    });

    await newContact.save();
    console.log('✅ Contact saved to database:', name);

    // Send emails if transporter is available
    let emailSent = false;
    if (transporter) {
      try {
        // Send thank you email to client
        const clientMailOptions = {
          from: process.env.GMAIL_USER,
          to: email,
          subject: 'Thank you for your inquiry - DigiBlaise',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #FF6A00; margin: 0; font-size: 24px; font-weight: bold;">DigiBlaise</h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 15px; margin-bottom: 20px;">
                <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Thank you for your inquiry!</h2>
                <p style="color: #555; margin: 0 0 15px 0; line-height: 1.6;">Hi ${name},</p>
                <p style="color: #555; margin: 0 0 15px 0; line-height: 1.6;">
                  Thank you for reaching out to DigiBlaise! We've received your inquiry and our team is excited to learn more about your project.
                </p>
                <p style="color: #555; margin: 0 0 15px 0; line-height: 1.6;">
                  We'll review your message and get back to you within 1 business day with a detailed response and next steps.
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">Your submission details:</h3>
                <p style="color: #666; margin: 5px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Message:</strong> ${message}</p>
              </div>
              
              <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
                <p style="color: #666; margin: 0; font-size: 14px;">
                  Best regards,<br>
                  <strong style="color: #FF6A00;">The DigiBlaise Team</strong>
                </p>
              </div>
            </div>
          `
        };

        // Send notification email to you
        const notificationMailOptions = {
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER,
          subject: `🚀 New Contact Request from ${name} - DigiBlaise`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #FF6A00; margin: 0; font-size: 24px; font-weight: bold;">New Contact Request 📧</h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 15px; margin-bottom: 20px;">
                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 18px;">Contact Details:</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #FF6A00;">Name:</strong>
                  <span style="color: #333; margin-left: 10px; font-size: 16px;">${name}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #FF6A00;">Email:</strong>
                  <span style="color: #333; margin-left: 10px; font-size: 16px;">${email}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #FF6A00;">Company:</strong>
                  <span style="color: #333; margin-left: 10px; font-size: 16px;">${company || 'Not provided'}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #FF6A00;">Message:</strong>
                  <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 8px; border-left: 4px solid #FF6A00;">
                    <p style="color: #333; margin: 0; line-height: 1.6;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
                  <strong style="color: #FF6A00;">Submitted:</strong>
                  <span style="color: #666; margin-left: 10px;">${new Date().toLocaleString()}</span>
                </div>
              </div>
              
              <div style="text-align: center; padding: 15px; background-color: #FF6A00; border-radius: 10px;">
                <p style="color: white; margin: 0; font-weight: bold; font-size: 16px;">
                  🚀 New lead alert! Follow up within 24 hours for best results.
                </p>
              </div>
            </div>
          `,
          text: `New Contact Request from ${name}
          
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Message: ${message}
Submitted: ${new Date().toLocaleString()}
          `
        };

        // Send both emails
        await Promise.all([
          transporter.sendMail(clientMailOptions),
          transporter.sendMail(notificationMailOptions)
        ]);

        emailSent = true;
        console.log('✅ Emails sent successfully to:', email);
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError.message);
        // Continue without failing the request
      }
    }

    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully!' + (emailSent ? ' Check your email for confirmation.' : ''),
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        company: newContact.company,
        createdAt: newContact.createdAt,
        emailSent: emailSent
      }
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    
    // Send appropriate error message
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed: ' + errorMessages.join(', ')
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.' 
    });
  }
});

// Get all contacts (Admin route)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .select('-__v') // Exclude version field
      .sort({ createdAt: -1 }) // Most recent first
      .limit(100); // Limit to 100 contacts

    res.status(200).json({ 
      success: true, 
      count: contacts.length,
      contacts: contacts 
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contacts' 
    });
  }
});

// Get single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      contact: contact 
    });
  } catch (error) {
    console.error('❌ Error fetching contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contact' 
    });
  }
});

// Delete contact by ID (Admin route)
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Contact deleted successfully' 
    });
  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete contact' 
    });
  }
});

// Test email route (for testing email functionality)
app.post('/api/test-email', async (req, res) => {
  try {
    if (!transporter) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email service not configured' 
      });
    }

    const testMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: '✅ DigiBlaise Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #FF6A00;">Email Test Successful!</h2>
          <p>Your email configuration is working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Test email sent successfully!' 
    });
  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Test email failed: ' + error.message 
    });
  }
});

// Health check route with detailed status
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.status(200).json({ 
    success: true,
    status: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: mongoStates[mongoStatus],
      connected: mongoStatus === 1
    },
    email: {
      configured: !!transporter,
      service: transporter ? 'Gmail' : 'Not configured'
    },
    version: '1.0.0'
  });
});

// 404 handler - Fixed to avoid path-to-regexp error
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 DigiBlaise Server Started`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`📊 Admin contacts: http://localhost:${PORT}/api/contacts`);
  console.log('='.repeat(50) + '\n');
});