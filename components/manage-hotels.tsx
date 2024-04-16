"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {Pen} from "lucide-react";

import {IHotel} from "@/models/hotelModel";

import DeleteHotel from "./delete-hotel";
import Pagination from "./Pagination";
import {Button} from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {Badge} from "./ui/badge";
import DialogProvider from "./dialog-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type HotelProps = {
  data: IHotel[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const ManageHotels = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: HotelProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/hotel/update/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of your hotels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Special Note</TableHead>
                <TableHead>Dimension</TableHead>
                <TableHead>Beds</TableHead>
                <TableHead>Amenities</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>State</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Zip</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Is Booked</TableHead>
                <TableHead>Is Featured</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((hotel) => (
                <TableRow key={hotel._id}>
                  <TableCell className="font-medium">{hotel._id}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={<Button>View Owner</Button>}
                      title="Hotel Owner Details"
                    >
                      <Image
                        src={hotel.owner.image.url}
                        alt={hotel.owner.image.public_id}
                        height={50}
                        width={50}
                        className="h-[250px] w-full"
                      />
                      <h3 className="text-xl font-bold capitalize">
                        {hotel.owner.name}
                      </h3>
                      <h4>{hotel.owner.email}</h4>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>{hotel.title}</TableCell>
                  <TableCell>{hotel.description}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={hotel.image[0].url}
                          alt={hotel.image[0].public_id}
                          placeholder="blur"
                          blurDataURL={hotel.image[0].blurHash}
                          priority
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Hotel Images"
                    >
                      <Carousel>
                        <CarouselContent>
                          {hotel.image.map((img) => (
                            <CarouselItem key={img.public_id}>
                              <Image
                                src={img.url}
                                alt={img.public_id}
                                height={200}
                                width={100}
                                className="h-[250px] w-full"
                                placeholder="blur"
                                blurDataURL={img.blurHash}
                                priority
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={hotel.category.image.url}
                          alt={hotel.category.image.public_id}
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Category Details"
                    >
                      <Image
                        src={hotel.category.image.url}
                        alt={hotel.category.image.public_id}
                        height={250}
                        width={300}
                        className="h-[300px] w-full rounded"
                      />
                      <h3 className="text-xl font-bold capitalize">
                        {hotel.category.name}
                      </h3>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>{hotel.price}</TableCell>
                  <TableCell>{hotel.discount}</TableCell>
                  <TableCell>{hotel.specialNote}</TableCell>
                  <TableCell>{hotel.dimension}</TableCell>
                  <TableCell>{hotel.numberOfBeds}</TableCell>
                  <TableCell>{hotel.offeredAmenities.length}</TableCell>
                  <TableCell>{hotel.country}</TableCell>
                  <TableCell>{hotel.state}</TableCell>
                  <TableCell>{hotel.city}</TableCell>
                  <TableCell>{hotel.zip}</TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.latitude}</TableCell>
                  <TableCell>{hotel.longitude}</TableCell>
                  <TableCell>
                    <Badge variant={hotel.isBooked ? "success" : "warning"}>
                      {hotel.isBooked ? "Booked" : "Not Booked"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={hotel.isFeatured ? "success" : "danger"}>
                      {hotel.isFeatured ? "Featured" : "Not Featured"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(hotel.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(hotel.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      onClick={() => handleUpdate(hotel._id)}
                      className="mb-4 md:mr-4"
                    >
                      <Pen size={24} className="mr-2" />
                      Update
                    </Button>
                    <DeleteHotel id={hotel._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[14px] bg-white py-28 text-center shadow shadow-black dark:bg-black dark:shadow-white">
          <h3 className="text-xl font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default ManageHotels;
