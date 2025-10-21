//Testing real emails from the backend using Nodemailer
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const run = async () => {
  console.log("🚀 Sending real Gmail test...");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: `"ShopVerse" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, 
    subject: "Real Gmail test from ShopVerse",
    html: `
      <h2>This is a real email from your backend</h2>
      <p>If you can read this, Nodemailer + Gmail App Password works perfectly.</p>
    `,
  };

  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful");
    const info = await transporter.sendMail(mailOptions);
    console.log("📤 Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
};

run();
