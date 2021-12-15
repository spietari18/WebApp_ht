import { useNavigate } from "react-router-dom";

function Logout({jwt, setJwt, setUser}) {
    const nav = useNavigate();

    const login = () => {
        nav("/login");
    }

    const home = () => {
        nav("/");
    }

    if (jwt) {
        setJwt("");
        setUser(null);
    }

    return (
        <div>
            <h1>You have been logged out!</h1>
            <button className="btn" onClick={login}>Login</button>
            <button className="btn" onClick={home}>Home</button>
        </div>
    )
}

export default Logout;