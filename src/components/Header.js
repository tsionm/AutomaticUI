import React, { useEffect } from 'react'
import logo from '../images/logo.png'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const Header = () => {

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  const navigate = useNavigate();


const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("hijrausername");
  localStorage.removeItem("authorities");
  navigate("/login");
};
  return (
    <div>
        <nav className=" navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between align-items-center ml-5">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src={logo} // Replace with your logo image path
            alt="Logo"
            width="120"
            height="auto"
          />
        </a>
        <Button onClick={logOut} className='' style={{backgroundColor:"#CCCC32", borderColor:"#CCCC32", color:"#272F47"}}>Logout</Button>
        </div>
        </nav>
    </div>
  )
}

export default Header