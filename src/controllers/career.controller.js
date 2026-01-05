const fs = require("fs");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.applyCareer = async (req, res) => {
  try {
    const { name, email, about, jobTitle } = req.body;
    const resume = req.file;

    if (!name || !email || !about || !jobTitle || !resume) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await resend.emails.send({
      from: "Ogenz Careers <onboarding@resend.dev>",
      to: ["sivashankar.mk16@gmail.com"], // HR email
      subject: `New Job Application – ${jobTitle}`,
      html: `
        <h3>New Career Application</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Job Title:</b> ${jobTitle}</p>
        <p><b>About:</b><br/>${about}</p>
      `,
      attachments: [
        {
          filename: resume.originalname,
          content: fs.readFileSync(resume.path),
        },
      ],
    });

    // 🧹 cleanup uploaded file
    fs.unlinkSync(resume.path);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("CAREER EMAIL ERROR 👉", error);
    res.status(500).json({ error: "Application failed" });
  }
};
