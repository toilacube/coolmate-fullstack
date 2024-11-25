"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteFilled } from "@ant-design/icons";
import { notification } from "antd";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams, useRouter } from "next/navigation";
import { convertPrice } from "@/lib/utils";
import axios from "axios";
import { useEffect } from "react";
import { getApi, putApi } from "@/lib/fetch";

const EditProductPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState();
  const param = useParams();
  const getAllCategories = (
    url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/category`
  ) => {
    try {
      const options = {
        method: "GET",
        url: url,
      };
      axios
        .request(options)
        .then(function (response) {
          setCategories(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const [data, setData] = useState();
  const getProduct = async () => {
    const res = await getApi({
      endPoint: `/api/product/get/${param.productID}`,
    });
    setData({
      ...res.data,
      productItems: res.data.productItems.map((item) => {
        return {
          ...item,
          Color: {
            color: item.color,
            url: item.colorImage,
          },
        };
      }),
    });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const listSize = ["XS", "S", "M", "L", "XL", "XXL"];
  const [productName, setProductName] = useState("");
  const [costProduct, setCostProduct] = useState(0);
  const [numProduct, setNumProduct] = useState(1);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState({});
  const [listSizeChose, setListSizeChose] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [listColorChose, setListColorChose] = useState([]);
  const [status, setStatus] = useState("");
  const [visibility, setVisibility] = useState("");
  const [id, setId] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: type,
      description: content,
    });
  };

  const handleCostProductChange = (e) => {
    setCostProduct(e.target.value);
  };
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleNumProductChange = (e) => {
    setNumProduct(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSetCategory = (value) => {
    setCategory(value);
  };

  const handleUpdateColor = async () => {
    if (
      Object.keys(color).length < 1 ||
      listSizeChose.length < 1 ||
      listImage.length < 1 ||
      !id
    )
      openNotificationWithIcon("error", "Bạn chưa điền đủ thông tin màu sắc");
    else {
      try {
        const res = await putApi({
          endPoint: `/api/productItem/updateQtyInStock`,
          data: {
            productItemId: id,
            newQty: numProduct,
          },
        });
    
        if (res.status === 200) {
          setColor({});
          setNumProduct(0);
          setListSizeChose([]);
          setListImage([]);
          openNotificationWithIcon("success", `Cập nhật thành công`);
          getProduct();
        } 
       else {
          console.log('Unexpected response:', res.status);
          // Handle unexpected response status codes
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          openNotificationWithIcon("error", `Số lượng không phù hợp`);
          console.error('Error 400: Invalid item ID or quantity in stock.', error.response.data);
          // Handle the specific 400 error, e.g., show an error message to the user
        } else {
          console.error('An unexpected error occurred:', error);
          // Handle other errors, e.g., network issues
        }
      }
    }
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleVisibilityChange = (value) => {
    setVisibility(value);
  };

  const handleUpdateProduct = async () => {
    if (!productName || !costProduct || !category || listColorChose.length < 1)
      openNotificationWithIcon("error", "Bạn chưa điền đủ thông tin sản phẩm");
    else if (costProduct < 0)
      openNotificationWithIcon("error", "Giá sản phẩm không hợp lệ");
    else {
      const res = await putApi({
        endPoint: `/api/product/update`,
        data: {
          id: param.productID,
          name: productName,
          priceInt: costProduct,
          categoryId: category,
          description: description,
          priceStr: convertPrice(costProduct),
        },
      });
      if (res.status === 200) {
        openNotificationWithIcon(
          "success",
          `Cập nhật sản phẩm ${productName} thành công`
        );

        getProduct();
      }
    }
  };

  useEffect(() => {
    if (data) {
      setProductName(data.name);
      setCostProduct(data.priceInt);
      setCategory(data.categoryId);
      setDescription(data.description);
      setStatus(data.status ? "Enabled" : "Disabled");
      setVisibility(data.visibility ? "Visible" : "Not visible");
      setListColorChose(data.productItems);
    }
  }, [data]);
  const handleSetInfor = (item) => {
    setNumProduct(item.qtyInStock);
    setColor(item.Color);
    setListSizeChose(item.size);
    setListImage(item.productItemImages);
    setId(item.id);
  };
  return (
    <div className="w-[100%]">
      <div className="w-[100%] bg-gray-100 flex flex-row">
        {contextHolder}
        <div className="w-[65%] p-8">
          <div
            className="flex flex-row items-center mb-8 cursor-pointer"
            onClick={() => {
              router.push("/admin/products");
            }}
          >
            <LeftCircleOutlined className="text-black text-2xl" />
            <p className="text-xl font-bold mx-3">Cập nhật sản phẩm</p>
          </div>
          <div className="shadow-md px-8 py-10 mb-6 bg-white rounded-md">
            <p className="font-bold mb-5">Thông tin chung</p>
            <p className="text-sm mx-2 mb-1 mt-8">Tên sản phẩm</p>
            <Input
              className="rounded-full px-4"
              type="text"
              placeholder="Nhập tên sản phẩm"
              value={productName}
              onChange={handleProductNameChange}
            />
            <div className="flex flex-row justify-between">
              <div className="w-[100%]">
                <p className="text-sm mx-2 mb-1 mt-6">Giá sản phẩm</p>
                <Input
                  className="rounded-full px-4"
                  type="number"
                  placeholder="Nhập giá sản phẩm"
                  value={costProduct}
                  onChange={handleCostProductChange}
                />
              </div>
            </div>
            <p className="text-sm mx-2 mb-1 mt-6">Category</p>
            <div className="flex flex-row justify-between gap-4">
              <Select onValueChange={handleSetCategory} value={category}>
                <SelectTrigger className=" rounded-full px-4">
                  <SelectValue placeholder="Chọn Category" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-30 w-[100%]">
                    {categories?.map((item) => {
                      return (
                        <SelectGroup key={item.id}>
                          <SelectLabel>{item.categoryName}</SelectLabel>
                          {item.children.map((child) => (
                            <SelectItem
                              key={child.id}
                              value={child.id}
                              className="cursor-pointer"
                            >
                              {child.categoryName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <Button className="rounded-full p-4 hover:bg-gray-200 hover:text-black">
                Thêm Categogy mới
              </Button>
            </div>
            <p className="text-sm mx-2 mb-1 mt-6">Đặc điểm nổi bật</p>
            <Textarea
              className="rounded-xl px-4 "
              placeholder="Nhập ..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="shadow-md px-8 py-10 mb-6 bg-white rounded-md">
            <p className="font-bold mb-5">Chỉnh sửa sản phẩm</p>
            <p className="text-sm mx-2 mb-1 mt-6">Màu sắc</p>
            {Object.keys(color).length > 0 && (
              <div className="flex flex-row items-center mt-2">
                <img
                  className="w-10 h-6 object-cover rounded-full mr-4"
                  src={color?.url}
                  alt="color"
                />
                <span>{color?.color}</span>
              </div>
            )}

            <p className="text-sm mx-2 mb-1 mt-6">Số lượng</p>
            <Input
              className="rounded-full px-4"
              type="number"
              placeholder="Nhập số lượng"
              value={numProduct}
              onChange={handleNumProductChange}
            />
            <p className="text-sm mb-3 mt-6 mx-2 ">Kích cỡ</p>
            <div className="flex flex-row items-center justify-between mb-8 mx-2">
              {listSize.map((item, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={item}
                    id={item}
                    checked={listSizeChose === item}
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>
            <p className="text-sm mx-2 mb-1 mt-6">Hình ảnh</p>
            <div className="flex flex-row flex-wrap gap-4 mt-4  ">
              {listImage.length > 0 &&
                listImage.map((item, index) => (
                  <div key={index} className="relative">
                    <img
                      className="h-44 w-44 object-contain border"
                      src={item.url}
                      alt={`image ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
            <Button
              className="rounded-full p-4 hover:bg-gray-200 hover:text-black mt-8"
              onClick={handleUpdateColor}
            >
              Cập nhật màu {color.color}
              {!!listSizeChose.length && ` [${listSizeChose}]`}
            </Button>
            <p className="font-bold mb-4 mt-8">Màu sắc đã chọn</p>
            <div className="mb-6 flex flex-row flex-wrap gap-4 cursor-pointer">
              {listColorChose.length > 0 ? (
                listColorChose.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-row items-center"
                    onClick={() => handleSetInfor(item)}
                  >
                    <img
                      className="w-10 h-6 object-cover rounded-full mr-1 ml-2"
                      src={item.Color.url}
                      alt="color"
                    />
                    <span>
                      {item.Color.color}[{item.size}]
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm">Chưa có màu nào</p>
              )}{" "}
            </div>
          </div>
        </div>
        <div className="w-[30%] mt-[92px]">
          <div className="shadow-md px-8 py-10 mb-6 bg-white rounded-md">
            <p className="font-bold mb-4">Trạng thái sản phẩm</p>
            <p className="text-sm mb-3 mt-6">Status</p>
            <RadioGroup
              className="flex flex-row my-4 gap-6"
              defaultValue="Disabled"
              onValueChange={handleStatusChange}
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    status === "Disabled" ? "border-blue-600 text-blue-600" : ""
                  }
                  value="Disabled"
                  id="Disabled"
                />
                <Label htmlFor="Disabled">Disabled</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    status === "Enabled" ? "border-blue-600 text-blue-600" : ""
                  }
                  value="Enabled"
                  id="Enabled"
                />
                <Label htmlFor="Enabled">Enabled</Label>
              </div>
            </RadioGroup>
            <p className="text-sm mb-3 mt-6">Visibility</p>
            <RadioGroup
              className="flex flex-row my-4 gap-6"
              defaultValue="Not visible"
              onValueChange={handleVisibilityChange}
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    visibility === "Not visible"
                      ? "border-blue-600 text-blue-600"
                      : ""
                  }
                  value="Not visible"
                  id="Not visible"
                />
                <Label htmlFor="Not visible">Not visible</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  className={
                    visibility === "Visible"
                      ? "border-blue-600 text-blue-600"
                      : ""
                  }
                  value="Visible"
                  id="Visible"
                />
                <Label htmlFor="Visible">Visible</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-gray-100 ">
        <Button
          className="w-[95%] rounded-full p-8 mb-20 ml-8"
          onClick={handleUpdateProduct}
        >
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};
export default EditProductPage;
