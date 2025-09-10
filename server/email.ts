
import nodemailer from 'nodemailer';
import type { ContactSubmission } from '@shared/schema';

// Ensure that environment variables are loaded before this file is imported.
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Create a transporter object using Gmail's SMTP transport
// This will only work if the environment variables are set.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports (587 uses STARTTLS)
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Function to send the contact form email
export async function sendContactEmail(submission: ContactSubmission) {
  if (!emailUser || !emailPass) {
    console.error(
      "Email credentials are not set. Skipping email sending. " +
      "Please create a .env file in the /server directory with EMAIL_USER and EMAIL_PASS."
    );
    return; // Do not proceed if credentials are not found
  }

  const mailOptions = {
    from: `"Zyberian Website" <${emailUser}>`,
    to: 'techveltrix@gmail.com',
    subject: `New Contact Form Submission from ${submission.name}`,
    text: `
      You have received a new contact form submission:

      Name: ${submission.name}
      Email: ${submission.email}
      Company: ${submission.company || 'N/A'}
      Project Type: ${submission.projectType || 'N/A'}
      Budget: ${submission.budget || 'N/A'}
      Timeline: ${submission.timeline || 'N/A'}
      Message:
      ${submission.message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Company:</strong> ${submission.company || 'N/A'}</p>
      <p><strong>Project Type:</strong> ${submission.projectType || 'N/A'}</p>
      <p><strong>Budget:</strong> ${submission.budget || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${submission.timeline || 'N/A'}</p>
      <h3>Message:</h3>
      <p>${submission.message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
