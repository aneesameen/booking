import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";


function ProfilePage() {

    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logout = async () => {
        await axios.post("/logout");
        setRedirect('/');
        setUser(null);
    }


    if (!ready) {
        return <LoadingScreen />;
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-sm mx-auto mt-20">
                    logged in as {user?.name} ({user?.email})
                    <br />
                    <button onClick={logout} className="primary font-medium max-w-sm mt-2 hover:bg-red-400 delay-100">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}
export default ProfilePage