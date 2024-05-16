"use client";

import React, { useState, useEffect, useMemo } from "react";
import CardItemCart from "./UI_component/card_item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TinhTP from "../../hanhchinhvn/tinh_tp.json";
import QuanHuyen from "../../hanhchinhvn/quan_huyen.json";
import XaPhuong from "../../hanhchinhvn/xa_phuong.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { AddressItem } from "../user-account/UI_component/address";
import { getApi } from "@/lib/fetch";

const ListItemCart = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [listProvince, setListProvince] = useState(
    Object.entries(TinhTP)
      .map(([key, value]) => ({
        name: value.name,
        code: value.code,
      }))
      .sort((a, b) => a.code - b.code)
  );
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [province, setProvince] = useState({});
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [note, setNote] = useState("");
  const [optionPay, setOptionPay] = useState("Momo");
  const [responseData, setResponseData] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: "Lỗi",
      description: content,
    });
  };

  const handleGetCart = () => {
    try {
      const options = {
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setResponseData(response.data);
        })
        .catch(function (error) {
          console.error(error);
          if (error.response.status === 401)
            openNotificationWithIcon("error", `Đăng nhập để tiếp tục`);
          else openNotificationWithIcon("error", error.response.data);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const handleGetAddress = async () => {
    const res = await getApi({ endPoint: "/api/user/getAddresses" });
    setData(res.data.sort((a, b) => (b.isDefault === 1) - (a.isDefault === 1)));
  };
  useEffect(() => {
    handleGetCart();
    handleGetAddress();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      setAdress(data[0].streetLine.split(", ")[0]);
      setUsername(data[0].name);
      setEmail(data[0].email ? data[0].email : user.email);
      setPhone(data[0].phoneNumber ? data[0].phoneNumber : user.phoneNumber);
      handleSetProvince(data[0].streetLine.split(", ")[2]);
      handleSetCity(data[0].streetLine.split(", ")[1]);
    }
  }, [data]);
  // console.log(responseData)

  const handleSetProvince = (value) => {
    for (const code in TinhTP) {
      if (TinhTP[code].name === value) {
        const temp = { name: value, code: TinhTP[code].code };
        setProvince(temp);
        const filterCity = Object.keys(QuanHuyen)
          .filter((key) => QuanHuyen[key].parent_code === TinhTP[code].code)
          .map((key) => ({ name: QuanHuyen[key].name_with_type, code: key }));
        setListCity(filterCity);
        setListDistrict([]);
        setCity(null);
        setDistrict(null);
      }
    }
  };
  const handleSetCity = (value) => {
    for (const code in QuanHuyen) {
      if (QuanHuyen[code].name_with_type === value) {
        const temp = { name: value, code: QuanHuyen[code].code };
        setCity(temp);
        const filterDistrict = Object.keys(XaPhuong)
          .filter((key) => XaPhuong[key].parent_code === QuanHuyen[code].code)
          .map((key) => ({ name: XaPhuong[key].name_with_type, code: key }));
        setListDistrict(filterDistrict);
        setDistrict(null);
      }
    }
  };
  const handleSetDistrict = (value) => {
    for (const code in XaPhuong) {
      if (XaPhuong[code].name_with_type === value) {
        const temp = { name: value, code: XaPhuong[code].code };
        setDistrict(temp);
      }
    }
  };
  const handlePay = (value) => {
    setOptionPay(value);
  };

  const handleNumChange = (itemId, num) => {
    try {
      const options = {
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/cart/updateQty`,
        data: {
          productItemId: itemId,
          quantity: num,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .request(options, {})
        .then(function (response) {
          handleGetCart();
        })
        .catch(function (error) {});
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleSizeChange = (oldItem, newItem) => {
    try {
      const options = {
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/cart/replaceCartItem`,
        data: {
          oldProductItemId: oldItem,
          newProductItemId: newItem,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .request(options, {})
        .then(function (response) {
          handleGetCart();
        })
        .catch(function (error) {});
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteItem = (itemId) => {
    try {
      const options = {
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/cart/removeCartItem?productItemId=${itemId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .request(options, {})
        .then(function (response) {
          handleGetCart();
        })
        .catch(function (error) {});
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // console.log(responseData)

  const priceMemo = useMemo(() => {
    const total = responseData.reduce((total, cur) => {
      return total + parseInt(cur.price) * parseInt(cur.qty);
    }, 0);
    return total;
  }, [responseData]);

  const numProductMemo = useMemo(() => {
    const total = responseData.reduce((total, cur) => {
      return total + parseInt(cur.qty);
    }, 0);
    return total;
  }, [responseData]);

  const addDotsToNumber = (number) => {
    if (number) {
      const numberString = number.toString();
      const length = numberString.length;
      let result = "";
      for (let i = 0; i < length; i++) {
        result += numberString[i];
        if ((length - i - 1) % 3 === 0 && i !== length - 1) result += ".";
      }
      return result;
    }
  };
  const isValidPhoneNumber = () => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handlePayment = () => {
    if (!priceMemo) {
      openNotificationWithIcon("error", "Vui lòng thêm hàng vào giỏ");
    } else if (
      !username ||
      !phone ||
      !email ||
      !adress ||
      !province.name ||
      !city.name ||
      !district.name
    )
      openNotificationWithIcon("error", "Bạn chưa điền đủ thông tin");
    else if (!isValidPhoneNumber())
      openNotificationWithIcon("error", "Số điện thoại không hợp lệ");
    else if (!isValidEmail())
      openNotificationWithIcon("error", "Email không hợp lệ");
    else {
      router.push(
        `/checkout/${encodeURIComponent(
          JSON.stringify({
            username: username,
            phone: phone,
            email: email,
            adress: adress,
            province: province.name,
            city: city.name,
            district: district.name,
            note: note,
            optionPay: optionPay,
            listProduct: responseData,
          })
        )}`
      );
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAdressChange = (e) => {
    setAdress(e.target.value);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleOnClick = () => {
    router.push("/account");
  };
  const updateAdressData = (item) => {
    handleSetProvince(item.streetLine.split(", ")[2]);
    handleSetCity(item.streetLine.split(", ")[1]);
    setUsername(item.name);
    setPhone(item.phoneNumber ? item.phoneNumber : user.phoneNumber);
    setAdress(item.streetLine.split(", ")[0]);
  };
  return (
    <div className="p-4 flex flex-row mb-12">
      {contextHolder}
      <div className="w-[60%]">
        <div className="bg-gray-100 px-4 py-6 rounded-md mt-4">
          <p className="uppercase font-bold text-4xl">
            Hi, {user.name ? user.name : user.username}
          </p>
          <p>
            Tổng đơn ({numProductMemo} sản phẩm){" "}
            <span className="text-blue-600 font-bold">
              {priceMemo ? addDotsToNumber(priceMemo) : 0}đ
            </span>
          </p>
        </div>
        <div className="flex px-4 mt-12 mb-8 items-center">
          <p className="font-bold text-3xl ">Thông tin vận chuyển</p>
          <div
            className="flex cursor-pointer ml-auto items-center"
            onClick={onOpen}
          >
            <TbAddressBook className="inline-block mr-1 h-4 w-4" />
            <p className="text-sm font-medium text-link"> Chọn từ sổ địa chỉ</p>
            <Modal
              scrollBehavior="inside"
              backdrop="opaque"
              title="Sổ địa chỉ"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              classNames={{
                backdrop:
                  "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
              }}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Sổ địa chỉ
                    </ModalHeader>
                    <ModalBody>
                      {data?.map((item) => (
                        <AddressItem
                          key={item.addressId}
                          item={item}
                          getData={handleGetAddress}
                          isShowDefault={false}
                          updateAdressData={updateAdressData}
                        />
                      ))}
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={handleOnClick}>Thêm địa chỉ mới</Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
        <div className="px-4 flex flex-row gap-4 mb-5">
          <Input
            className="rounded-full px-4"
            type="text"
            placeholder="Họ tên"
            value={username}
            onChange={handleUsernameChange}
          />
          <Input
            className="rounded-full px-4"
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="px-4">
          <Input
            className="rounded-full px-4 mb-5"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            className="rounded-full px-4 mb-5"
            type="text"
            placeholder="Địa chỉ"
            value={adress}
            onChange={handleAdressChange}
          />
        </div>
        <div className="flex flex-row justify-between px-4 mb-5">
          <Select onValueChange={handleSetProvince} value={province.name}>
            <SelectTrigger className="w-[200px] rounded-full px-4">
              <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-64 w-48">
                <SelectGroup>
                  {listProvince.map((item, index) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleSetCity}
            disabled={!listCity.length}
            value={city?.name}
          >
            <SelectTrigger className="w-[200px] rounded-full px-4">
              <SelectValue placeholder="Chọn Quận/Huyện" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-64 w-48">
                <SelectGroup>
                  {" "}
                  {listCity.map((item, index) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleSetDistrict}
            disabled={!listDistrict.length}
          >
            <SelectTrigger className="w-[200px] rounded-full px-4">
              <SelectValue placeholder="Chọn Phường/Xã" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-64 w-48">
                <SelectGroup>
                  {listDistrict.map((item, index) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className="px-4">
          <Input
            className="rounded-full px-4 mb-5"
            type="text"
            placeholder="Ghi chú thêm"
            value={note}
            onChange={handleNoteChange}
          />
        </div>
        <div className="flex items-center space-x-2 px-4">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Lưu vào sổ địa chỉ để dùng cho lần mua hàng tiếp theo
          </label>
        </div>
        <p className="font-bold text-3xl px-4 mt-12 mb-6">
          Hình thức thanh toán
        </p>
        <RadioGroup
          className="px-4"
          defaultValue={optionPay}
          onValueChange={handlePay}
        >
          <div
            className={
              optionPay == "Momo"
                ? "flex items-center space-x-2 px-6 py-5 border border-blue-500 rounded-xl gap-8 mb-2 hover:border-blue-500"
                : "flex items-center space-x-2 px-6 py-5 border rounded-xl gap-8 mb-2 hover:border-blue-500 opacity-50"
            }
          >
            <RadioGroupItem value="Momo" id="Momo" />
            <label
              htmlFor="Momo"
              className="h-[10%] w-full absolute cursor-pointer"
            />
            <img
              className="w-8 object-contain mr-4"
              src="https://www.coolmate.me/images/momo-icon.png"
              alt="icon"
            />
            <p className="">Thanh toán Momo</p>
          </div>
          <div
            className={
              optionPay == "COD"
                ? "flex items-center space-x-2 px-6 py-5 border border-blue-500 rounded-xl gap-8 mb-2 hover:border-blue-500"
                : "flex items-center space-x-2 px-6 py-5 border rounded-xl gap-8 mb-2 hover:border-blue-500 opacity-50"
            }
          >
            <RadioGroupItem value="COD" id="COD" />
            <label
              htmlFor="COD"
              className="h-[10%] w-full absolute cursor-pointer"
            />
            <img
              className="w-8 object-contain mr-4"
              src="https://www.coolmate.me/images/COD.svg"
              alt="icon"
            />
            <p className="">Thanh toán khi nhận hàng</p>
          </div>
          <div
            className={
              optionPay == "ZaloPay"
                ? "flex items-center space-x-2 px-6 py-5 border border-blue-500 rounded-xl gap-8 mb-2 hover:border-blue-500"
                : "flex items-center space-x-2 px-6 py-5 border rounded-xl gap-8 mb-2 hover:border-blue-500 opacity-50"
            }
          >
            <RadioGroupItem value="ZaloPay" id="ZaloPay" />
            <label
              htmlFor="ZaloPay"
              className="h-[10%] w-full absolute cursor-pointer"
            />
            <img
              className="w-8 object-contain mr-4"
              src="https://www.coolmate.me/images/logo-zalopay.svg"
              alt="icon"
            />
            <p className="">Ví điện tử ZaloPay</p>
          </div>
          <div
            className={
              optionPay == "VNPay"
                ? "flex items-center space-x-2 px-6 py-5 border border-blue-500 rounded-xl gap-8 mb-2 hover:border-blue-500"
                : "flex items-center space-x-2 px-6 py-5 border rounded-xl gap-8 mb-2 hover:border-blue-500 opacity-50"
            }
          >
            <RadioGroupItem value="VNPay" id="VNPay" />
            <label
              htmlFor="VNPay"
              className="h-[10%] w-full absolute cursor-pointer"
            />
            <img
              className="w-8 object-contain mr-4"
              src="https://www.coolmate.me/images/vnpay.png"
              alt="icon"
            />
            <p className="">
             Thanh toán VNPay
            </p>
          </div>
          <div
            className={
              optionPay == "Flex Money"
                ? "flex items-center space-x-2 px-6 py-5 border border-blue-500 rounded-xl gap-8 mb-2 hover:border-blue-500"
                : "flex items-center space-x-2 px-6 py-5 border rounded-xl gap-8 mb-2 hover:border-blue-500 opacity-50"
            }
          >
            <RadioGroupItem value="Flex Money" id="Flex Money" />
            <label
              htmlFor="Flex Money"
              className="h-[10%] w-full absolute cursor-pointer"
            />
            <img
              className="w-8 object-contain mr-4"
              src="https://sandbox.flexmoney.vn/static/media/logo-login.cd69de6e7b8ff1cc0e4d74762ee7d40b.svg"
              alt="icon"
            />
            <p className="">Chuyển khoản liên ngân hàng bằng QR Code</p>
          </div>
        </RadioGroup>
        <p className="px-4 mb-8">
          Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có
          thể trả lại sản phẩm. Tìm hiểu thêm
          <span
            className="font-bold cursor-pointer"
            onClick={() => {
              router.push(`https://www.coolmate.me/page/chinh-sach-doi-tra`);
            }}
          >
            {" "}
            tại đây
          </span>
          .
        </p>
        <div className="px-4">
          <Button
            className="rounded-lg p-6 w-[100%] hover:bg-gray-200 hover:text-black"
            onClick={handlePayment}
          >
            Đặt hàng {priceMemo ? addDotsToNumber(priceMemo) : 0}đ ({optionPay})
          </Button>
        </div>
      </div>
      <div className="h-auto border mx-3 border-gray-200"></div>
      <div className="w-[38%]">
        <p className="font-bold text-3xl px-3 mt-8 mb-8">Giỏ hàng</p>
        <div className="px-3">
          {responseData &&
            responseData.map((product, index) => {
              return (
                <CardItemCart
                  onNumChange={handleNumChange}
                  onSizeChange={handleSizeChange}
                  onDelete={handleDeleteItem}
                  key={index}
                  productData={product}
                />
              );
            })}
        </div>

        <hr className="my-10"></hr>
        <div className="flex flex-row justify-between  mb-4">
          <p className="">Tạm tính:</p>
          <p className=""> {priceMemo ? addDotsToNumber(priceMemo) : 0}đ</p>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <p className="">Giảm giá:</p>
          <p className="">0đ</p>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <p className="">Phí giao hàng:</p>
          <p className="">Miễn phí</p>
        </div>
        <hr className="my-8"></hr>
        <div className="flex flex-row justify-between  mb-4">
          <p className="">Tổng:</p>
          <p className="font-bold text-xl">
            {" "}
            {priceMemo ? addDotsToNumber(priceMemo) : 0}đ
          </p>
        </div>
        <hr className="my-8"></hr>

        <Badge>Hoàn tiền CoolCash</Badge>
      </div>
    </div>
  );
};
export default ListItemCart;
