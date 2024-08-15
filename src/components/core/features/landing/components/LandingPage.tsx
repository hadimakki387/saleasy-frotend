"use client";
import { useAppSelector } from "@/components/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setTest } from "../redux/redux";
import { useGetPokemonQuery } from "../redux/rtk";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@/new components/SeTextInput";

type Props = {};

function LandingPage({}: Props) {
  const dispatch = useDispatch();
  const { test } = useAppSelector((state) => state.landingPage);
  const { data } = useGetPokemonQuery();
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
      <div className="w-48">
        <TextField
          name="name"
          label="Name"
          select
          options={[
            {
              label: "test",
              value: "test",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default LandingPage;
