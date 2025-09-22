import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            CodeCraft
          </h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Build, share and explore coding projects in one place.
          </p>
        </div>

        {/* Spacer for layout balance */}
        <div className="hidden md:block"></div>

        {/* Social Section */}
        <div className="md:justify-self-end">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex gap-6 mt-4">
            <a
              href="https://github.com/Himanshu0518"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition transform hover:scale-110"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-singh23226"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition transform hover:scale-110"
            >
              <FaLinkedin size={26} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-gray-300">CodeCraft</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
