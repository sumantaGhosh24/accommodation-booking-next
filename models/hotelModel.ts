import {Schema, model, models} from "mongoose";

export interface IHotel extends Document {
  _id: string;
  owner: {
    _id: string;
    name: string;
    email: string;
    image: {
      url: string;
      public_id: string;
    };
  };
  title: string;
  description: string;
  content: string;
  image: {
    url: string;
    public_id: string;
    blurHash: string;
  }[];
  category: {
    _id: string;
    name: string;
    image: {
      url: string;
      public_id: string;
    };
  };
  price: string;
  discount: string;
  specialNote: string;
  dimension: string;
  numberOfBeds: string;
  offeredAmenities: string[];
  country: string;
  state: string;
  city: string;
  zip: string;
  address: string;
  latitude: string;
  longitude: string;
  isBooked: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema = new Schema(
  {
    owner: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    title: {type: String, required: true},
    description: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    image: [{url: String, public_id: String, blurHash: String}],
    category: {type: Schema.Types.ObjectId, required: true, ref: "Category"},
    price: {type: String, required: true},
    discount: {type: String, required: true},
    specialNote: {type: String},
    dimension: {type: String},
    numberOfBeds: {type: String},
    offeredAmenities: [String],
    isBooked: {type: Boolean},
    isFeatured: {type: Boolean},
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    zip: {type: String, required: true},
    address: {type: String, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
  },
  {timestamps: true}
);

const HotelModel = models?.Hotel || model("Hotel", HotelSchema);

export default HotelModel;
