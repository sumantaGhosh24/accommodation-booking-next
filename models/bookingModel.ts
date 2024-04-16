import {Schema, model, models} from "mongoose";

export interface IBooking extends Document {
  _id: string;
  user: {
    _id: string;
    email: string;
    name: string;
    image: {
      url: string;
      public_id: string;
    };
  };
  hotel: {
    _id: string;
    title: string;
    image: {
      url: string;
      public_id: string;
      blurHash: string;
    }[];
    price: number;
  };
  checkInDate: string;
  checkOutDate: string;
  numberOfDays: string;
  adults: string;
  childrens: string;
  totalPrice: string;
  paymentResult: {
    id: string;
    status: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
  status: "pending" | "complete" | "failed";
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    numberOfDays: {
      type: String,
      required: true,
    },
    adults: {
      type: String,
      required: true,
    },
    childrens: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      razorpay_order_id: {
        type: String,
      },
      razorpay_payment_id: {
        type: String,
      },
      razorpay_signature: {
        type: String,
      },
    },
    status: {
      type: String,
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

const BookingModel = models?.Booking || model("Booking", BookingSchema);

export default BookingModel;
