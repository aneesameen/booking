import { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function PlacesForm() {

    const { id } = useParams();
    console.log(id)

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setECheckIn] = useState("");
    const [checkOut, setECheckOut] = useState("");
    const [maxGuest, setMaxGuest] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/places/" + id).then(response => {
            const { data } = response;

            setTitle(data?.title);
            setAddress(data?.address);
            setAddedPhotos(data?.photos);
            setDescription(data?.description);
            setPerks(data?.perks);
            setExtraInfo(data?.extraInfo);
            setECheckIn(data?.checkIn);
            setECheckOut(data?.checkOut);
            setMaxGuest(data?.maxGuest);
        })
    }, [id])

    const savePlace = async (ev) => {
        ev.preventDefault();
        if (id) {
            //update an existing place
            await axios.put("/places", {
                id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest
            });
            setRedirect(true);
        } else {
            //create new place
            await axios.post("/places", {
                title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest
            });
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={"/account/places"} />
    }

    return (
        <div className="">
            <AccountNav />
            <form onSubmit={savePlace}>
                {/* --------------title-------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Title</h2>
                <input type="text"
                    placeholder="title of your place"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />


                {/* ------------------address-------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Address</h2>
                <input type="text"
                    placeholder="address of your place"
                    value={address}
                    onChange={ev => setAddress(ev.target.value)}
                />


                {/* -------------------------photos------------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Photos</h2>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />


                {/* ---------------------------description------------------------ */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Description</h2>
                <textarea
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />


                {/* --------------------------------amenities--------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">Amenities</h2>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    <Perks selected={perks} onChange={setPerks} />
                </div>


                {/* ----------------------------------extra info------------------ */}
                <h2 className="text-2xl font-medium mt-6 pl-1">Extra Info</h2>
                <textarea
                    placeholder="About your place"
                    value={extraInfo}
                    onChange={ev => setExtraInfo(ev.target.value)}
                />


                {/* ------------------------------house rules-------------------------- */}
                <h2 className="text-2xl font-medium mt-4 pl-1">House Rules</h2>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div className="border px-4 rounded-2xl">
                        <h3 className="mt-2 mb-2">check-In</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="time"
                            value={checkIn}
                            onChange={ev => setECheckIn(ev.target.value)}
                        />
                    </div>

                    <div className="border px-4 rounded-2xl">
                        <h3 className="mt-2 mb-2">check-Out</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="time"
                            value={checkOut}
                            onChange={ev => setECheckOut(ev.target.value)}
                        />
                    </div>

                    <div className="border px-4 pb-2 rounded-2xl">
                        <h3 className="mt-2 mb-2">Maximum guests</h3>
                        <input className=" border border-gray-400 outline-none px-2 rounded-2xl"
                            type="number"
                            min={1}
                            value={maxGuest}
                            onChange={ev => setMaxGuest(ev.target.value)}
                        />
                    </div>
                </div>


                {/* -------------------------------------button------------------------------- */}
                <div className="text-center">
                    <button className="primary mt-8 mb-4 max-w-sm">Save</button>
                </div>
            </form>
        </div>
    )
}
export default PlacesForm