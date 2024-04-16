"use server";

import {revalidatePath} from "next/cache";
import {SortOrder} from "mongoose";

import connectDB from "@/libs/db";
import {destroyFromCloudinary, uploadToCloudinary} from "@/libs/cloudinary";
import {dynamicBlurDataUrl} from "@/libs/utils";
import HotelModel from "@/models/hotelModel";
import CategoryModel from "@/models/categoryModel";
import UserModel from "@/models/userModel";

import getServerUser from "./getServerUser";

interface CreateHotelParams {
  title: string;
  description: string;
  content: string;
  formData: any;
  category: string;
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
  isBooked?: boolean;
  isFeatured?: boolean;
}

interface UpdateHotelParams {
  id?: string;
  title: string;
  description: string;
  content: string;
  category: string;
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
  isBooked?: boolean;
  isFeatured?: boolean;
  path: string;
}

interface FetchCategoryParams {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  category?: string;
}

const getCategoryByName = async (name: string) => {
  return CategoryModel.findOne({name: {$regex: name, $options: "i"}});
};

const populateHotel = (query: any) => {
  return query
    .populate({
      path: "owner",
      model: UserModel,
      select: "_id name email image",
    })
    .populate({
      path: "category",
      model: CategoryModel,
      select: "_id name image",
    });
};

export async function getHotel(id: string) {
  try {
    connectDB();

    const hotel = await HotelModel.findById(id)
      .populate("owner", "_id name email image")
      .populate("category", "_id name image");

    return JSON.parse(JSON.stringify(hotel));
  } catch (error: any) {
    throw new Error(`Failed to get hotel data: ${error.message}`);
  }
}

export async function getHotels({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  searchString = "",
  category,
}: FetchCategoryParams) {
  try {
    connectDB();

    const titleCondition = searchString
      ? {title: {$regex: searchString, $options: "i"}}
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? {category: categoryCondition._id} : {},
      ],
    };
    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const hotelsQuery = HotelModel.find(conditions)
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const hotels = await populateHotel(hotelsQuery);
    const hotelsCount = await HotelModel.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(hotels)),
      totalPages: Math.ceil(hotelsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get hotels data: ${error.message}`);
  }
}

export async function createHotel({
  title,
  description,
  content,
  formData,
  category,
  price,
  discount,
  specialNote,
  dimension,
  numberOfBeds,
  offeredAmenities,
  country,
  state,
  city,
  zip,
  address,
  latitude,
  longitude,
  isBooked = false,
  isFeatured = false,
}: CreateHotelParams) {
  try {
    connectDB();

    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized.");

    const files = formData.getAll("files");

    const photos = await uploadToCloudinary(files);

    const blurDataPromise = photos.map((photo) =>
      dynamicBlurDataUrl(photo.secure_url)
    );

    const blurData = await Promise.all(blurDataPromise);

    const imageData = photos.map((photo, i) => ({
      url: photo.secure_url,
      public_id: photo.public_id,
      blurHash: blurData[i],
    }));

    const newHotel = new HotelModel({
      owner: user?._id,
      title,
      description,
      content,
      image: imageData,
      category,
      price,
      discount,
      specialNote,
      dimension,
      numberOfBeds,
      offeredAmenities,
      country,
      state,
      city,
      zip,
      address,
      latitude,
      longitude,
      isBooked,
      isFeatured,
    });

    await newHotel.save();

    revalidatePath("/hotel");
  } catch (error: any) {
    throw new Error(`Failed to create hotel: ${error.message}`);
  }
}

export async function updateHotel({
  id,
  title,
  description,
  content,
  category,
  price,
  discount,
  specialNote,
  dimension,
  numberOfBeds,
  offeredAmenities,
  country,
  state,
  city,
  zip,
  address,
  latitude,
  longitude,
  isBooked = false,
  isFeatured = false,
  path,
}: UpdateHotelParams) {
  try {
    connectDB();

    const hotel = await HotelModel.findById(id);
    if (!hotel) throw new Error("Hotel not found.");

    await HotelModel.findByIdAndUpdate(id, {
      title,
      description,
      content,
      category,
      price,
      discount,
      specialNote,
      dimension,
      numberOfBeds,
      offeredAmenities,
      country,
      state,
      city,
      zip,
      address,
      latitude,
      longitude,
      isBooked,
      isFeatured,
    });

    revalidatePath(path);
    revalidatePath("/hotel");
  } catch (error: any) {
    throw new Error(`Failed to update hotel: ${error.message}`);
  }
}

export async function updateHotelImage({
  id,
  formData,
  path,
}: {
  id: string;
  formData: any;
  path: string;
}) {
  try {
    connectDB();

    const hotel = await HotelModel.findById(id);
    if (!hotel) throw new Error("Hotel not found.");

    const files = formData.getAll("files");

    const photos = await uploadToCloudinary(files);

    const blurDataPromise = photos.map((photo) =>
      dynamicBlurDataUrl(photo.secure_url)
    );

    const blurData = await Promise.all(blurDataPromise);

    const imageData = photos.map((photo, i) => ({
      url: photo.secure_url,
      public_id: photo.public_id,
      blurHash: blurData[i],
    }));

    await HotelModel.findByIdAndUpdate(id, {
      image: [...hotel.image, ...imageData],
    });

    revalidatePath(path);
    revalidatePath("/hotel");
  } catch (error: any) {
    throw new Error(`Failed to update hotel image: ${error.message}`);
  }
}

export async function deleteHotelImage({
  id,
  // eslint-disable-next-line camelcase
  public_id,
  path,
}: {
  id: string;
  public_id: string;
  path: string;
}) {
  try {
    connectDB();

    const hotel = await HotelModel.findById(id);
    if (!hotel) throw new Error("Hotel not found.");

    await Promise.all([
      HotelModel.findByIdAndUpdate(id, {
        // eslint-disable-next-line camelcase
        image: hotel.image.filter((img: any) => img.public_id !== public_id),
      }),
      destroyFromCloudinary(public_id),
    ]);

    revalidatePath(path);
    revalidatePath("/hotel");
  } catch (error: any) {
    throw new Error(`Failed to delete hotel image: ${error.message}`);
  }
}

export async function deleteHotel(id: string) {
  try {
    connectDB();

    const hotel = await HotelModel.findById(id);
    if (!hotel) throw new Error("This hotel does not exists.");

    hotel.image.map(
      async (img: any) => await destroyFromCloudinary(img.public_id)
    );

    await HotelModel.findByIdAndDelete(id);

    revalidatePath("/hotel");
  } catch (error: any) {
    throw new Error(`Failed to delete hotel: ${error.message}`);
  }
}
