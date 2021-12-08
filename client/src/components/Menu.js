import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Link to="/">Home</Link> <Link to="/login">Login</Link> <Link to="/register">Register</Link>
        </div>
    )
}