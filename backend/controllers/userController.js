import jwt from "jsonwebtoken";
import User from "../models/userModel.js"


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}



export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    //Validating the data
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Requires all Fields !" })
    }





    const userExists = await User.findOne({ email })


    // console.log("Could not find user")


    if (userExists) {
        return res.status(400).json({ message: "User already exists" })
    }

    let newUser;
    try {

        newUser = await User.create({ name, email, password });
        // res.status(201).json({ message: "User Created" })


        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })

    } catch (error) {
        console.log("User creation error:", error)
    }
}






export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        console.log("Entered email:", email);
        console.log("Entered password:", password);
        console.log("User from DB:", user);

        if (user) {
            const match = await user.matchPassword(password);
            console.log("Password match:", match);

            if (match) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                });
            }
        }

        return res.status(401).json({ message: "Invalid credentials" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

