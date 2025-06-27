const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    displayPix: { type: String, required: true },
    documentType: {
        type: String,
        enum: ['Passport', 'Driver License', 'National ID', 'Voter ID'],
        required: true
    },
    frontImage: { type: String, required: true },
    backImage: { type: String, required: true },

    user: { // Clear that this links to User
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    }
});

const KYC = mongoose.model('KYC', kycSchema);
module.exports = KYC;
