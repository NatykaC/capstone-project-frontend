import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'



function NavBarSignUp() {
    return (
    

<nav className="navbar sticky-top navbar navbar-dark"
    style={{backgroundColor: "#38B6FF"}}>
  <div className="container-fluid">
  <img src="Logo.png" alt="FreshStart Logo" width="75" height="75"/>
  <button className="m-5">
     <Link to={"/home"} style={{ textDecoration: "none", color: "black" }}>
         Home
        </Link>
      </button>
      <button className="m-5">
     <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
         login
        </Link>
      </button>
    </div>
</nav>
        
    )
};

export default NavBarSignUp;