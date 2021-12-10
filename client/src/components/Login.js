import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login({setJwt, setUser}) {
    const [userData, setUserData] = useState({});

    const submit = (e) => {
        e.preventDefault();

        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                setJwt(data.token);
                console.log(data.token);
                setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString()));
                return <Navigate to="/" />;
            }
        })
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login;