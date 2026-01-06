import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <Link href="/" className="logo">TEKO<span>.</span></Link>
                    <p>Pioneering the future of digital interaction. We build the tools that build tomorrow.</p>
                </div>
                <div className="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Teko Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
