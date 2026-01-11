import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaSquarePhone, FaSquareXTwitter } from 'react-icons/fa6';
import stripImage from '../../assets/Stripe_icon_-_square.svg';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-base-200 overflow-x-hidden" data-aos="fade-up" data-aos-easing="linear"   data-aos-duration="1500">

      {/* Main Footer */}
      <div className="footer grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5 lg:px-10 py-10 text-base-content"
      
      >

        {/* Logo & About */}
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            Experience seamless travel bookings with instant confirmation for
            bus, train, launch and flights — all in one place.
          </p>
        </div>

        {/* Company */}
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/allTickets" className="link link-hover">All Tickets</Link>
          <Link to="/" className="link link-hover">Contact Us</Link>
          <Link to="/" className="link link-hover">About</Link>
        </nav>

        {/* Contact */}
        <nav>
          <h6 className="footer-title">Contact Info</h6>

          <div className="flex items-center gap-2 text-sm">
            <MdEmail size={20} />
            <span>easytripticket@gmail.com</span>
          </div>

          <div className="flex items-center gap-2 text-sm mt-2">
            <FaSquarePhone size={20} />
            <span>+09475-185632</span>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <FaFacebook size={22} />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <FaInstagram size={22} />
            </a>
            <a href="https://www.x.com/" aria-label="Twitter">
              <FaSquareXTwitter size={22} />
            </a>
          </div>
        </nav>

        {/* Payment */}
        <div>
          <h6 className="footer-title">Payment Method</h6>
          <img
            src={stripImage}
            alt="Stripe"
            className="h-10 w-10 mt-3"
          />
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-base-300 py-4 text-center text-sm text-base-content">
        © {new Date().getFullYear()} EasyTripTicket Ltd. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
