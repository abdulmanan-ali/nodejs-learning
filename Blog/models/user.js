const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../utils/authentication");

const user = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        profileImageURL: {
            type: String,
            default: "/images/default.png",
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
);

user.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex");
    const hashPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashPassword;

    next();
});

user.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("Incorrect User");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");
    const token = createTokenForUser(user);

    return token;
});

const userAuth = mongoose.model("userauth", user);

module.exports = userAuth;
