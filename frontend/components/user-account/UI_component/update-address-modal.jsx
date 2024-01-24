"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import TinhTP from "../../../hanhchinhvn/tinh_tp.json";
import QuanHuyen from "../../../hanhchinhvn/quan_huyen.json";
import XaPhuong from "../../../hanhchinhvn/xa_phuong.json";
import { Input } from "@/components/ui/input";
import { getkeyByValue } from "@/lib/utils";
import { postApi, putApi } from "@/lib/fetch";
export default function UpdateAddress({ data, getData }) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [listProvince, setListProvince] = useState(
    Object.entries(TinhTP)
      .map(([key, value]) => ({
        name: value.name,
        code: value.code,
      }))
      .sort((a, b) => a.code - b.code)
  );

  const [listCity, setListCity] = useState([]);
  const [username, setUsername] = useState(data.username);
  const [phone, setPhone] = useState(data.phone);
  const [address, setAddress] = useState(data.address);
  const [defaultAddress, setDefaultAddress] = useState(data.isDefault === 1);
  const [province, setProvince] = useState({ name: data.province });
  const [city, setCity] = useState(null);
  const [provinceDefault, setProvinceDefault] = useState(null);
  const [cityDefault, setCityDefault] = useState(null);
  const [flag, setFlag] = useState(1);
  const handleSetProvince = (value) => {
    for (const code in TinhTP) {
      if (code === value) {
        const temp = { name: TinhTP[code].name, code: value };
        setProvince(temp);
        const filterCity = Object.keys(QuanHuyen)
          .filter((key) => QuanHuyen[key].parent_code === TinhTP[code].code)
          .map((key) => ({ name: QuanHuyen[key].name_with_type, code: key }));
        setListCity(filterCity);
        setCity(null);
        if (flag) {
          setCity({ name: data.city });
          setFlag(0);
        }
        return;
      }
    }
  };
  useEffect(() => {
    setProvinceDefault(getkeyByValue(TinhTP, data.province, "tinhtp"));
    setCityDefault(getkeyByValue(QuanHuyen, data.city, "qh"));
  }, [data]);
  useEffect(() => {
    handleSetProvince(provinceDefault);
  }, [provinceDefault]);
  const handleSetCity = (value) => {
    for (const code in QuanHuyen) {
      if (code === value) {
        const temp = {
          name: QuanHuyen[code].name_with_type,
          code: value,
        };
        setCity(temp);
        return;
      }
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleOnClick = async () => {
    await putApi({
      endPoint: "/api/user/updateAddress",
      data: {
        addressId: data.addressId,
        name: username,
        phoneNumber: phone,
        streetLine: `${address}, ${city.name}, ${province.name}`,
      },
    });
    if (defaultAddress) {
      await postApi({
        endPoint: `/api/user/makeAddressDefault?addressId=${data.addressId}`,
      });
    }
    setFlag(1);
    getData();

    onOpenChange();
  };
  return (
    <>
      <span
        className="text-[14px] font-medium cursor-pointer text-blue-700 hover:text-black"
        onClick={onOpen}
      >
        Cập nhật
      </span>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        size="xl"
      >
        <ModalContent className="py-8">
          {(onClose) => (
            <>
              <ModalBody>
                <div className=" w-full h-full flex flex-col justify-between px-4 space-y-6">
                  <div className="w-full flex items-center justify-center gap-5">
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
                  <div className="w-full flex items-center justify-center gap-5">
                    <Input
                      className="rounded-full px-4"
                      type="text"
                      placeholder="Địa chỉ"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="w-full flex items-center justify-center gap-5">
                    <Select
                      className="w-[540px]"
                      placeholder="Chọn Tỉnh/TP"
                      aria-label="Select a province"
                      size="sm"
                      defaultSelectedKeys={[provinceDefault]}
                      variant="bordered"
                      radius="full"
                      onSelectionChange={(key) => handleSetProvince(...key)}
                    >
                      {listProvince.map((item, index) => (
                        <SelectItem key={item.code} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      onSelectionChange={(key) => handleSetCity(...key)}
                      value={city}
                      placeholder="Chọn Quận/Huyện"
                      aria-label="Select a city"
                      size="sm"
                      variant="bordered"
                      defaultSelectedKeys={[cityDefault]}
                      radius="full"
                      className="w-[540px]"
                    >
                      {listCity.map((item, index) => (
                        <SelectItem key={item.code} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="default"
                      checked={defaultAddress}
                      onCheckedChange={() => setDefaultAddress(!defaultAddress)}
                    />
                    <label
                      htmlFor="default"
                      className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Đặt làm mặc định
                    </label>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  className="border-none"
                  onClick={onClose}
                >
                  Hủy
                </Button>
                <Button onClick={handleOnClick}>Thêm mới</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
