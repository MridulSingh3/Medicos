import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-6 px-6 lg:px-16 border-t border-gray-200 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Left Section: Branding & About */}
        <div className="md:w-2/5 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              +
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              Medicos
            </span>
          </div>
          <p className="text-gray-500 leading-relaxed text-sm max-w-sm">
            Medicos offers quality healthcare and expert consultation with modern facilities to ensure the best care for you and your family.
          </p>
        </div>

        {/* Center Section: Company Links */}
        <div className="space-y-3">
          <p className="font-bold text-gray-800 uppercase tracking-wider text-xs">
            Company
          </p>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                Privacy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Contact Info */}
        <div className="space-y-3">
          <p className="font-bold text-gray-800 uppercase tracking-wider text-xs">
            Get In Touch
          </p>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="tel:+919016000016" className="hover:text-blue-600 transition-colors duration-200">
                +91-9016000016
              </a>
            </li>
            <li>
              <a href="mailto:premmdevloper@gmail.com" className="hover:text-blue-600 transition-colors duration-200">
                premmdevloper@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider & Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
        <p>© 2025 Medicos — All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;