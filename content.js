exports.createEmail = (recruiterName, companyName = null, jobProfile = null, jobId = null) => {
  const subject = `Experienced MERN Stack Developer Seeking New Opportunities${companyName ? ` at ${companyName}` : ''}`;
  const greeting = recruiterName ? `Dear ${recruiterName}` : "Greetings,";

  let body = `
  <p>${greeting},</p>

  <p>I hope this email finds you well.</p>

  <p>My name is <strong>Vikas Raria</strong>, and I am writing to express my interest in exploring new career opportunities. With <strong>over 3 years of experience</strong> in the tech industry, I have honed my skills in both multinational corporations and startup environments, excelling in various roles across the development spectrum.</p>

  <p>Throughout my career, I have specialized in the <strong>MERN Stack</strong>, with a strong focus on <strong>React</strong> and <strong>Node.js</strong>. My expertise includes developing robust <strong>fullstack applications</strong>, creating dynamic <strong>frontend interfaces</strong>, and building efficient <strong>backend systems</strong>. I am particularly passionate about leveraging my skills to drive innovation and efficiency in the projects I undertake.</p>
  `;

  if (companyName) {
      body += `<p>I am particularly interested in opportunities at <strong>${companyName}</strong>.</p>`;
  }

  if (jobProfile) {
      body += `<p>I am seeking a role as a <strong>${jobProfile}</strong>.</p>`;
  }

  if (jobId) {
      body += `<p>Please consider my application for Job ID: <strong>${jobId}</strong>.</p>`;
  }

  body += `
  <p>I am seeking opportunities in <strong>fullstack</strong>, <strong>frontend</strong>, or <strong>backend development</strong> roles, where I can contribute to exciting and impactful projects. I am confident that my experience and dedication to delivering high-quality solutions would be valuable assets to your organization.</p>

  <p>I have attached my resume for your review and would appreciate the opportunity to discuss how my background, skills, and certifications can align with the needs of your team. Thank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you.</p>

  <p><strong>Please reply to this mail or click on any of the below links to connect.</strong></p>

  <p>Best regards,</p>

  <p>Vikas Raria<br/>
  <a href="tel:+918708373309">+91 8708373309</a><br/>
  <a href="https://api.whatsapp.com/send?phone=918708373309" target="_blank">Chat on WhatsApp</a><br/>
  <a href="https://www.linkedin.com/in/vikasraria" target="_blank">LinkedIn Profile</a></p>
  `;

  return { subject, body };
};

