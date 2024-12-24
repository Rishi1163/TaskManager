import express from 'express';
import { User } from '../Models/users.models.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router();

//signup
router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!username || username.length < 4) {
            return res.status(400).json({ message: "Username must at least have 4 characters" });
        }

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Check for existing email and username
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        const hashPass = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({ username, email, password: hashPass });
        await newUser.save();
        console.log(newUser);
        return res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentails" })
        }
        bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [{ name: username }, { jti: jwt.sign({}, process.env.SECRET) }]
                const token = jwt.sign({ authClaims }, process.env.SECRET, { expiresIn: "2d" })
                res.status(200).json({ id: existingUser._id, token:token })
            } else {
                return res.status(400).json({ message: "Invalid credentails" })
            }
        })
    } catch (error) {
        console.log("Login error:", error);
    }
})

export default router;
