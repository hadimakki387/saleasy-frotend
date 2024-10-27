import { ILinkEntity } from "@/core/features/customer/landing/interfaces/link-interface";
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
import React, { useState } from "react";
import { useTestAuthMutation } from "@/core/features/customer/landing/redux/rtk";
import CustomImage from "@/components/global/CustomImage";
import SeEditInput from "@/components/global/SeEditInput";

interface Props {
  data: ILinkEntity;
}
const AdminFooter = ({ data }: Props) => {
  const [descriptionText, setDescriptionText] = useState(
    data.link.footer.descriptionText
  );
  return (
    <div className="bg-[rgb(34,41,53)] text-white p-8">
      <div className="w-full flex items-start justify-around gap-12 max-md:flex-col max-md:gap-8">
        <div className="flex items-start flex-col gap-4">
          <a href="/">
            <CustomImage
              size={100}
              className="w-24"
              src={data.link.header.logo}
              alt="Logo"
            />
          </a>
          <p className="text-gray-400 text-sm max-w-96 max-md:w-full">
            <SeEditInput
              multiline
              defaultValue={descriptionText}
              onChange={(e) => {
                setDescriptionText(e as string);
              }}
              iconsClassName="text-white"
              sx={{
                "& .MuiOutlinedInput-input": {
                  color: "white !important",
                },
              }}
            />
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h6 className="font-bold text-white">Contact Us</h6>
          <p className="text-gray-400">Saida</p>
          <p className="text-gray-400">Email: hmakki387@gmail.com</p>
          <p className="text-gray-400">Phone: +96178886897</p>
        </div>
        {/* <button
          onClick={() => {
            testAuth();
          }}
        >
          {isSuccess ? "auth" : isError ? "failed auth" : "Test Auth"}
        </button> */}
      </div>
    </div>
  );
};

export default AdminFooter;
