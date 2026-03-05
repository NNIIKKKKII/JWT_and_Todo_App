import { useState } from "react"
import { registerUser } from "../api/userApi"




const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })




    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }


    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const res = await registerUser(form)

            localStorage.setItem("token", res.data.token)

            window.location.href = "/dashboard"

        } catch (err) {
            console.log(err.response?.data || err.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleRegister}
                className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-96">

                <h2 className="text-2xl font-bold text-center">Register</h2>

                <input
                    type="text"
                    placeholder="Type your name"
                    name="name"
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="email"
                    placeholder="Type your email here"
                    name="email"
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Type your password here"
                    name="password"
                    onChange={handleChange}
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Register
                </button>

            </form>

        </div>
    )





}



export default Register;