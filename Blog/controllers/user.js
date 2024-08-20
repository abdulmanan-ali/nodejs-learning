const user = require("../models/user");

const handleUserSignup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        await user.create({
            fullName,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error creating user");
    }
};

const handleUserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await user.matchPassword(email, password);

        return res.cookie("token", token).redirect("/");
    } catch (error) {
        res.render("signin", {
            error: "Incorrect email or Password",
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token").redirect("/")
};




module.exports = { handleUserSignup, handleUserSignin, logout }; 
