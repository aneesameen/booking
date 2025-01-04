import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";


function BookingCard({ singlePlace }) {

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [redirect, setRedirect] = useState("");

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user?.name)
        }
    }, [user])


    let totalNoOfDays = 0;
    if (checkIn && checkOut) {
        totalNoOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const bookPlace = async () => {
        try {
            const response = await axios.post("/bookings", {
                checkIn, checkOut, noOfGuests, name,
                phoneNo, place: singlePlace._id,
                price: totalNoOfDays * singlePlace?.price
            });
            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`)
        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-xl text-center">
                Price : ₹{singlePlace?.price}/night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col md:flex-row">
                    <div className="py-3 px-4">
                        <label>Check-In:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check-Out:</label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Guests:</label>
                    <input className="outline-none border px-2 rounded-2xl ml-2"
                        min={1}
                        type="number"
                        value={noOfGuests}
                        onChange={ev => setNoOfGuests(ev.target.value)}
                    />
                </div>
                {totalNoOfDays > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Full Name:</label>
                        <input className="outline-none border px-2 rounded-2xl ml-2 capitalize"
                            type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                        <label>Phone:</label>
                        <input className="outline-none border px-2 rounded-2xl ml-2 capitalize"
                            type="tel"
                            value={phoneNo}
                            onChange={ev => setPhoneNo(ev.target.value)}
                        />
                    </div>
                )}
            </div>
            <button onClick={bookPlace} className="primary mt-4">
                Book Now
                {totalNoOfDays > 0 && (
                    <>
                        <span> ₹{totalNoOfDays * singlePlace?.price}</span>
                    </>
                )}
            </button>
        </div>
    )
}
export default BookingCard