import React, {useState} from 'react';
import { ArrowRightOutlined} from '@ant-design/icons';
import CardItemPay from './card_item_pay';


function CardItemOrder (props) {

    const detaiOrder = props.detaiOrder;

    const addDotsToNumber = (number) => {
        if(number) {
            const numberString = number.toString();
            const length = numberString.length;
            let result = "";
            for (let i = 0; i < length; i++) {
            result += numberString[i];
            if ((length - i - 1) % 3 === 0 && i !== length - 1) 
                result += ".";
            }
            return result;
        }
    }
   
    return (
      
        <div className="h-[100%] w-[100%] bg-gray-200 rounded-md mt-6 cursor-pointer">
            <div className='flex justify-between items-center bg-blue-700 px-6 py-3 rounded-md mt-6'>
                <div>
                    <p className='text-md font-bold text-white'>#{detaiOrder.id}</p>
                    <p className='text-xs text-white'>{detaiOrder.orderDate}</p>
                </div>
                <p className='text-xs font-bold text-black bg-white rounded-full p-2'>
                    {detaiOrder?.orderStatus === 0 ? (
                        `Chưa thanh toán`
                        ) : detaiOrder?.orderStatus === 1  ? (
                        `Đã thanh toán`
                        ) : detaiOrder?.orderStatus === 2 ? (
                        `Đã hủy`
                        ) : (
                        ""
                        )}</p>   
            </div>
            <div className='px-3 pb-1'>
                {detaiOrder.orderLines.map((product, index) => {
                return (
                    <CardItemPay
                        key={index}
                        productData={product} 
                        />
                )})}
            </div>
            <hr className='border-t-1 border-gray-300'/>
            <div className='flex flex-row justify-end px-6 py-5'>
                <p className='font-bold text-sm'>{addDotsToNumber(detaiOrder.orderTotal)}đ</p>
            </div>
            
        </div>
    );
}
export default CardItemOrder;