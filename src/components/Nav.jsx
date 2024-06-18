import { Link, useMatch, useResolvedPath } from "react-router-dom"

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

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

export default Nav