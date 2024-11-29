const Email = require("../models/Email");

// @desc    Subscribe email
// @route   POST /api/subscribe
// @access  Public
const subscribeEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }

    try {
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email is already subscribed." });
        }

        const newEmail = new Email({ email });
        await newEmail.save();
        return res.status(200).json({ success: true, message: "Successfully subscribed!" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { subscribeEmail };