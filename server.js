const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/send", async (req, res) => {
  const { email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdulloumarov810@gmail.com",
        pass: "cjud fyvq pzbv ehzy",
      },
    });

    let info = await transporter.sendMail({
      from: "abdulloumarov810@gmail.com",
      to: "abdulloumarov810@gmail.com",
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
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});
