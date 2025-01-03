import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../Constants"
import { Link } from "react-router-dom"

function IndexPage() {

    const [allData, setAllData] = useState("")

    useEffect(() => {
        try {
            axios.get("/allPlaces").then((response => {
                setAllData(response.data);
            }))
        } catch (error) {
            alert("an error occured");
        }

    }, [])


    return (
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allData?.length > 0 && allData.map(place => (
                <Link to={`/place/${place?._id}`} className="hover:-translate-y-2 duration-200 cursor-pointer">
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {place?.photos?.[0] && (
                            < img className="rounded-2xl aspect-square object-cover" src={`${BASE_URL}uploads/` + place?.photos[0]} alt="image" />
                        )}
                    </div>
                    <h3 className="font-medium truncate text-lg">{place?.address} </h3>
                    <h3 className="text-sm truncate text-gray-600">{place?.title}</h3>
                    <div className="mt-1">
                        <span className="font-medium">₹{place?.price}/night</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
export default IndexPage