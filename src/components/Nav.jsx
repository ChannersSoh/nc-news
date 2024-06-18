import { Link } from "react-router-dom"
import CustomLink from "./CustomLink"

function Nav() {
return(
    <nav className="nav">
        <Link to="/" className="site-name">NC News</Link>
        <ul>
        <CustomLink to="/articles">Articles</CustomLink>
        </ul>
    </nav>
)
}


export default Nav
