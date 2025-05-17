import React from "react";

const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-[#002147] to-[#0E4C92] text-white text-xl font-roboto font-bold p-4 text-center">
         <p>
            Designed & Developed by Srishti  
         <br />
        All Rights © MusicApp {new Date().getFullYear()}.</p>
      </footer>
    );
  };
  
  export default Footer;