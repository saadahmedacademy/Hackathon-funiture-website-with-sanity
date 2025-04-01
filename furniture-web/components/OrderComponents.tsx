'use client';
import { OrderSchemaType } from '@/typings'
import React, { useState } from 'react'
import { TableBody, TableCell, TableRow } from './ui/table';
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { format } from "date-fns";


const OrderComponents = ({ orders }:{ orders:OrderSchemaType[]}) => {
    //To store the selectd order
    // const [selectedOrder,setSelectedOrder] = useState<OrderSchemaType | null>(null);
  return (
    <>
     <TableBody>
        <TooltipProvider>
            {orders.map(( (order, index) => (
              <Tooltip key={index}>
              <TooltipTrigger asChild >
                <TableRow className='h-12 cursor-pointer hover:bg-gray-100'>
                  <TableCell>{order?.orderNumber ? `${order?.orderNumber.slice(-9)}...` : "N/A"}</TableCell>
                  <TableCell className='hidden md:table-cell'>{order?.orderDate && format(new Date(order.orderDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{order.customerName ?? "N/A"}</TableCell>
                  <TableCell className='hidden md:table-cell'>{order?.customerEmail}</TableCell>
                  <TableCell>{order.totalPrice ?? "N/A"}$</TableCell>
                  <TableCell className='hidden sm:table-cell'>{order?.invoice?.invoice_number}</TableCell>
                  <TableCell >
                    <p className={`px-0.5 py-1  rounded-lg flex justify-center items-center font-medium ${order.orderStatus === "paid" ? `bg-green-100 text-green-600` :`bg-red-100 text-red-600` }`}>
                      {order.orderStatus}
                      </p> 
                      </TableCell>
                </TableRow>
              </TooltipTrigger>
              </Tooltip>
            )))}
        </TooltipProvider>
     </TableBody>
    </>
  )
}

export default OrderComponents
