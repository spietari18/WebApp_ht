import { Link } from 'react-router-dom';

// Render menu with links not refreshing the page.
function Menu({user, jwt}) {
    return (
        <nav>
            <div className="nav-wrapper" >
                <Link className="brand-logo" to="/" >Home</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {user && user.email ? <>
                    <li>Logged in as {user.email}</li>
                    <li> <Link to="/logout">Logout</Link> </li>
                    </> : <>
                    <li> <Link to="/login">Login</Link> </li> 
                    <li> <Link to="/register">Register</Link> </li>
                    </>}
                </ul>
            </div>
        </nav>
    )
}

export default Menu;