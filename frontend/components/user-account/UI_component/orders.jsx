"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ArrowRightOutlined, LeftCircleOutlined } from "@ant-design/icons";
import CardItemOdrer from "./card_item_order";
import CardItemDetailOrder from "./card_item_detail_order";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { notification, Space } from "antd";

function Orders(props) {
  const router = useRouter();
  const [isVisibleDetailOrder, setVisibleDetailOrder] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [responseData, setResponseData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: "Lỗi",
      description: content,
    });
  };

  const handleGetAllOrder = () => {
    try {
      const options = {
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/order/get`,
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
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetAllOrder();
  }, []);

  //   const listOrders = [
  //     {
  //       id: '33813410572',
  //       date: '9h20 23-07-2021',
  //       status: 'Chờ xác nhận',
  //       receiverName: 'Trần Nhung',
  //       email: '21522438@gm.uit.edu.vn',
  //       phone: '0867676666',
  //       pay: 'Thanh toán khi nhận hàng',
  //       address: '23/45A, Phường A, Thành phố Thái Bình, Thái Bình',
  //       totalCost: '2430000',
  //       listProduct: [
  //         {
  //           name: 'Shorts 84RISING Jurassic Warriors',
  //           price: '1300000',
  //           num: 2,
  //           colorChose: {
  //             color_name: 'Xanh rêu',
  //             imgs: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2023/APL100-258-6.jpg'
  //           },
  //           sizeChose: 'M'
  //         }
  //       ]
  //     },
  //     {
  //       id: '76016635040',
  //       date: '13h20 25-11-2021',
  //       status: 'Đã hủy',
  //       receiverName: 'Nguyễn Văn A',
  //       email: 'nva@gm.uit.edu.vn',
  //       phone: '086724926',
  //       pay: 'Momo',
  //       address: '23/45A, Phường A, Thành phố Biên Hòa, Đồng Nai',
  //       totalCost: '4519000',
  //       listProduct: [
  //         {
  //           name: 'Shorts 84RISING Jurassic Warriors',
  //           price: '850000',
  //           num: 5,
  //           colorChose: {
  //             color_name: 'Xám nhạt',
  //             imgs: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/October2023/ji3Untitled-1_45.jpg'
  //           },
  //           sizeChose: 'M'
  //         },
  //         {
  //           name: 'T-Shirt Cotton 220GSM',
  //           price: '269000',
  //           num: 1,
  //           colorChose: {
  //             color_name: 'Trắng',
  //             imgs: 'https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/August2023/APL100-EDIT-28.jpg'
  //           },
  //           sizeChose: 'XL'
  //         }
  //       ]
  //     }
  //   ]

  // console.log(currentOrder)

  const handleDetailOrder = (index) => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
    setVisibleDetailOrder(!isVisibleDetailOrder);
    setCurrentOrder(responseData[index]);
  };

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
  const priceMemo = useMemo(() => {
    if (currentOrder.orderLines) {
      const total = currentOrder.orderLines.reduce((total, cur) => {
        return total + parseInt(cur.price) * parseInt(cur.quantity);
      }, 0);
      return total;
    } else return 0;
  }, [currentOrder]);

  const handleCancelOrder = () => {
    try {
      const options = {
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/order/cancelOrder?orderId=${currentOrder.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .request(options, {})
        .then(function (response) {
          console.log(response.data);
          handleGetAllOrder();
          setVisibleDetailOrder(false);
        })
        .catch(function (error) {
          if (error.response.status === 401)
            openNotificationWithIcon("error", `Đăng nhập để tiếp tục`);
          else if (error.response.status === 400)
            openNotificationWithIcon("error", error.response.data);
          else if (error.response.status === 403)
            openNotificationWithIcon(
              "error",
              `Không có quyền update status ó đơ`
            );
          else openNotificationWithIcon("error", "Lỗi");
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      {" "}
      {contextHolder}
      <div className={isVisibleDetailOrder ? "hidden" : "visible"}>
        <p className="text-3xl mb-5">Lịch sử đơn hàng</p>
        <p className=" text-gray-500 text-lg">
          Đơn hàng của bạn: {responseData.length} đơn hàng
        </p>
        <div className="">
          {responseData &&
            responseData.map((order, index) => {
              return (
                <div key={index} onClick={(e) => handleDetailOrder(index)}>
                  <CardItemOdrer detaiOrder={responseData[index]} />{" "}
                </div>
              );
            })}
        </div>
      </div>
      <div className={isVisibleDetailOrder ? "visible" : "hidden"}>
        <div className="flex flex-row items-center mb-8">
          <LeftCircleOutlined
            className="text-black text-3xl"
            onClick={(e) => setVisibleDetailOrder(false)}
          />
          <p className="text-2xl font-bold mx-3">
            Thông tin đơn hàng #{currentOrder.id}
          </p>
          <p className="text-xs border border-blue-600 text-blue-600 bg-white rounded-full p-2">
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
          {currentOrder.receiverName ? (
            <p className="text-sm">{currentOrder.receiverName}</p>
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
        {currentOrder.orderStatus === 0 ? (
          <Button className="rounded-full my-6" onClick={handleCancelOrder}>
            Hủy đơn hàng
          </Button>
        ) : (
          ""
        )}

        <div className="bg-gray-200 rounded-b-md rounded-t-xl mt-6">
          <div className="flex justify-between bg-blue-700 px-4 py-3 rounded-md mt-6">
            <p className="text-sm font-bold text-white">Tên sản phẩm</p>
            <p className="text-sm font-bold text-white">Số lượng</p>
            <p className="text-sm font-bold text-white">Giá niêm yết</p>
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
            <p className="text-sm">{addDotsToNumber(priceMemo)}đ</p>
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
              {addDotsToNumber(currentOrder.orderTotal)}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
