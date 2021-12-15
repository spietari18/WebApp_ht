import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    // useState for formData
    const [userData, setUserData] = useState({});
    const nav = useNavigate();

    // Send formData, should forward user to login if register success
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
            if (data.email) {
                nav("/login");
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
                <input type="text" name="email" placeholder="email" className="field" />
                <input type="password" name="password" placeholder="password" className="field" />
                <input type="submit" className="btn" />
            </form>
        </div>
    )
}

export default Register;