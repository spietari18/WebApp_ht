import { useState } from "react";
import { Redirect } from 'react-router-dom';

function Register() {
    const [userData, setUserData] = useState({});

    const submit = (e) => {
        e.preventDefault();

        fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            if (data.email === userData.email) {
                return <Redirect to='/login' />
            }
        })
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="email" />
                <input type="password" name="password" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Register;