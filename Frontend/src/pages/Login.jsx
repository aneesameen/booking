import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false);

    const { setUser } = useContext(UserContext)

    const loginUser = async (ev) => {
        ev.preventDefault();
        try {
            const respone = await axios.post('/login', { email, password });
            setUser(respone.data);
            setRedirect(true)
        } catch (e) {
            alert("login failed")
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">LOGIN</h1>
                <form onSubmit={loginUser} className="max-w-md mx-auto">
                    <input type="email"
                        placeholder="enter@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account? <Link to={'/signup'} className="text-black underline hover:text-primary">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login