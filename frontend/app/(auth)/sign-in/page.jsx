"use client";

import React, { useEffect, useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Loading from "@/components/ui/loading";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { updateUser } from "../../../redux/user/userSlice";
import { GoogleSVG } from "../../../public/google";

const SignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const param = useSearchParams();
  useEffect(() => {
    const signInGG = async () => {
      setLoading(true);
      const token = param.get("token");
      const isAdmin = param.get("isAdmin");
      localStorage.setItem("token", token);
      await handleGetDetailUser({ token, isAdmin });
      router.push("/");
    };
    if (param.get("token") && param.get("isAdmin")) {
      signInGG();
    }
  }, [param]);
  const openNotification = (description) => {
    api.info({
      message: `Notification`,
      description: description,
      placement: "topRight",
      duration: 2,
    });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFetchApiSignIn = async (data) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_ROOT}/api/auth/login`,
      data
    );
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const data = await handleFetchApiSignIn({ email, password });
      const { token, isAdmin } = data?.data;
      localStorage.setItem("token", token);
      await handleGetDetailUser({ token, isAdmin });
      setLoading(false);

      router.push("/");
    } catch (error) {
      setLoading(false);
      openNotification("Username or password is incorrect!!!");
    }
  };
  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleGetDetailUser = async ({ token, isAdmin }) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ROOT}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(isAdmin);
    dispatch(updateUser({ ...res?.data, isAdmin, password }));
  };
  const handleSignUp = () => {
    router.push("/sign-up");
  };
  const handleSignInGoogle = () => {
    setLoading(true);
    router.replace( `${process.env.NEXT_PUBLIC_API_ROOT}/api/auth/google-login`,);
  };
  return (
    <Loading isLoading={loading}>
      {contextHolder}
      <div className="flex items-center justify-center bg-white">
        <div className="w-1/2 px-20 pt-20 pb-[50px] m-10 rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <Image
              src="/images/img_logo.png"
              alt="logo"
              width={100}
              height={50}
            />
          </div>
          <b className="ml-4">Đăng nhập</b>
          <Input
            className=" mt-5 rounded-full px-4"
            id="email"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div className="relative mt-2">
            <span
              className="absolute top-2.5 right-5 z-10"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <Input
              className="rounded-full px-4"
              id="password"
              placeholder="Nhập mật khẩu"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div className="flex justify-between items-center">
            <p
              className="text-link cursor-pointer"
              onClick={() => router.push("/recovery")}
            >
              Quên mật khẩu?
            </p>
            <Button
              disabled={!email.length || !password.length}
              className="my-10 rounded-full p-6 hover:bg-gray-200 hover:text-black"
              onClick={handleSignIn}
            >
              Đăng nhập
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <p>Bạn chưa có tài khoản?</p>
            <div className="text-link cursor-pointer" onClick={handleSignUp}>
              Đăng ký
            </div>
          </div>
          <div className="w-full h-fit flex justify-center">
            <div
              className="cursor-pointer mt-5 p-4"
              onClick={handleSignInGoogle}
            >
              <GoogleSVG />
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};
export default SignIn;
