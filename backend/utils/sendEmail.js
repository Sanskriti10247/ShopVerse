import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"ShopVerse" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful");
    const info = await transporter.sendMail(mailOptions);
    console.log("📤 Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error);
    throw new Error(error.message); // This correctly stops the process if email fails
  }
  
  // DELETE THE EXTRA CALL THAT WAS HERE
  // await transporter.sendMail(mailOptions); 
};

export default sendEmail;