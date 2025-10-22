import nodemailer from "nodemailer";

// Helper function to create a test account
const getTestAccount = () => {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a test account: " + err.message);
        reject(err);
      } else {
        console.log("✅ Ethereal Test Account created");
        resolve(account);
      }
    });
  });
};

const sendEmail = async (options) => {
  try {
    const testAccount = await getTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },

      connectionTimeout: 5000
    });

    const mailOptions = {
      from: `"ShopVerse Test" <test@shopverse.com>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent (caught by Ethereal): %s", info.messageId);
    
    // ** THE IMPORTANT CHANGE **
    // Return the URL instead of just logging it
    return nodemailer.getTestMessageUrl(info);

  } catch (error) {
    console.error("❌ Ethereal Email error:", error);
    throw new Error(error.message);
  }
};

export default sendEmail;