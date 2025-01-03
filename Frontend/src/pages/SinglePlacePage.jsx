import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Constants";
import { MdOutlineGridView } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { SlUser } from "react-icons/sl";
import BookingCard from "../components/BookingCard";

function SinglePlacePage() {

    const { id } = useParams();

    const [singlePlace, setSinglePlace] = useState("");
    const [showAllPics, setShowAllPics] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        try {
            axios.get(`/places/${id}`).then((response => {
                setSinglePlace(response.data);
            }))
        } catch (error) {

        }
    }, [id]);

    if (!singlePlace) return "";

    if (showAllPics) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-8 border-b">
                    <h2 className="text-3xl font-semibold">{singlePlace?.title}</h2>
                    <button
                        onClick={() => setShowAllPics(false)}
                        className="fixed right-10 z-10 text-black rounded-full p-2 hover:bg-gray-200 transition duration-300"
                    >
                        <IoIosCloseCircleOutline className="text-4xl" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    {singlePlace?.photos?.length > 0 && singlePlace.photos.map((pic, index) => (
                        <div key={index} className="relative w-full h-64 md:h-80 lg:h-96">
                            <img
                                className="w-full h-full object-cover rounded-lg shadow-md"
                                src={`${BASE_URL}uploads/${pic}`}
                                alt={`photo-${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

        )
    }

    return (
        <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">

            <h1 className="text-3xl font-medium">{singlePlace?.title}</h1>
            <a className=" flex items-center my-3 gap-1 font-semibold hover:underline" href={`https://www.google.com/maps/?q=${singlePlace?.address}`} target="_blank">
                <FiMapPin />
                {singlePlace?.address}
            </a>

            <div className="relative">
                <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-3 gap-2 lg:mx-auto rounded-2xl overflow-hidden">
                    {singlePlace?.photos?.[0] && (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 h-[300px] lg:h-[400px]">
                            <img
                                onClick={() => setShowAllPics(true)}
                                className="w-full h-full object-cover rounded-l-2xl cursor-pointer"
                                src={`${BASE_URL}uploads/${singlePlace?.photos[0]}`}
                                alt="Main View"
                            />
                        </div>
                    )}
                    {singlePlace?.photos?.[1] && (
                        <div className="h-[150px] lg:h-[200px]">
                            <img
                                onClick={() => setShowAllPics(true)}
                                className="w-full h-full object-cover cursor-pointer"
                                src={`${BASE_URL}uploads/${singlePlace?.photos[1]}`}
                                alt="Secondary View 1"
                            />
                        </div>
                    )}
                    {singlePlace?.photos?.[2] && (
                        <div className="h-[150px] lg:h-[200px] overflow-hidden cursor-pointer">
                            <img
                                onClick={() => setShowAllPics(true)}
                                className="w-full h-full object-cover relative -top-2"
                                src={`${BASE_URL}uploads/${singlePlace?.photos[2]}`}
                                alt="Secondary View 2"
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowAllPics(true)}
                    className="flex items-center gap-1 absolute bottom-4 right-2 md:right-4 py-2 px-4 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                    <MdOutlineGridView />
                    More Pics
                </button>
            </div>


            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
                <div>
                    {/* <h2 className="font-medium capitalize">Hosted By : {singlePlace?.owner?.name}</h2> */}
                    <div className="flex flex-wrap gap-3 items-center ">
                        <SlUser className="text-2xl" />
                        <h1 className="font-medium text-2xl">Hosted By : </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="capitalize font-medium text-2xl">
                                {singlePlace?.owner?.name}
                            </h2>
                        </div>
                    </div>

                    <hr className="border border-gray-300 my-6" />

                    <div className="">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        <h2>{singlePlace?.description}</h2>
                    </div>
                    <hr className="border border-gray-300 my-6" />
                    <div className="flex flex-wrap justify-between items-center">
                        <div>
                            Check-In : {singlePlace?.checkIn} <br />
                            Check-Out : {singlePlace?.checkOut} <br />
                            Max-Guests : {singlePlace?.maxGuest}
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <h2 className="text-xl font-semibold">Amenities</h2>
                            <div className="flex gap-1 flex-wrap">
                                {singlePlace?.perks?.length > 0 && singlePlace?.perks.map((perk, index) => (
                                    <div key={index} className="bg-gray-300 px-4 py-2 rounded-lg">
                                        {perk}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className="border border-gray-300 my-6" />

                </div>

                <div className="relative">
                    <div className="sticky md:top-46 lg:top-28 z-10">
                        <BookingCard singlePlace={singlePlace} />
                    </div>
                </div>

            </div>
            <div>
                <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
            </div>
            <div className="text-sm text-gray-800 mb-4 mt-2">
                {singlePlace?.extraInfo}
            </div>

        </div >
    )
}
export default SinglePlacePage