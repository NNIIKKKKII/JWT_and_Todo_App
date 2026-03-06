import jwt from "jsonwebtoken"
import User from "../models/userModel.js"




const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        res.status(401).json({ message: "Unauthorized" })
    }

    const token = req.headers.authorization.split(" ")[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)


    try {

        req.user = await User.findById(decoded.id).select("-password")
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Unauthorized" })
    }

}


export default verifyToken