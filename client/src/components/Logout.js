import { useNavigate } from "react-router-dom";

function Logout({jwt, setJwt, setUser}) {
    const nav = useNavigate();
    if (jwt) {
        setJwt("");
        setUser(null);
    }
    return (
        <div>
            <h1>You have been logged out!</h1>
            <button onClick={nav("/login")}>Login</button>
            <button onClick={nav("/")}>Home</button>
        </div>
    )
}

export default Logout;