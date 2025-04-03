import { OrderSchemaType } from '@/typings'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { format } from 'date-fns';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Props {
  order: OrderSchemaType | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog = ({ order, isOpen, onClose }: Props) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto order-detail-bar">
        <DialogHeader>
          <DialogTitle>Order Detail -- {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <section className="mt-4 space-y-2">
          <div>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Customer Email:</strong> {order.customerEmail}</p>
            <p><strong>Invoice No:</strong> {order.invoice?.invoice_number}</p>
            <p><strong>Order status:</strong>
              <span className={`${order.orderStatus === "paid" ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}`}> {order.orderStatus}</span>
            </p>
            <p><strong>Order date:</strong> {order.orderDate && format(new Date(order.orderDate), 'dd/MM/yyyy')}</p>
            <p><strong>Total price:</strong> {order.totalPrice}</p>
          </div>

          {order.invoice?.invoice_url && (
            <Link 
              href={order.invoice.invoice_url}
              target="_blank"
              className="text-black hover:bg-gray-200 border-2 drop-shadow-lg px-4 py-2.5 rounded-md mt-3 inline-block">
              Download invoice
            </Link>
          )}
        </section>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-4">
                  <div className=" h-24 w-24">
                    <Image 
                      src={urlFor(product.product.image).url()}
                      alt={product.product.name}
                      width={100}
                      height={100}
                      className="h-full "
                    />
                  </div>
                  <p className='font-semibold text-sm'>{product.product.name}</p>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailDialog;
