const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    recruiterName: String,
    email: String,
    companyName: String,
    jobId: String,
    profile: String,
    date: { type: Date, default: Date.now },
    sent: { type: Boolean, default: false }
});

const Email = mongoose.model('Email', emailSchema);

mongoose.connect('mongodb://localhost:27017/Applications', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

module.exports = Email;
