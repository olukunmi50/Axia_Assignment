const KYC = require('../Model/Kyc.Model');
const User = require('../Model/User.Model');

const submitKYC = async (req, res) => {
  const { displayPix, documentType, frontImage, backImage } = req.body;
  const { id } = req.user; 

  // Basic input validation
  if (!displayPix || !documentType || !frontImage || !backImage) {
    return res.status(400).json({ error: "All KYC fields are required" });
  }

  try {
    // Check if KYC already exists for the user
    const existingKYC = await KYC.findOne({ user: id });
    if (existingKYC) {
      return res.status(400).json({ error: "KYC already submitted" });
    }

    // Create and save new KYC
    const newKYC = new KYC({
      displayPix,
      documentType,
      frontImage,
      backImage,
      user: id
    });

    const savedKYC = await newKYC.save();

    // Update User document with reference to KYC
    await User.findByIdAndUpdate(id, { kyc: savedKYC._id });

    res.status(201).json(savedKYC);
  } catch (err) {
    console.error("KYC submission error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { submitKYC };
