import {z} from "zod";

export const HotelValidation = z
  .object({
    title: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Title is required"})
      .max(25, {message: "Title maximum 25 characters long"}),
    description: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Description is required"})
      .max(100, {message: "Description maximum 100 characters long"}),
    content: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Content is required"})
      .max(250, {message: "Content maximum 250 characters long"}),
    category: z.string().min(1, {message: "Category is required"}),
    price: z.string().min(1, {message: "Price is required"}),
    discount: z.string().min(1, {message: "Discount is required"}),
    specialNote: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Special note is required"}),
    dimension: z.string().min(1, {message: "Dimension is required"}).trim(),
    numberOfBeds: z.string().min(1, {message: "Number is required"}),
    offeredAmenities: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    country: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Country is required"}),
    state: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "State is required"}),
    city: z.string().trim().toLowerCase().min(1, {message: "City is required"}),
    zip: z.string().trim().toLowerCase().min(1, {message: "Zip is required"}),
    address: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Address is required"}),
    latitude: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Latitude is required"}),
    longitude: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, {message: "Longitude is required"}),
    isFeatured: z.boolean().default(false).optional(),
    isBooked: z.boolean().default(false).optional(),
  })
  .refine((data) => parseInt(data.discount) < parseInt(data.price), {
    message: "Discount must be less than price",
    path: ["discount"],
  });
