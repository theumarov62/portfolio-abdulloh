require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Email yuborish endpoint
app.post("/send", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Email va xabar kerak!" });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Portfolio orqali xabar",
      text: message,
      replyTo: email,
    });

    console.log("Xabar yuborildi: ", info.messageId);
    res.json({ success: true, message: "✅ Xabar yuborildi!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "❌ Xabar yuborishda xatolik!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
