"use client";
import UpdateAddress from "./update-address-modal";
import { deleteApi, postApi } from "@/lib/fetch";
import { useSelector } from "react-redux";
import { TiStar } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const AddressItem = ({
  item,
  getData,
  isShowDefault = true,
  updateAdressData,
}) => {
  const user = useSelector((state) => state.user);
  const handleOnClick = async (addressId) => {
    const res = await postApi({
      endPoint: `/api/user/makeAddressDefault?addressId=${addressId}`,
    });
    if (res.status === 200) {
      getData();
    }
  };
  const handleDelete = async (addressId) => {
    const res = await deleteApi({
      endPoint: `/api/user/deleteAddress/${addressId}`,
    });
    if (res.status === 200) {
      getData();
    }
  };
  return (
    <div className="w-full" key={item.addressId}>
      <div className="w-full flex items-center">
        <h3 className="font-semibold text-base">{item.name}</h3>
        {!!item.isDefault && (
          <div className="rounded-full border flex ml-4 items-center justify-center py-[6px] px-[10px] gap-1">
            <TiStar className=" h-4 w-4" />
            <span className="font-semibold text-xs">Mặc định</span>
          </div>
        )}
        <div className="flex ml-auto gap-4">
          <UpdateAddress
            data={{
              addressId: item.addressId,
              province: item.streetLine.split(", ")[2],
              address: item.streetLine.split(", ")[0],
              phone: item.phoneNumber ? item.phoneNumber : user.phoneNumber,
              username: item.name,
              city: item.streetLine.split(", ")[1],
              isDefault: item.isDefault,
            }}
            getData={getData}
          />

          <Separator orientation="vertical" className="h-auto" />
          {isShowDefault ? (
            <span
              className="text-[14px] font-medium cursor-pointer text-blue-700 hover:text-black"
              onClick={() => handleDelete(item.addressId)}
            >
              Xóa
            </span>
          ) : (
            <span
              className="text-[14px] font-medium cursor-pointer text-blue-700 hover:text-black"
              onClick={() => updateAdressData(item)}
            >
              Sử dụng
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex items-end mt-3">
        <div className="w-full flex flex-col">
          <div className="text-base font-medium text-zinc-600">
            {item.phoneNumber ? item.phoneNumber : user.phoneNumber}
          </div>
          <div className="text-base font-medium text-zinc-600 ">
            {item.streetLine}
          </div>
        </div>
        {!item.isDefault && isShowDefault && (
          <div className="flex ml-auto gap-4 pt-1">
            <Button
              className="rounded-full py-2 px-8 text-[13px] font-semibold bg-white text-black 
                      hover:bg-black hover:text-white border border-black"
              onClick={() => handleOnClick(item.addressId)}
            >
              Đặt làm mặc định
            </Button>
          </div>
        )}
      </div>
      <Separator className="mt-6" />
    </div>
  );
};
