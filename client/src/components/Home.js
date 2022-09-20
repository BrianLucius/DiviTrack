import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
        .then((response) => {
            console.log(response);
            setUserData(response.data);})
        .catch((error) => {
            setUserData(error.response.status+" "+error.response.statusText);
            console.log("There was an error: ", error)});
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/logout")
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch(error => console.log("There was an error: ", error))
    }

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleLogout}>Logout</button>
            <p>{userData.loggedInUserId}</p>
        </div>
    )
}

export default Home;