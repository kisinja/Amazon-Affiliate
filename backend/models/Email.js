const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
    },
    { timestamps: true }
);

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;