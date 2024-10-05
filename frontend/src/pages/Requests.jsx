import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_SERVER_URL } from "../constants";
import Button from "../components/Button";
import "./Requests.css"

const Requests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPendingRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${BASE_SERVER_URL}/pending-requests`
            );
            setPendingRequests(response.data);
            console.log(response.data);
        } catch (err) {
            console.error("Error fetching pending requests:", err);
            setError(err.response ? err.response.data.message : "Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const showDetails = (id) => {
        
    }

    return (
        <div>
            <h2>Pending Requests</h2>
            {pendingRequests.length > 0 ? (
                <ul className="file-list req-list">
                    {pendingRequests.map((request) => (
                        <li key={request._id} className="file-item req-item hover-effect">
                            <a
                                href={request.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {request.filename}
                            </a>
                            <div className="req-btn-cont">
                            <Button className={'req-details-btn'} text={"Details"}/>
                            <Button className={"req-approve-btn"} text={"Approve"} />
                            <Button className={"req-reject-btn"} text={"Reject"} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending requests found.</p>
            )}
        </div>
    );
};


const Details = ({pendingRequests, id}) => {
    const request = pendingRequests.filter((val) => {val._id == id})[0]
    console.log(request)


}


export default Requests;
