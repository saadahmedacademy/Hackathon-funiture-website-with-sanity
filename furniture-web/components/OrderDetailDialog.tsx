
import type { OrderSchemaType } from "@/typings"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { FileText } from "lucide-react"

interface Props {
  order: OrderSchemaType | null
  isOpen: boolean
  onClose: () => void
}

const OrderDetailDialog = ({ order, isOpen, onClose }: Props) => {
  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto order-detail-bar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Order Detail — {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {/* Customer Information */}
          <section className="space-y-3 rounded-lg border p-4">
            <h3 className="font-semibold">Customer Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Invoice No:</span>
                <span className="font-medium">{order.invoice?.invoice_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={order.orderStatus === "paid" ? "success" : "warning"}>{order.orderStatus}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">
                  {order.orderDate && format(new Date(order.orderDate), "dd/MM/yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total Price:</span>
                <span className="font-medium">{order.totalPrice}</span>
              </div>
            </div>
          </section>

          {/* Invoice Section */}
          <section className="flex flex-col justify-center  rounded-lg border px-4 py-4">
            <h3 className="font-semibold text-center">Invoice</h3>
            {order.invoice?.invoice_url ? (
              <div className="mt-4 flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <Link
                  href={order.invoice.invoice_url}
                  target="_blank"
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Download Invoice
                </Link>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No invoice available
              </div>
            )}
          </section>
        </div>

        {/* Products Table */}
        <div className="mt-6 rounded-lg border">
          <h3 className="border-b p-4 font-semibold">Order Items</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {order.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                          <Image
                            src={urlFor(product.product.image).url() || "/placeholder.svg"}
                            alt={product.product.name}
                            fill
                            sizes="(max-width: 768px) 80px, 80px"
                            priority={index < 2} // Prioritize loading first two images
                          />
                        </div>
                        <p className="font-medium">{product.product.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{product.quantity}</TableCell>
                    <TableCell className="text-center">{product.product.price}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog


