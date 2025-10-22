import nodemailer from "nodemailer";

// Best-effort email sender. Never throws; logs and returns boolean for success.
const sendEmail = async ({ to, subject, html }) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // If email credentials are not configured in the environment, skip silently
  if (!emailUser || !emailPass) {
    console.warn(
      "⚠️ EMAIL_USER/EMAIL_PASS not set; skipping email delivery to:",
      to
    );
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: emailUser, pass: emailPass },
  });

  try {
    const info = await transporter.sendMail({
      from: `"ShopVerse" <${emailUser}>`,
      to,
      subject,
      html,
    });
    console.log("📤 Email sent:", info?.response || info?.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email send failed:", error?.message || error);
    return false;
  }
};

export default sendEmail;
