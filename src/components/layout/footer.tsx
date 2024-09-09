import { ILinkEntity } from "@/core/features/landing/interfaces/link-interface";
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
import CustomImage from "../global/CustomImage";

interface Props {
  data: ILinkEntity;
}
const Footer = ({ data }: Props) => {
  return (
    <div className="bg-[rgb(34,41,53)] text-white p-8">
      <div className="w-full flex items-start justify-center gap-12">
        <div className="flex items-start space-x-4 flex-col gap-4">
          <a href="/">
            <CustomImage
              size={100}
              className="w-24"
              src={data.link.header.logo}
              alt="Logo"
            />
          </a>
          <p className="text-gray-400 text-sm max-w-96">
            {data.link.footer.descriptionText}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h6 className="font-bold text-white">Contact Us</h6>
          <p className="text-gray-400">Saida</p>
          <p className="text-gray-400">Email: hmakki387@gmail.com</p>
          <p className="text-gray-400">Phone: +96178886897</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
