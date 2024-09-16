const nodemailer = require('nodemailer');
const Email = require('./application.schema');

let email = {
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: "vikasraria14@gmail.com",
            pass: "fpbslhkvgyhatdik",
        },
    },
    from: "vikasraria14@gmail.com",
};
let config = { email };

const transport = nodemailer.createTransport(config.email.smtp);

transport.verify()
    .then(() => console.log('Connected to email server'))
    .catch((err) => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env', err));

const sendEmail = async (to, subject, body, attachmentPath = null, recruiterName, companyName, jobId, profile) => {
    try {
        const emailExists = await Email.findOne({ email: to, sent: true });
        if (emailExists) {
            console.log(`Email already sent to ${to}`);
            return false;
        }

        const msg = {
            from: config.email.from,
            to,
            subject,
            html: body,
            attachments: attachmentPath ? [{ path: attachmentPath }] : []
        };

        await transport.sendMail(msg);
        console.log("Mail sent to", to);

        const emailData = new Email({
            recruiterName,
            email: to,
            companyName,
            jobId,
            profile,
            sent: true,
            sentTime: new Date()
        });
        await emailData.save();
        
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

module.exports = {
    transport,
    sendEmail,
};
