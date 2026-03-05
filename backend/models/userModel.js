import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
            unique: true
        },
        password: {
            required: true,
            type: String
        }
    }
)



//hashes passowrd before saved to the DB
userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});



//created my own methods for the schema
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}




export default mongoose.model("User", userSchema);