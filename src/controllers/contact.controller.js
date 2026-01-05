const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await resend.emails.send({
      from: "Ogenz Website <onboarding@resend.dev>", // allowed default
      to: ["sivashankar.mk16@gmail.com"],
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("RESEND ERROR 👉", error);
    res.status(500).json({ error: "Email failed" });
  }
};
