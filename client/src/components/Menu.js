import { Link } from 'react-router-dom';

function Menu({user, jwt}) {
    return (
        <div>
            <Link to="/">Home</Link> {user.email ? `Logged in as ${user.email}` : <><Link to="/login">Login</Link> <Link to="/register">Register</Link></> }
        </div>
    )
}

export default Menu;