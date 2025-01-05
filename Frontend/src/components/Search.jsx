import axios from "axios";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearch } from "../context/SearchContext";

function Search() {

    const { setSearchResults } = useSearch();

    const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('/search', { params: { query: searchQuery } });
            setSearchResults(response.data);
            setSearchQuery("")
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    return (
        <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full py-1 px-4 shadow-md shadow-gray-300 w-full sm:w-80 md:w-96">
            <input
                type="search"
                className="outline-none flex-grow"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="bg-primary text-white p-2 rounded-full">
                <IoSearch />
            </button>
        </div>
    )
}
export default Search