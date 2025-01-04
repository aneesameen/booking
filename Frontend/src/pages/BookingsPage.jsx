import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from "axios"
import { BASE_URL } from "../Constants";
import { differenceInCalendarDays, format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

function BookingsPage() {

    const [bookings, setBookings] = useState("");

    useEffect(() => {
        axios.get("/bookings").then((response => {
            setBookings(response.data)
        }))
    }, [])
    return (
        <div>
            <AccountNav />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-3">
                {bookings?.length > 0 &&
                    bookings.map((booking) => (
                        <Link to={`/account/bookings/${booking?._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden" key={booking?._id}>
                            <div className="w-48">
                                {booking?.place?.photos.length > 0 && (
                                    <img
                                        className="object-cover w-full h-full"
                                        src={`${BASE_URL}uploads/${booking?.place?.photos[0]}`}
                                        alt="image"
                                    />
                                )}
                            </div>

                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl font-medium">{booking?.place?.title}</h2>
                                <div className="text-sm text-gray-900 border-t border-gray-300 mt-2 py-2 flex items-center gap-2">
                                    <SlCalender />
                                    From: {format(new Date(booking.checkIn), "dd-mm-yyyy")} &rarr; To: {format(new Date(booking.checkOut), "dd-mm-yyyy")}
                                </div>
                                <div className="flex gap-10">
                                    <div className="text-md">
                                        For : {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Days <br />
                                        Price : ₹{booking?.price}
                                    </div>
                                    <div className="text-md capitalize">
                                        Resident: {booking?.name}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}
export default BookingsPage