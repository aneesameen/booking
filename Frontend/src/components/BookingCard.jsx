function BookingCard({ singlePlace }) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-xl text-center">
                Price : ₹{singlePlace?.price}/night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col md:flex-row">
                    <div className="py-3 px-4">
                        <label>Check-In:</label>
                        <input type="date" />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check-Out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Guests:</label>
                    <input className="outline-none border px-2 rounded-2xl ml-2" min={1} type="number" />
                </div>
            </div>
            <button className="primary mt-4">book Now</button>
        </div>
    )
}
export default BookingCard