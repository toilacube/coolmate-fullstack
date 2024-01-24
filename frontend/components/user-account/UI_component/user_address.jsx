"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import AddAddress from "./add-address-modal";
import { getApi } from "@/lib/fetch";
import { AddressItem } from "./address";
function UserAdress() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getApi({ endPoint: "/api/user/getAddresses" });
    setData(res.data.sort((a, b) => (b.isDefault === 1) - (a.isDefault === 1)));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center mb-10">
        <p className="text-3xl font-[600]">Địa chỉ của tôi</p>
        <AddAddress getData={getData} />
      </div>
      <Separator />
      <div className="flex flex-col flex-1 w-full mt-6">
        <div className="font-medium text-2xl">Sổ địa chỉ</div>
        <ScrollShadow className="w-full h-[400px] space-y-6 pt-4">
          {data?.map((item) => (
            <AddressItem key={item.addressId} item={item} getData={getData} />
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
}
export default UserAdress;
