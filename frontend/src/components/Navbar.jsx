import { Link } from "react-router-dom"

const Navbar = () => {


    const logOut = () => {
        localStorage.removeItem("token")
        windows.location.href = "/login"
    }

    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
            <div className="flex items-center space-x-4">
                {/* <Link to="/" className="text-xl font-bold">Home</Link> */}
                <Link to="/dashboard" className="text-xl font-bold">Dashboard</Link>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={logOut} className="text-xl font-bold">Logout</button>
            </div>
        </nav>
    )
}