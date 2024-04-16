import {NextResponse} from "next/server";
import crypto from "crypto";

import connectDB from "@/libs/db";
import BookingModel from "@/models/BookingModel";

export async function POST(req: Request, res: Response) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    user,
    hotel,
    checkInDate,
    checkOutDate,
    numberOfDays,
    adults,
    childrens,
    totalPrice,
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    connectDB();

    await BookingModel.create({
      user,
      hotel,
      paymentResult: {
        id: razorpay_order_id,
        status: "success",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      checkInDate,
      checkOutDate,
      numberOfDays,
      adults,
      childrens,
      totalPrice,
      status: "pending",
      isPaid: true,
    });
  } else {
    return NextResponse.json({message: "fail"}, {status: 400});
  }

  return NextResponse.json({message: "success"}, {status: 200});
}
