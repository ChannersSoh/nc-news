import { Link } from "react-router-dom"
import CustomLink from "./CustomLink"

function Nav({ user, setUser }) {

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem('currentUser');
      };
    
return(
    <nav className="nav">
        <Link to="/" className="site-name">NC News</Link>
        <ul>
        <CustomLink to="/articles">Articles</CustomLink>
        {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <CustomLink to="/login">Login</CustomLink>
      )}
        </ul>
    </nav>
)
}


export default Nav
