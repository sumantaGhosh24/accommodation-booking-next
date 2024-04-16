"use server";

import {SortOrder} from "mongoose";

import connectDB from "@/libs/db";
import BookingModel from "@/models/bookingModel";
import HotelModel from "@/models/hotelModel";
import UserModel from "@/models/userModel";

interface FetchBookingsParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

interface FetchHotelBookingsParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  hotel: string;
}

interface FetchUserBookingsParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
  user: string;
}

const populateBooking = (query: any) => {
  return query
    .populate({
      path: "hotel",
      model: HotelModel,
      select: "_id title image",
    })
    .populate({
      path: "user",
      model: UserModel,
      select: "_id name username image",
    });
};

export async function getBooking(id: string) {
  try {
    connectDB();

    const booking = await BookingModel.findById(id)
      .populate({
        path: "hotel",
        model: HotelModel,
        select: "_id title image",
      })
      .populate({
        path: "user",
        model: UserModel,
        select: "_id name username image",
      });
    return JSON.parse(JSON.stringify(booking));
  } catch (error: any) {
    throw new Error(`Failed to get booking data: ${error.message}`);
  }
}

export async function getAllBookings({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchBookingsParams) {
  try {
    connectDB();

    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const bookingsQuery = BookingModel.find({})
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const bookings = await populateBooking(bookingsQuery);
    const bookingsCount = await BookingModel.countDocuments({});
    return {
      data: JSON.parse(JSON.stringify(bookings)),
      totalPages: Math.ceil(bookingsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get all bookings data: ${error.message}`);
  }
}

export async function getHotelBookings({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  hotel,
}: FetchHotelBookingsParams) {
  try {
    connectDB();

    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const bookingsQuery = BookingModel.find({hotel})
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const bookings = await populateBooking(bookingsQuery);
    const bookingsCount = await BookingModel.countDocuments({});
    return {
      data: JSON.parse(JSON.stringify(bookings)),
      totalPages: Math.ceil(bookingsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get hotel bookings data: ${error.message}`);
  }
}

export async function getUserBookings({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  user,
}: FetchUserBookingsParams) {
  try {
    connectDB();

    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const bookingsQuery = BookingModel.find({user})
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const bookings = await populateBooking(bookingsQuery);
    const bookingsCount = await BookingModel.countDocuments({});
    return {
      data: JSON.parse(JSON.stringify(bookings)),
      totalPages: Math.ceil(bookingsCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get user bookings data: ${error.message}`);
  }
}
