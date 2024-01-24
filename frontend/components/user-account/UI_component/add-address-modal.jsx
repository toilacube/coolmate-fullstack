"use client";
import React, { useState } from "react";
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
import { postApi } from "@/lib/fetch";
export default function AddAddress({ getData }) {
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
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [province, setProvince] = useState({});
  const [city, setCity] = useState(null);
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
        return;
      }
    }
  };
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
    await postApi({
      endPoint: "/api/user/addAddress",
      data: {
        name: username,
        phoneNumber: phone,
        streetLine: `${address}, ${city.name}, ${province.name}`,
        isDefault: defaultAddress ? 1 : 0,
      },
    });
    setUsername("");
    setPhone("");
    setAddress("");
    setDefaultAddress(false);
    setProvince({});
    setCity(null);
    getData();
    onOpenChange();
  };
  return (
    <>
      <Button
        className="ml-auto rounded-full py-7 px-12 uppercase text-[17px] hover:bg-blue-700"
        onClick={onOpen}
      >
        Thêm địa chỉ mới
      </Button>
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
                      placeholder="Chọn Quận/Huyện"
                      aria-label="Select a city"
                      size="sm"
                      variant="bordered"
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
