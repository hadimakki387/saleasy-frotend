"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setTest } from "../redux/redux";
import { useGetPokemonQuery } from "../redux/rtk";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {};

function LandingPage({}: Props) {
  const dispatch = useDispatch();
  const { test } = useAppSelector((state) => state.landingPage);
  const { data } = useGetPokemonQuery();
  console.log(data);
  return (
    <div>
      <h1>Landing Page</h1>
      <p>{test}</p>
      <button
        onClick={() => {
          dispatch(setTest("changed"));
        }}
      >
        change test
      </button>
    </div>
  );
}

export default LandingPage;
