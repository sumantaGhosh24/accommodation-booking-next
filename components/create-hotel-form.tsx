"use client";

import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  X,
  Beer,
  Coffee,
  Newspaper,
  Utensils,
  Dumbbell,
  UserCheck,
  AirVent,
  Wifi,
} from "lucide-react";

import {createHotel} from "@/actions/hotelActions";
import {validFiles} from "@/libs/utils";
import {ICategory} from "@/models/categoryModel";
import {HotelValidation} from "@/validations/hotel";

import {Checkbox} from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Card, CardContent} from "./ui/card";

interface CreateHotelFormProps {
  categories: ICategory[];
}

interface File {
  status: string;
  imgUrl: string;
  message?: string;
  fileUpload: any;
}

const CreateHotelForm = ({categories}: CreateHotelFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
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

  const form = useForm<z.infer<typeof HotelValidation>>({
    resolver: zodResolver(HotelValidation),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      price: "",
      discount: "",
      specialNote: "",
      dimension: "",
      numberOfBeds: "",
      offeredAmenities: ["wifi"],
      country: "",
      state: "",
      city: "",
      zip: "",
      address: "",
      latitude: "",
      longitude: "",
      isBooked: false,
      isFeatured: false,
    },
  });

  const count = useMemo(() => {
    return files.filter((file) => file?.status === "success").length;
  }, [files]);

  const onSubmit = async (values: z.infer<typeof HotelValidation>) => {
    setLoading(true);
    try {
      const filesUpload = files.filter((file) => file?.status === "success");
      const formData = new FormData();
      filesUpload.forEach((file) => {
        formData.append("files", file.fileUpload);
      });
      files.map((file) => URL.revokeObjectURL(file.imgUrl));

      await createHotel({
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
        formData,
      });

      toast.success("Successfully create a hotel!");
      router.push("/hotel");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (files: any) => {
    if (!files.length) return;
    // eslint-disable-next-line array-callback-return
    [...files].map((file) => {
      const result = validFiles(file);
      setFiles((prev) => [...prev, result] as any);
    });
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer;
    handleImageChange(data.files);
  };

  const handleRemovedFile = (id: any) => {
    setFiles((files) => files.filter((_, i) => i !== id));
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
        onDrop={handleDrop}
        onDrag={(e) => e.preventDefault()}
      >
        <h1 className="mb-5 text-2xl font-bold">Create Hotel</h1>
        <div
          className="mb-5 mt-9 flex w-full items-center justify-center rounded border-4 border-dashed border-primary p-8 text-center"
          onDrop={handleDrop}
          onDrag={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="upload"
            accept=".png, .jpg, .jpeg"
            multiple
            hidden
            onChange={(e) => handleImageChange(e.target.files)}
          />
          <label
            htmlFor="upload"
            className="flex max-w-lg cursor-pointer flex-col items-center justify-center"
          >
            <Image
              src="https://placehold.co/600x400.png"
              alt="add"
              width={250}
              height={60}
              sizes="25vw"
              style={{width: 256, height: 116}}
            />
            <h5 className="mx-0 my-2.5 text-2xl font-semibold">
              Drag & drop up to 5 images or
              <span className="mx-1.5 text-blue-700">browse</span> to choose a
              file
            </h5>
            <small className="text-sm text-gray-700">
              JPEG, PNG only - Max 1MB
            </small>
          </label>
        </div>
        <span>Image {count}</span>
        <div className="mb-5 flex flex-wrap items-start gap-3">
          {files.map((file, i) => (
            <Card
              className={`relative mx-auto mb-5 !max-h-fit ${
                file?.status === "error" &&
                "bg-destructive text-destructive-foreground"
              }`}
              key={i}
            >
              <CardContent className="p-0">
                <Image
                  src={file?.imgUrl}
                  alt="file"
                  width={200}
                  height={200}
                  className="h-[200px] w-[250px] rounded object-cover"
                />
                {file?.message && (
                  <div className="mx-auto mb-4 w-[220px]">
                    <h4 className="my-3 text-xl font-bold capitalize">
                      {file?.status}
                    </h4>
                    <span className="text-sm">{file?.message}</span>
                  </div>
                )}
                <X
                  className="absolute right-1 top-1 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-gray-200 p-1 text-red-700 transition-all hover:bg-red-700 hover:text-gray-200"
                  onClick={() => handleRemovedFile(i)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
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
                <Textarea placeholder="Enter your hotel content" {...field} />
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
                                  ? field.onChange([...field.value, item.id])
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
          {loading ? "Processing..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateHotelForm;
