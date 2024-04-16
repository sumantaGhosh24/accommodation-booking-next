"use client";

import {useState} from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Beer,
  Coffee,
  Newspaper,
  Utensils,
  Dumbbell,
  UserCheck,
  AirVent,
  Wifi,
} from "lucide-react";

import {updateHotel} from "@/actions/hotelActions";
import {ICategory} from "@/models/categoryModel";
import {IHotel} from "@/models/hotelModel";
import {HotelValidation} from "@/validations/hotel";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {Input} from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import {Checkbox} from "./ui/checkbox";

interface UpdateHotelFormProps {
  hotel: IHotel;
  categories: ICategory[];
}

const UpdateHotelForm = ({hotel, categories}: UpdateHotelFormProps) => {
  const [amenities] = useState([
    {
      id: "wifi",
      label: "Wifi",
      icon: <Wifi />,
    },
    {
      id: "air-conditioning",
      label: "Air Conditioning",
      icon: <AirVent />,
    },
    {
      id: "self-check-in",
      label: "Self Check In",
      icon: <UserCheck />,
    },
    {
      id: "gym",
      label: "Gym",
      icon: <Dumbbell />,
    },
    {
      id: "free-breakfast",
      label: "Free Breakfast",
      icon: <Utensils />,
    },
    {
      id: "newspaper",
      label: "Newspaper",
      icon: <Newspaper />,
    },
    {
      id: "cafe",
      label: "Cafe",
      icon: <Coffee />,
    },
    {
      id: "bar",
      label: "Bar",
      icon: <Beer />,
    },
  ] as const);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const form = useForm<z.infer<typeof HotelValidation>>({
    resolver: zodResolver(HotelValidation),
    defaultValues: {
      title: hotel.title,
      description: hotel.description,
      content: hotel.content,
      category: hotel.category._id,
      price: hotel.price,
      discount: hotel.discount,
      specialNote: hotel.specialNote,
      dimension: hotel.dimension,
      numberOfBeds: hotel.numberOfBeds,
      offeredAmenities: hotel.offeredAmenities,
      country: hotel.country,
      state: hotel.state,
      city: hotel.city,
      zip: hotel.zip,
      address: hotel.address,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      isBooked: hotel.isBooked,
      isFeatured: hotel.isFeatured,
    },
  });

  const onSubmit = async (values: z.infer<typeof HotelValidation>) => {
    setLoading(true);
    try {
      await updateHotel({
        id: hotel._id,
        title: values.title,
        description: values.description,
        content: values.content,
        category: values.category,
        price: values.price,
        discount: values.discount,
        specialNote: values.specialNote,
        dimension: values.dimension,
        numberOfBeds: values.numberOfBeds,
        offeredAmenities: values.offeredAmenities,
        country: values.country,
        state: values.state,
        city: values.city,
        zip: values.zip,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
        isBooked: values.isBooked,
        isFeatured: values.isFeatured,
        path,
      });

      toast.success("Successfully update a hotel!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 flex min-h-screen w-full items-center justify-center">
      <div className="min-w-[80%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="mb-5 text-2xl font-bold">Update Hotel</h1>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="title"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hotel category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category._id}
                            value={category._id}
                            className=""
                          >
                            <Image
                              src={category.image.url}
                              alt={category.image.public_id}
                              height={50}
                              width={50}
                              className="mb-2 mr-4 inline-block h-5 w-5"
                            />
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Hotel Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your hotel description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialNote"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Hotel Special Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your hotel special note"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Hotel Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your hotel content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Discount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="dimension"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Dimension
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel dimension"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfBeds"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Number Of Beds
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel number of beds"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="offeredAmenities"
              render={() => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base font-semibold">
                    Offered Amenities
                  </FormLabel>
                  <div className="flex flex-wrap">
                    {amenities.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="offeredAmenities"
                        render={({field}) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex w-1/4 items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="flex items-center gap-2 font-normal">
                                {item.icon}
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="country"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Country
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel State
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel state"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="city"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel City
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel city"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Zip
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel zip"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="address"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Latitude
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel latitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({field}) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base font-semibold">
                      Hotel Longitude
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter hotel longitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="isBooked"
                render={({field}) => (
                  <FormItem className="flex w-full items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base font-semibold">
                      Is Booked
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({field}) => (
                  <FormItem className="flex w-full items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base font-semibold">
                      Is Featured
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="max-w-fit">
              {loading ? "Processing..." : "Update Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateHotelForm;
