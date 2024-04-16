"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";

import {IBooking} from "@/models/bookingModel";

import Pagination from "./Pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {Badge} from "./ui/badge";
import {Button, buttonVariants} from "./ui/button";

type BookingProps = {
  data: IBooking[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  user: any;
};

const Bookings = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
  user,
}: BookingProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/booking/details/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of your bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Adults</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Is Paid</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{booking._id}</TableCell>
                  <TableCell>
                    <Image
                      src={booking.user.image.url}
                      alt={booking.user.image.public_id}
                      height={50}
                      width={50}
                      className="h-12 rounded"
                    />
                    <span className="capitalize">{booking.user.name}</span>
                    <br />
                    {user.role === "admin" && (
                      <Link
                        href={`/booking/user/${booking.user._id}`}
                        className={buttonVariants()}
                      >
                        user booking
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={booking.hotel.image[0].url}
                      alt={booking.hotel.image[0].public_id}
                      height={50}
                      width={50}
                      className="h-12 rounded"
                    />
                    <span className="capitalize">{booking.hotel.title}</span>
                    <br />
                    {user.role === "admin" && (
                      <Link
                        href={`/booking/hotel/${booking.hotel._id}`}
                        className={buttonVariants()}
                      >
                        hotel booking
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{booking.numberOfDays}</TableCell>
                  <TableCell>{booking.totalPrice}</TableCell>
                  <TableCell>{booking.adults}</TableCell>
                  <TableCell>{booking.childrens}</TableCell>
                  <TableCell>
                    {booking.paymentResult.id} | {booking.paymentResult.status}{" "}
                    | {booking.paymentResult.razorpay_order_id} |{" "}
                    {booking.paymentResult.razorpay_payment_id} |{" "}
                    {booking.paymentResult.razorpay_signature}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "complete"
                          ? "success"
                          : booking.status === "failed"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={booking.isPaid ? "success" : "danger"}>
                      {booking.isPaid ? "paid" : "not paid"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdate(booking._id)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[14px] bg-white py-28 text-center shadow shadow-black dark:bg-black dark:shadow-white">
          <h3 className="text-xl font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Bookings;
