"use client";
import { useAppSelector } from "@/components/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setTest } from "../redux/redux";
import { useGetPokemonQuery } from "../redux/rtk";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header1 from "../../../../layout/Header/Header1";
import Header2 from "../../../../layout/Header/Header2";
import Header3 from "../../../../layout/Header/Header3";
import Footer from "../../../../layout/Footer/footer";

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
