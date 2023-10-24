import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="w-full h-auto inset-x-0 bottom-0 bg-gray-800 p-4 text-white text-center">
        <p>Copyright © 2023 <a href="#">TrekDestiny</a> All rights reserved.</p>
        <div className='flex gap-2 justify-center items-center'>
            <a href="instagram.com"><FaInstagram size={24}/></a>
            <a href="linkedin.com"><FaLinkedin size={24}/></a>
            <a href="twitter.com"><FaTwitter size={24}/></a>
        </div>
        
    </footer>
  );
};

export default Footer;
