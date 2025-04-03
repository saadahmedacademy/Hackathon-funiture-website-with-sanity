'use client';
import { OrderSchemaType } from '@/typings'
import React, { useState } from 'react'
import { TableBody, TableCell, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { format } from "date-fns";
import OrderDetailDialog from './OrderDetailDialog';


const OrderComponents = ({ orders }:{ orders:OrderSchemaType[]}) => {
    //To store the selectd order
    const [selectedOrder,setSelectedOrder] = useState<OrderSchemaType | null>(null);
    
  return (
    <>
     <TableBody>
        <TooltipProvider>
            {orders.map(( (order, index) => (
              <Tooltip key={index}>
              <TooltipTrigger asChild >
                <TableRow className='h-12 cursor-pointer hover:bg-gray-100' onClick={() => setSelectedOrder(order)}>
                  <TableCell className='font-medium'>{order?.orderNumber ? `${order?.orderNumber.slice(-9)}...` : "N/A"}</TableCell>
                  <TableCell className='hidden md:table-cell'>{order?.orderDate && format(new Date(order.orderDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{order.customerName ?? "N/A"}</TableCell>
                  <TableCell className='hidden md:table-cell'>{order?.customerEmail}</TableCell>
                  <TableCell>{order.totalPrice ?? "N/A"}$</TableCell>
                  <TableCell className='hidden sm:table-cell'>{order?.invoice && <p>{order?.invoice ? order.invoice?.invoice_number : "---"}</p>}</TableCell>
                  <TableCell >
                    <span className={`px-1 py-1  rounded-lg flex justify-center items-center font-medium ${order.orderStatus === "paid" ? `bg-green-100 text-green-700` :`bg-red-100 text-yellow-700` }`}>
                      {order.orderStatus}
                      </span> 
                      </TableCell>
                </TableRow>
              </TooltipTrigger>

              <TooltipContent>
                Click to see the ordrer detail
              </TooltipContent>
              </Tooltip>
            )))}
        </TooltipProvider>
     </TableBody>
     <OrderDetailDialog order={selectedOrder}  isOpen={!!setSelectedOrder} onClose={() => setSelectedOrder(null)}/>
    </>
  )
}

export default OrderComponents
