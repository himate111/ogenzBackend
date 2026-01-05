const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await resend.emails.send({
      from: "Ogenz Website <onboarding@resend.dev>",
      to: ["sivashankar.mk16@gmail.com"],
      subject: "New Newsletter Subscription",
      html: `<p><b>New subscriber:</b> ${email}</p>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("NEWSLETTER ERROR 👉", error);
    res.status(500).json({ error: "Newsletter failed" });
  }
};
