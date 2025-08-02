import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../App.css';

const NavBar = () => {
    return (
        <div className="sidenav">
            <div>
                <Link to="/"><h3>FitTip</h3></Link>
                <div className="sidenav-links">
                    {/* <Link to="/new"><h3>Create a Crewmate!</h3></Link>
                    <Link to="/gallery"><h3>Crewmate Gallery</h3></Link> */}
                </div>
            </div>
        </div>
    )
}

export default NavBar;