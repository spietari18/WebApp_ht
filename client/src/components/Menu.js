import { Link } from 'react-router-dom';

function Menu({user, jwt}) {
    return (
        <div>
            <Link to="/" className="btn" >Home</Link> {user.email ? `Logged in as ${user.email}` : <><Link to="/login" className="btn" >Login</Link> <Link to="/register" className="btn" >Register</Link></> }
        </div>
    )
}

export default Menu;