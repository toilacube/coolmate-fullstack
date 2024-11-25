"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { notification, Space } from "antd";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { convertPrice, getAllCategoryNames } from "@/lib/utils";
import { list, stringify } from "postcss";
import axios from "axios";
import { useEffect } from "react";

const CreateProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState();
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
  const listColor = [
    {
      color: "Đen",
      url: "https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/October2023/colorDen_2A8.jpg",
    },
    {
      color: "Trắng",
      url: "https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/October2023/colorTrang_1A2.jpg",
    },
    {
      color: "Xanh Navy",
      url: "https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/October2023/mau-xanh-navy_54.jpg",
    },
    {
      color: "Xanh Nhạt",
      url: "https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/June2023/xanh_nhat_200gsm-2.jpg",
    },
    {
      color: "Xám",
      url: "https://media.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/April2023/cotton100_xam-7.jpg",
    },
  ];
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
    setNumProduct(Number(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSetCategory = (value) => {
    setCategory(value);
  };
  const handleSetColor = (value) => {
    setColor(listColor[value]);
  };
  const handleSizeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setListSizeChose([...listSizeChose, value]);
    } else {
      setListSizeChose(listSizeChose.filter((option) => option !== value));
    }
  };

  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setListImage([
        ...listImage,
        { file: file, image: URL.createObjectURL(file) },
      ]);
    }
  };
  const deleteImage = (index) => {
    const newImageUrls = [...listImage];
    newImageUrls.splice(index, 1);
    setListImage(newImageUrls);
  };
  const deleteColorChose = (index) => {
    listColorChose.splice(index, 1);
    setListColorChose([...listColorChose]);
  };
  const handleAddColor = () => {
    if (
      Object.keys(color).length < 1 ||
      listSizeChose.length < 1 ||
      listImage.length < 1
    )
      openNotificationWithIcon("error", "Bạn chưa điền đủ thông tin màu sắc");
    else if (numProduct < 0)
      openNotificationWithIcon("error", "Số lượng không hợp lệ");
    else {
      openNotificationWithIcon("success", `Thêm màu ${color.color} thành công`);
      setListColorChose([
        ...listColorChose,
        {
          Color: color,
          Size: listSizeChose,
          Qty: numProduct,
          Images: listImage,
        },
      ]);
      setColor({});
      setNumProduct(0);
      setListSizeChose([]);
      setListImage([]);
    }
  };
  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleVisibilityChange = (value) => {
    setVisibility(value);
  };

  const handleAddProduct = () => {
    if (!productName || !costProduct || !category || listColorChose.length < 1)
      openNotificationWithIcon("error", "Bạn chưa điền đủ thông tin sản phẩm");
    else if (costProduct < 0)
      openNotificationWithIcon("error", "Giá sản phẩm không hợp lệ");
    else {
      var newProduct = new FormData();
      newProduct.append("Name", productName);
      newProduct.append("PriceInt", costProduct);
      newProduct.append("PriceStr", convertPrice(costProduct));
      newProduct.append("Description", description);

      listColorChose.forEach((item, index) => {
        newProduct.append(`ProductItems[${index}][Qty]`, item.Qty);
        newProduct.append(
          `ProductItems[${index}][Color][color]`,
          item.Color.color
        );
        newProduct.append(`ProductItems[${index}][Color][url]`, item.Color.url);
        item.Images.forEach((image) => {
          newProduct.append(`ProductItems[${index}][Images][]`, image.file);
        });
        item.Size.forEach((size, index1) => {
          newProduct.append(`ProductItems[${index}][Size][${index1}]`, size);
        });
      });
      newProduct.append("CategoryId", category);

      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/api/product/add`,
        data: newProduct,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // data: {
        //   Name: productName,
        //   PriceInt: costProduct,
        //   PriceStr: convertPrice(costProduct),
        //   Description: description,
        //   CategoryId: category,
        //   ProductItems: listColorChose
        // }
      })
        .then((res) => {
          openNotificationWithIcon(
            "success",
            `Thêm sản phẩm ${productName} thành công`
          );
          setProductName("");
          setCostProduct(1);
          setCategory("");
          setDescription("");
          setListColorChose([]);
          setStatus("");
          setVisibility("");
        })
        .catch((err) => console.log(err));
    }
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
            <p className="text-xl font-bold mx-3">Tạo sản phẩm mới</p>
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
            <p className="font-bold mb-5">Thêm màu sắc</p>
            <p className="text-sm mx-2 mb-1 mt-6">Màu sắc</p>
            <Select onValueChange={handleSetColor}>
              <SelectTrigger className=" rounded-full px-4">
                <SelectValue placeholder="Chọn màu sắc" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-30 w-[100%]">
                  <SelectGroup>
                    {listColor.map((item, index) => (
                      <SelectItem key={index} value={index}>
                        <div className="flex flex-row items-center">
                          <img
                            className="w-10 h-6 object-cover rounded-full mr-4"
                            src={item.url}
                            alt="color"
                          />
                          <span>{item.color}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
            <p className="text-sm mx-2 mb-1 mt-6">Số lượng</p>
            <Input
              className="rounded-full px-4"
              type="number"
              placeholder="Nhập số lượng"
              value={numProduct}
              onChange={handleNumProductChange}
            />
            <p className="text-sm mb-3 mt-6">Kích cỡ</p>
            <div className="flex flex-row items-center justify-between mb-8">
              {listSize.map((item, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={item}
                    id={item}
                    checked={listSizeChose.includes(item)}
                    onChange={handleSizeChange}
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>

            <input type="file" accept="image/*" onChange={handleImageUpload1} />
            <div className="flex flex-row flex-wrap gap-4 mt-4">
              {listImage.length > 0 &&
                listImage.map((item, index) => (
                  <div key={index} className="relative">
                    <img
                      className="h-44 w-44 object-contain border"
                      src={item.image}
                      alt={`image ${index + 1}`}
                    />
                    <Button
                      className="absolute top-2 left-2 rounded-full w-8 h-8 px-2 bg-red-500 hover:bg-red-700"
                      onClick={() => deleteImage(index)}
                    >
                      <DeleteFilled className="text-white text-md " />
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              className="rounded-full p-4 hover:bg-gray-200 hover:text-black mt-8"
              onClick={handleAddColor}
            >
              Thêm màu {color.color}
            </Button>
            <p className="font-bold mb-4 mt-8">Màu sắc đã chọn</p>
            <div className="mb-6 flex flex-row flex-wrap gap-4">
              {listColorChose.length > 0 ? (
                listColorChose.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-row items-center"
                  >
                    <img
                      className="w-10 h-6 object-cover rounded-full mr-1 ml-2"
                      src={item.Color.url}
                      alt="color"
                    />
                    <span>{item.Color.color}</span>
                    <Button
                      className="absolute top-2 left-0 rounded-full w-5 h-5 px-2 bg-red-500 hover:bg-red-700"
                      onClick={() => deleteColorChose(index)}
                    >
                      <DeleteFilled className="text-white text-xs " />
                    </Button>
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
          onClick={handleAddProduct}
        >
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};
export default CreateProduct;
