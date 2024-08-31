import {
  faAppStore,
  faFacebook,
  faGoogle,
  faGooglePlay,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-[rgb(34,41,53)] text-white p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0 lg:space-x-16">
        <div className="flex flex-col space-y-4 lg:w-1/3">
          <div className="flex items-center space-x-4">
            <a href="/">
              <Image
                width={100}
                height={100}
                className="h-12"
                src="https://bazaar.ui-lib.com/assets/images/logo.svg"
                alt="Logo"
              />
            </a>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-16 lg:w-2/3 space-y-8 lg:space-y-0">
          <div className="flex flex-col space-y-2">
            <h6 className="font-bold text-white">About Us</h6>
            <a className="text-gray-400 hover:text-white" href="/">
              Careers
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Our Stores
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Our Cares
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Terms & Conditions
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Privacy Policy
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <h6 className="font-bold text-white">Customer Care</h6>
            <a className="text-gray-400 hover:text-white" href="/">
              Help Center
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Track Your Order
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Corporate & Bulk Purchasing
            </a>
            <a className="text-gray-400 hover:text-white" href="/">
              Returns & Refunds
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <h6 className="font-bold text-white">Contact Us</h6>
            <p className="text-gray-400">
              Lamma tshufa ya Kassem tzakkar nhaart lli 3mlt l whatsapp najoo7
              (Address)
            </p>
            <p className="text-gray-400">Email: Neje7@gmail.com</p>
            <p className="text-gray-400">Phone: +961 78 919 829</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
