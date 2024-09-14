import {
  setIsAuthecationDialogOpen,
  setIsLoginDialogOpen,
  setIsRegisterDialogOpen,
  setUser,
} from "@/components/global-slice";
import CustomImage from "@/components/global/CustomImage";
import SeButton from "@/components/global/SeButton";
import SeDialog from "@/components/global/SeDialog";
import SeTextField from "@/components/global/SeTextField";
import { useAppSelector } from "@/providers/StoreWrapper";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation, useRegisterMutation } from "../redux/rtk";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";

type Props = {
  logo: string;
  storeName: string;
};

function AuthenticationDialog({ logo, storeName }: Props) {
  const { isLoginDialogOpen, isRegisterDialogOpen, isAuthecationDialogOpen } =
    useAppSelector((state) => state.GlobalSlice);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [focusPhone, setFocusPhone] = useState(false);
  const [errorPhone, setErrorPhone] = useState("");
  const [countryCode, setCountryCode] = useState("LB");
  useEffect(() => {
    console.log(value);
    if ((focusPhone && value === "") || value.length < 9) {
      setErrorPhone("Phone number is required");
    }
    if (focusPhone && value.length >= 9) {
      setErrorPhone("");
    }
  }, [focusPhone, value]);
  const [
    login,
    { data: loginData, error: loginError, isLoading: loginLoading },
  ] = useLoginMutation();
  const [
    register,
    { data: registerData, error: registerError, isLoading: registerLoading },
  ] = useRegisterMutation();
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const toastId = toast.loading("Logging in...");
      login(values)
        .unwrap()
        .then((res) => {
          dispatch(setUser(res));
          dispatch(setIsLoginDialogOpen(false));
          dispatch(setIsRegisterDialogOpen(false));
          toast.success("Login successful", { id: toastId });
        })
        .catch((err) => {
          toast.error("Login failed", { id: toastId });
        });
    },
  });
  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const toastId = toast.loading("Registering...");
      register({ ...values, phoneNumber: value, countryCode })
        .unwrap()
        .then((res) => {
          dispatch(setUser(res));
          dispatch(setIsLoginDialogOpen(false));
          dispatch(setIsRegisterDialogOpen(false));
          toast.success("Register successful", { id: toastId });
        })
        .catch((err) => {
          toast.error("Register failed", { id: toastId });
        });
    },
  });
  return (
    <SeDialog
      open={isAuthecationDialogOpen}
      onClose={() => {
        dispatch(setIsAuthecationDialogOpen(!isAuthecationDialogOpen));
        setTimeout(() => {
          dispatch(setIsLoginDialogOpen(false));
          dispatch(setIsRegisterDialogOpen(false));
        }, 100);
      }}
    >
      <div className="space-y-3 md:px-8">
        {isLoginDialogOpen ? (
          <>
            <div className="flex justify-center flex-col items-center">
              <CustomImage
                src={logo}
                alt={storeName}
                width={100}
                height={100}
                className="md:w-20 w-16"
              />
              <p className="text-lg font-bold text-primary mt-4">
                Welcom to {storeName}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">Email</p>
              <SeTextField
                placeholder="Email"
                formik={loginFormik}
                name="email"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">Password</p>
              <SeTextField
                formik={loginFormik}
                name="password"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                trailingIcon={
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-sub-title-text cursor-pointer"
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  />
                }
              />
            </div>
          </>
        ) : (
          isRegisterDialogOpen && (
            <>
              <div className="flex justify-center flex-col items-center">
                <CustomImage
                  src={logo}
                  alt={storeName}
                  width={100}
                  height={100}
                  className="md:w-20 w-16"
                />
                <p className="text-lg font-bold text-primary mt-4">
                  Welcom to {storeName}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">Full Name</p>
                <SeTextField
                  placeholder="Name"
                  formik={registerFormik}
                  name="name"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">
                  Phone Number
                </p>
                <PhoneInput
                  style={{
                    flexDirection: "row-reverse",
                    gap: "1rem",
                  }}
                  onFocus={() => setFocusPhone(true)}
                  placeholder="phone number"
                  defaultCountry="LB"
                  onCountryChange={(e) => {
                    if (e) setCountryCode(e?.toString());
                  }}
                  value={value}
                  onChange={(e) => {
                    if (e) setValue(e?.toString());
                  }}
                />
                {focusPhone && errorPhone.length ? (
                  <p className="text-error text-xs">Phone number is required</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">Email</p>
                <SeTextField
                  placeholder="Email"
                  formik={registerFormik}
                  name="email"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">Password</p>
                <SeTextField
                  formik={registerFormik}
                  name="password"
                  placeholder="Password"
                  type={passwordVisible ? "text" : "password"}
                  trailingIcon={
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-sub-title-text cursor-pointer"
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    />
                  }
                />
              </div>
            </>
          )
        )}
        <SeButton
          label={isLoginDialogOpen ? "Login" : "Register"}
          fullWidth
          color="error"
          variant="contained"
          rounded
          sx={{
            padding: "10px 0",
          }}
          onClick={() => {
            if (focusPhone && value.length < 9) {
              setErrorPhone("Phone number is required");
              return;
            }
            if (isLoginDialogOpen) {
              loginFormik.handleSubmit();
            }
            if (
              isRegisterDialogOpen &&
              value.length >= 9 &&
              value.length <= 15 &&
              errorPhone.length === 0
            ) {
              registerFormik.handleSubmit();
            }
          }}
        />
        <div className="text-sm text-center max-sm:text-xs max-sm:text-start">
          {isLoginDialogOpen
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => {
              dispatch(setIsLoginDialogOpen(!isLoginDialogOpen));
              dispatch(setIsRegisterDialogOpen(!isRegisterDialogOpen));
            }}
          >
            {isLoginDialogOpen ? "Register" : "Login"}
          </span>
        </div>
      </div>
    </SeDialog>
  );
}

export default AuthenticationDialog;
