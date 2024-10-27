import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

type Props = {};

function BackButton({}: Props) {
  const router = useRouter();
  return (
    <FontAwesomeIcon
      icon={faArrowLeftLong}
      className="text-primary text-4xl cursor-pointer"
      onClick={() => router.back()}
    />
  );
}

export default BackButton;
