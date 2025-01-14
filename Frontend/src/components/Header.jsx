import { FaHotel } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { BASE_URL } from "../Constants";
import Search from "./Search";
import { useSearch } from "../context/SearchContext";

function Header() {
    const [openProfile, setOpenProfile] = useState(false);


    const openDialog = () => {
        setOpenProfile(!openProfile);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
                setOpenProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { user } = useContext(UserContext);
    const { clearSaerchResults } = useSearch()


    return (
        <div>
            <header className="flex justify-between">
                <Link to={'/'} onClick={clearSaerchResults} className="text-primary flex items-center gap-1">
                    <FaHotel className="w-8 h-8" />
                    <span className="font-bold text-xl">Airbnb</span>
                </Link>

                <Search />

                <div className="relative cursor-pointer">
                    <div
                        onClick={openDialog}
                        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 profile-button"
                    >
                        <RxHamburgerMenu className="h-5 w-5" />
                        <div className="bg-gray-500 text-white rounded-full p-1 border border-gray-500 overflow-hidden">
                            <FaUser />
                        </div>
                        {!!user && (
                            <div className="hidden md:flex font-medium capitalize">
                                {user?.name}
                            </div>
                        )}
                    </div>

                    {openProfile && (
                        <div className="absolute z-10 border bg-white whitespace-nowrap flex gap-2 items-start flex-col px-8 pr-16 py-5 top-12 right-6 rounded-lg shadow shadow-gray-600 profile-dropdown">
                            {user ? (
                                <>
                                    <Link to={'/account'} className="hover:text-primary hover:underline font-semibold text-lg">
                                        Profile
                                    </Link>
                                    <Link to={'/account/bookings'} className="hover:text-primary hover:underline font-semibold text-lg">
                                        My Bookings
                                    </Link>
                                    <Link to={'/account/places'} className="hover:text-primary hover:underline font-semibold text-lg">
                                        My Accommodations
                                    </Link>
                                    {/* <h1 className="hover:text-red-600 hover:underline font-semibold text-lg">
                                        Logout
                                    </h1> */}
                                </>
                            ) : (
                                <>
                                    <Link to={'/login'} className="hover:text-primary hover:underline font-semibold text-lg">
                                        Login
                                    </Link>
                                    <Link to={'/signup'} className="hover:text-primary hover:underline font-semibold text-lg">
                                        SignUp
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;
