import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram,  } from 'react-icons/fa';
import { FaSquarePhone, FaSquareXTwitter } from 'react-icons/fa6';
import stripImage from '../../assets/Stripe_icon_-_square.svg'
import { MdEmail } from 'react-icons/md';
const Footer = () => {
    return (
<footer>


       <div className="footer sm:footer-horizontal  text-base-content p-10">
  <nav>
    <h6 className="footer"><Logo></Logo></h6>
    <p>Experience seamless travel bookings with  <br />
     instant confirmation for bus, train, launch <br /> and flights — all in one place.</p>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <Link to='/' className="link link-hover">Home</Link>
    <Link to="/allTickets" className="link link-hover">All Ticket</Link>
    <Link to="/" className="link link-hover">Contact us</Link>
    <Link to="/" className="link link-hover"> About</Link>
    
  </nav>
  <nav>
    <h6 className="footer-title">Contact Info</h6>
    <a className="link link-hover flex justify-center items-center space-x-2.5 "><MdEmail size={21}  /><span> easytripticket@gmail.com</span></a>
    <a className="link link-hover flex justify-center items-center  space-x-2.5"> <FaSquarePhone size={21} /><span>+09475-185632</span></a>
    <div className='flex space-x-3'>
      <a href='https://www.facebook.com/' className=""><FaFacebook size={23}></FaFacebook> </a>
    <a href='https://www.instagram.com/' className=""><FaInstagram size={23}></FaInstagram> </a>
    <a href='https://www.x.com/' className=""><FaSquareXTwitter size={23} /></a>
    </div>
  </nav>
  <form>
    <h6 className="footer-title">Payment Method</h6>
    <fieldset className="w-80">
     {/* <a className="link link-hover">Stripe </a> */}
     <img src={stripImage} className='h-12 w-12' alt="" />
    </fieldset>
  </form>
 

</div>
 <div className="footer sm:footer-horizontal footer-center  text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by EasyTripTicket Ltd</p>
  </aside>
</div>
</footer>
    );
};

export default Footer;