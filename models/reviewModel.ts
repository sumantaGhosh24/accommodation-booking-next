import {Schema, model, models} from "mongoose";

export interface IReview extends Document {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
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
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema(
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
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
);

const ReviewModel = models?.Review || model("Review", ReviewSchema);

export default ReviewModel;
