"use server";

import {revalidatePath} from "next/cache";
import {SortOrder} from "mongoose";

import connectDB from "@/libs/db";
import {destroyFromCloudinary, uploadToCloudinary} from "@/libs/cloudinary";
import CategoryModel from "@/models/categoryModel";
import HotelModel from "@/models/hotelModel";

interface CreateCategoryParams {
  name: string;
  formData: any;
  path: string;
}

interface UpdateCategoryParams {
  id: string;
  name: string;
  formData?: any;
  public_id?: string;
  path: string;
}

interface FetchCategoryParams {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export async function getAllCategories({
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
  searchString = "",
}: FetchCategoryParams) {
  try {
    connectDB();

    const nameCondition = searchString
      ? {name: {$regex: searchString, $options: "i"}}
      : {};
    const skipAmount = (Number(pageNumber) - 1) * pageSize;
    const categoriesQuery = await CategoryModel.find(nameCondition)
      .sort({createdAt: sortBy})
      .skip(skipAmount)
      .limit(pageSize);
    const categoriesCount = await CategoryModel.countDocuments(nameCondition);
    return {
      data: JSON.parse(JSON.stringify(categoriesQuery)),
      totalPages: Math.ceil(categoriesCount / pageSize),
    };
  } catch (error: any) {
    throw new Error(`Failed to get all categories data: ${error.message}`);
  }
}

export async function getCategory(id: string) {
  try {
    connectDB();

    const category = await CategoryModel.findById(id);

    return category;
  } catch (error: any) {
    throw new Error(`Failed to get category data: ${error.message}`);
  }
}

export async function getCategories() {
  try {
    connectDB();

    const categories = await CategoryModel.find({});

    return JSON.parse(JSON.stringify(categories));
  } catch (error: any) {
    throw new Error(`Failed to get categories data: ${error.message}`);
  }
}

export async function createCategory({
  name,
  formData,
  path,
}: CreateCategoryParams) {
  try {
    connectDB();

    const category = await CategoryModel.findOne({name});
    if (category) throw new Error("This category already created.");

    const files = formData.getAll("files");

    const [res] = await uploadToCloudinary(files);

    const newCategory = new CategoryModel({
      name: name.toLowerCase(),
      image: {
        url: res?.secure_url,
        public_id: res?.public_id,
      },
    });

    await newCategory.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
}

export async function updateCategory({
  id,
  name,
  formData,
  // eslint-disable-next-line camelcase
  public_id,
  path,
}: UpdateCategoryParams) {
  try {
    connectDB();

    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("Category not found.");

    if (!formData) {
      await CategoryModel.findByIdAndUpdate(id, {
        name: name.toLowerCase(),
      });
    } else {
      const files = formData.getAll("files");

      // eslint-disable-next-line camelcase
      if (!public_id) throw new Error("Image id not found!");

      const [res] = await uploadToCloudinary(files);
      await Promise.all([
        CategoryModel.findByIdAndUpdate(id, {
          name: name.toLowerCase(),
          image: {
            url: res?.secure_url,
            public_id: res?.public_id,
          },
        }),
        destroyFromCloudinary(public_id),
      ]);
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
}

export async function deleteCategory(id: string, publicId: string) {
  try {
    connectDB();

    const hotels = await HotelModel.findOne({category: id});
    if (hotels)
      throw new Error("Please delete all hotel of this category first.");

    await Promise.all([
      CategoryModel.findByIdAndDelete(id),
      destroyFromCloudinary(publicId),
    ]);

    revalidatePath("/category");
  } catch (error: any) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}
