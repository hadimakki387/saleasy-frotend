"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setTest } from "../redux/redux";
import { useGetPokemonQuery } from "../redux/rtk";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {};

function LandingPage({ }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

      </main>
    </div>
  );
}

export default LandingPage;
