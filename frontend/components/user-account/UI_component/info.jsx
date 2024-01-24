"use client";
import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, handleDate } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  UserOutlined,
  PhoneFilled,
  LockFilled,
  EyeInvisibleFilled,
  EyeFilled,
} from "@ant-design/icons";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { notification } from "antd";
import { updateUser } from "../../../redux/user/userSlice";
//import localStorage from "redux-persist/es/storage";

function Info() {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [birthday, setBirthDay] = useState(user.birthday);
  const dispatch = useDispatch();
  const [gender, setGender] = useState(user.gender ? user.gender : "male");
  const [phone, setPhone] = useState(user.phoneNumber);
  const [height, setHeight] = useState(user.height ? user.height : 150);
  const [weight, setWeight] = useState(user.weight ? user.weight : 50);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [txtError, setTxtError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGenderChange = (value) => {
    setGender(value);
  };
  const handleDobChange = (value) => {
    const date = handleDate(value);
    setBirthDay(date);
  };
  const reset = () => {
    setName("");
    setBirthDay("");
    setGender("");
    setHeight("");
    setWeight("");
    setPhone("");
  };
  const handleUpdateInfo = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/updateInfo`,
        {
          name,
          email: user.email,
          birthday,
          gender,
          height,
          weight,
          phoneNumber: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(
        updateUser({
          name,
          birthday,
          gender,
          height,
          weight,
          phoneNumber: phone,
        })
      );
      reset();
      openNotification("Cập nhật thông tin thành công");
    } catch (error) {
      openNotification("Có lỗi xảy ra");
    }
  };
  const handleEncodePassword = (password) => {
    const maskedPassword = "*".repeat(password.length);
    return maskedPassword;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPassword = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);

    if (
      newPassword.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit
    ) {
      return "Strong";
    } else if (
      newPassword.length >= minLength &&
      (hasUpperCase || hasLowerCase || hasDigit)
    ) {
      return "Moderate";
    } else {
      return "Weak";
    }
  };
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => {
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setDialogOpen(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (description) => {
    api.info({
      message: `Notification`,
      description: description,
      placement: "topRight",
      duration: 2,
    });
  };

  const handleUpdateAccount = async () => {
    if (!password || !newPassword || !confirmNewPassword) {
      setTxtError("Bạn chưa điền đủ thông tin");
    } else if (password !== user.password) {
      setTxtError("Bạn nhập sai mật khẩu");
    } else if (newPassword !== confirmNewPassword) {
      setTxtError("Xác nhận lại mật khẩu");
    } else if (checkPassword() === "Weak") {
      setTxtError("Mật khẩu yếu");
    } else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROOT}/api/auth/changepassword`,
          {
            oldPassword: password,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(updateUser({ ...user, password: newPassword }));
        openNotification("Cập nhật mật khẩu thành công");
        closeDialog();
      } catch (error) {
        openNotification("Có lỗi xảy ra");
        closeDialog();
      }
    }
  };

  return (
    <div className="">
      {contextHolder}
      <p className="text-3xl mb-5">Thông tin tài khoản</p>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">Họ và tên</p>
        {user.name ? (
          <p className="">{user.name}</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">Số điện thoại</p>
        {user.phoneNumber ? (
          <p className="">{user.phoneNumber}</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg ">Giới tính</p>
        {user.gender ? (
          <p className="capitalize">{user.gender}</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">
          Ngày sinh
          <span className="italic text-sm"> (ngày/tháng/năm)</span>
        </p>
        {user.birthday ? (
          <p className="">{user.birthday}</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">Chiều cao</p>
        {user.height ? (
          <p className="">{user.height} cm</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">Cân nặng</p>
        {user.weight ? (
          <p className="">{user.weight} kg</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="bg-white border-[1px] border-black hover:bg-gray-200 cursor-pointer hover:border-gray-200 px-8 py-3 rounded-full inline-block mt-4">
            <span className="font-bold">CẬP NHẬT</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl mb-6">
              Chỉnh sửa thông tin tài khoản
            </AlertDialogTitle>
            <div className="h-[100%] w-[100%] p-4">
              <div className="flex flex-row items-center border-[1px] border-gray-300 rounded-full px-4 py-1">
                <UserOutlined className="text-gray-300 text-xl mr-3" />
                <div className="w-[100%]">
                  <p className=" text-gray-500 text-xs mb-1">Họ tên của bạn</p>
                  <input
                    className=" text-black w-[100%] border-none outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full rounded-full justify-start text-left font-normal h-[50px] border-zinc-300",
                        !birthday && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthday ? birthday : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={birthday}
                      onSelect={handleDobChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <RadioGroup
                className="flex flex-row my-4 gap-6"
                defaultValue="male"
                onValueChange={handleGenderChange}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    className={
                      gender === "male" ? "border-blue-600 text-blue-600" : ""
                    }
                    value="male"
                    id="male"
                  />
                  <Label htmlFor="male">Nam</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    className={
                      gender === "female" ? "border-blue-600 text-blue-600" : ""
                    }
                    value="female"
                    id="female"
                  />
                  <Label htmlFor="female">Nữ</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    className={
                      gender === "another"
                        ? "border-blue-600 text-blue-600"
                        : ""
                    }
                    value="another"
                    id="another"
                  />
                  <Label htmlFor="another">Khác</Label>
                </div>
              </RadioGroup>
              <div className="flex flex-row items-center border-[1px] border-gray-300 rounded-full px-4 py-1">
                <PhoneFilled className="text-gray-300 text-xl mr-3" />
                <div className="w-[100%]">
                  <p className=" text-gray-500 text-xs mb-1">Số điện thoại</p>
                  <input
                    className=" text-black w-[100%] border-none outline-none"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between my-6">
                <p className="text-gray-500 text-sm">Chiều cao</p>
                <Slider
                  className="w-[70%]"
                  defaultValue={[height]}
                  min={140}
                  max={190}
                  step={1}
                  onValueChange={(e) => setHeight(e[0])}
                />
                <p className="font-bold text-nm text-blue-600">{height}cm</p>
              </div>
              <div className="flex flex-row items-center justify-between mt-6">
                <p className="text-gray-500 text-sm">Cân nặng</p>
                <Slider
                  className="w-[70%]"
                  defaultValue={[weight]}
                  min={40}
                  max={90}
                  step={1}
                  onValueChange={(e) => setWeight(e[0])}
                />
                <p className="font-bold text-nm text-blue-600">{weight}kg</p>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateInfo}>
              Cập nhật
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <p className="text-3xl mb-5 mt-16">Thông tin đăng nhập</p>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">Email</p>
        {user.email ? (
          <p className="">{user.email}</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <div className="flex flex-row mb-4 items-center">
        <p className="w-[40%] text-gray-500 text-lg">Mật khẩu</p>
        {user.password ? (
          <p className="">{handleEncodePassword(user.password)}</p>
        ) : (
          <p className="italic text-gray-500 text-sm">Chưa cập nhật </p>
        )}
      </div>
      <AlertDialog open={dialogOpen} onDismiss={closeDialog}>
        <AlertDialogTrigger asChild>
          <div
            className="bg-white border-[1px] border-black hover:bg-gray-200 cursor-pointer hover:border-gray-200 px-8 py-3 rounded-full inline-block mt-4"
            onClick={openDialog}
          >
            <span className="font-bold">CẬP NHẬT</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl mb-6">
              Chỉnh sửa thông tin tài khoản
            </AlertDialogTitle>
            <div className="h-[100%] w-[100%] p-4">
              <div className="flex flex-row items-center border-[1px] border-gray-300 rounded-full px-4 py-1 mb-4">
                <LockFilled className="text-gray-300 text-xl mr-3" />
                <div className="w-[100%] flex relative">
                  <p className=" text-gray-500 text-xs mb-1 px-1 absolute -top-3 bg-white">
                    Mật khẩu cũ
                  </p>
                  <input
                    className=" text-black w-[100%] border-none outline-none py-2"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* {showPassword ? (
                  <EyeInvisibleFilled
                    className="text-gray-300 text-xl mr-3"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeFilled
                    className="text-gray-300 text-xl mr-3"
                    onClick={togglePasswordVisibility}
                  />
                )} */}
              </div>
              <div className="flex flex-row items-center border-[1px] border-gray-300 rounded-full px-4 py-1 mb-4">
                <LockFilled className="text-gray-300 text-xl mr-3" />
                <div className="w-[100%] flex relative">
                  <p className=" text-gray-500 text-xs mb-1 px-1 absolute -top-3 bg-white">
                    Mật khẩu mới
                  </p>
                  <input
                    className=" text-black w-[100%] border-none outline-none py-1"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {/* {showPassword ? (
                  <EyeInvisibleFilled
                    className="text-gray-300 text-xl mr-3"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeFilled
                    className="text-gray-300 text-xl mr-3"
                    onClick={togglePasswordVisibility}
                  />
                )} */}
              </div>
              <div className="flex flex-row items-center border-[1px] border-gray-300 rounded-full px-4 py-1 mb-2">
                <LockFilled className="text-gray-300 text-xl mr-3" />
                <div className="w-[100%] flex relative">
                  <p className=" text-gray-500 text-xs mb-1 px-1 absolute -top-3 bg-white">
                    Nhập lại mật khẩu mới
                  </p>
                  <input
                    className=" text-black w-[100%] border-none outline-none py-1"
                    type={showPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                {/* {showPassword ? (
                  <EyeInvisibleFilled
                    className="text-gray-300 text-xl mr-3"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeFilled
                    className="text-gray-300 text-xl mr-3"
                    onClick={togglePasswordVisibility}
                  />
                )} */}
              </div>

              <span className="text-sm text-red-500">{txtError}</span>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Hủy bỏ</AlertDialogCancel>
            <Button onClick={handleUpdateAccount}>Cập nhật</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
export default Info;
