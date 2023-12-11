import React from "react";
import * as FaIcons from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <footer>
                <small className="footer-copyright">
                    {" "}
                    &copy; 2023 WAVFORM- All rights resevered Follow us:{" "}
                    <FaIcons.FaFacebook /> <FaIcons.FaTwitter />{" "}
                    <FaIcons.FaInstagram /> <FaIcons.FaLinkedin />{" "}
                    <FaIcons.FaGithub />
                </small>
            </footer>
        </div>
    );
}

export default Footer;
