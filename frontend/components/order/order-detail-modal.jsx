"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import CardItemDetailOrder from "../user-account/UI_component/card_item_detail_order";

const OrderDetailModal = ({ id, data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (isOpen && data) {
      setCurrentOrder(data.find((order) => order.id === id));
    }
  }, [isOpen, data]);
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
    } else return "0";
  };
  const [currentOrder, setCurrentOrder] = useState({});
  const priceMemo = useMemo(() => {
    if (currentOrder.orderLines) {
      const total = currentOrder.orderLines.reduce((total, cur) => {
        return total + parseInt(cur.price) * parseInt(cur.quantity);
      }, 0);
      return total;
    } else return 0;
  }, [currentOrder]);
  return (
    <>
      <p
        className="font-medium text-sm text-color-black capitalize cursor-pointer hover:underline"
        onClick={onOpen}
      >
        {id}
      </p>

      <Modal
        scrollBehavior="inside"
        backdrop="opaque"
        size="2xl"
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
              <ModalBody>
                <div>
                  <div className="flex flex-row items-center my-4">
                    <p className="font-semibold text-xl">Thông tin đơn hàng</p>
                    <p className="text-xs border border-blue-600 text-blue-600 bg-white rounded-full p-2 ml-auto">
                      {currentOrder?.orderStatus === 0
                        ? `Chưa thanh toán`
                        : currentOrder?.orderStatus === 1
                        ? `Đã thanh toán`
                        : currentOrder?.orderStatus === 2
                        ? `Đã hủy`
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Ngày đặt hàng:</p>
                    {currentOrder.orderDate ? (
                      <p className="text-sm">{currentOrder.orderDate}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Tên người nhận:</p>
                    {currentOrder.name ? (
                      <p className="text-sm">{currentOrder.name}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Địa chỉ email:</p>
                    {currentOrder.email ? (
                      <p className="text-sm">{currentOrder.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Số điện thoại:</p>
                    {currentOrder.phone ? (
                      <p className="text-sm">{currentOrder.phone}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Phương thức thanh toán:</p>
                    {currentOrder ? (
                      <p className="text-sm">
                        {currentOrder?.paymentMethod === 0
                          ? `Thanh toán khi nhận hàng`
                          : currentOrder?.paymentMethod === 1
                          ? `Ví điện tử Momo`
                          : currentOrder?.paymentMethod === 2
                          ? `Ví điện tử VNPay`
                          : ""}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Địa chỉ giao hàng:</p>
                    {currentOrder.shippingAddress ? (
                      <p className="text-sm">{currentOrder.shippingAddress}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex flex-row mb-2 items-center">
                    <p className="w-[30%] text-sm">Ghi chú:</p>
                    {currentOrder.note ? (
                      <p className="text-sm">{currentOrder.note}</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="bg-gray-200 rounded-b-md rounded-t-xl mt-6">
                    <div className="flex justify-between bg-blue-700 px-4 py-3 rounded-md mt-6">
                      <p className="text-sm font-bold text-white">
                        Tên sản phẩm
                      </p>
                      <p className="text-sm font-bold text-white">Số lượng</p>
                      <p className="text-sm font-bold text-white">
                        Giá niêm yết
                      </p>
                      <p className="text-sm font-bold text-white">Biến thể</p>
                      <p className="text-sm font-bold text-white">Thành tiền</p>
                    </div>
                    <div className="px-4 pb-2">
                      {currentOrder.orderLines &&
                        currentOrder.orderLines.map((product, index) => {
                          return (
                            <CardItemDetailOrder
                              key={index}
                              name={product.productName}
                              price={product.price}
                              num={product.quantity}
                              sizeChose={product.size}
                              colorChose={product.color}
                              img={product.img}
                            />
                          );
                        })}
                    </div>
                  </div>
                  <div className="px-3 my-10">
                    <div className="flex flex-row justify-between  mb-4">
                      <p className="text-sm">Tổng giá trị sản phẩm:</p>
                      <p className="text-sm">{addDotsToNumber(priceMemo)} đ</p>
                    </div>
                    <hr className="my-6"></hr>
                    <div className="flex flex-row justify-between mb-4">
                      <p className="text-sm">Mã giảm giá:</p>
                      <p className="text-sm"></p>
                    </div>
                    <hr className="my-6"></hr>
                    <div className="flex flex-row justify-between mb-4">
                      <p className="text-sm">Tổng khuyến mãi:</p>
                      <p className="text-sm">0đ</p>
                    </div>
                    <hr className="my-6"></hr>
                    <div className="flex flex-row justify-between mb-4">
                      <p className="text-sm">Phí giao hàng:</p>
                      <p className="text-sm">Miễn phí</p>
                    </div>

                    <div className="flex flex-row justify-between px-6 py-4 mt-6 rounded-b-xl bg-black text-white mb-4">
                      <p className="font-bold text-md">Tổng thanh toán:</p>
                      <p className="font-bold text-md">
                        {addDotsToNumber(priceMemo)} đ
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default OrderDetailModal;
