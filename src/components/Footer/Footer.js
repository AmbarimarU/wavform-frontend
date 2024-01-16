import React from "react";
import * as FaIcons from "react-icons/fa";
import "./Footer.scss";
import logo from "../Nav/images/header.png";
function Footer() {
    return (
        <footer className="footer-bottom">
            <div className="footer-container container">
                <nav className="footer-body">
                    <div className="footer-logo">
                        WAVFORM{" "}
                        <img src={logo} style={{ height: "10px" }} alt="Logo" />
                    </div>
                    <div className="footer-copy">
                        {" "}
                        &copy; 2023 WavForm - All Rights Reserved
                    </div>
                    <div className="footer-social">
                        <div className="footer-iconbg">
                            <FaIcons.FaFacebook className="footer-icon" />
                        </div>
                        <div className="footer-iconbg">
                            <FaIcons.FaTwitter className="footer-icon" />
                        </div>
                        <div className="footer-iconbg">
                            <FaIcons.FaInstagram className="footer-icon" />
                        </div>
                        <div className="footer-iconbg">
                            <FaIcons.FaLinkedin className="footer-icon" />
                        </div>
                        <div className="footer-iconbg">
                            <FaIcons.FaGithub className="footer-icon" />
                        </div>
                    </div>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
