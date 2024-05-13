"use client";

import Image from "next/image";
import {
  AirVent,
  Beer,
  Coffee,
  Dumbbell,
  Newspaper,
  UserCheck,
  Utensils,
  Wifi,
} from "lucide-react";

import {IHotel} from "@/models/hotelModel";

import {Badge} from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface HotelDetailsProps {
  hotel: IHotel;
}

const Amenities = (name: any) => {
  switch (name.name) {
    case "wifi":
      return (
        <Badge>
          <Wifi className="mr-3" /> Wifi
        </Badge>
      );

    case "air-conditioning":
      return (
        <Badge>
          <AirVent className="mr-3" /> Air Conditioning
        </Badge>
      );

    case "self-check-in":
      return (
        <Badge>
          <UserCheck className="mr-3" /> Self Check In
        </Badge>
      );

    case "gym":
      return (
        <Badge>
          <Dumbbell className="mr-3" /> Gym
        </Badge>
      );

    case "free-breakfast":
      return (
        <Badge>
          <Utensils className="mr-3" /> Free Breakfast
        </Badge>
      );

    case "newspaper":
      return (
        <Badge>
          <Newspaper className="mr-3" /> Newspaper
        </Badge>
      );

    case "cafe":
      return (
        <Badge>
          <Coffee className="mr-3" /> Cafe
        </Badge>
      );

    case "bar":
      return (
        <Badge>
          <Beer className="mr-3" /> Bar
        </Badge>
      );

    default:
      return (
        <Badge>
          <Wifi className="mr-3" /> Wifi
        </Badge>
      );
  }
};

const HotelDetail = ({hotel}: HotelDetailsProps) => {
  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="max-w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-5 md:mb-0">
            <h2 className="text-2xl font-bold capitalize">{hotel.title}</h2>
            <h3 className="mt-5 text-xl">{hotel.description}</h3>
          </div>
          <h4 className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary">
            <span className="text-xl font-bold">Price:</span>
            <span className="font-bold">
              {parseInt(hotel.price) - parseInt(hotel.discount)} / per night
            </span>
            <span className="text-lg line-through">{hotel.price}</span>
          </h4>
        </div>
        <div className="mx-auto w-[90%]">
          <Carousel>
            <CarouselContent>
              {hotel.image.map((img) => (
                <CarouselItem key={img.public_id}>
                  <Image
                    src={img.url}
                    alt={img.public_id}
                    height={200}
                    width={100}
                    className="h-[350px] w-full rounded"
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
        </div>
        <p className="text-base">{hotel.content}</p>
        <div className="flex gap-5">
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <Image
              src={hotel.owner.image.url}
              alt={hotel.owner.image.public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">Owner: </h4>
              <h4 className="mb-2 capitalize">{hotel.owner.name}</h4>
              <h5>{hotel.owner.email}</h5>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded border border-primary p-5">
            <Image
              src={hotel.category.image.url}
              alt={hotel.category.image.public_id}
              height={100}
              width={100}
              className="rounded"
            />
            <div>
              <h4 className="mb-2">Category: </h4>
              <h4>{hotel.category.name}</h4>
            </div>
          </div>
        </div>
        <h4 className="text-base capitalize">
          Special note: {hotel.specialNote}
        </h4>
        <h4>
          Dimension: <Badge>{hotel.dimension}</Badge>
        </h4>
        <h4>
          Number of beds: <Badge>{hotel.numberOfBeds}</Badge>
        </h4>
        <h4>Amenities: </h4>
        <div className="flex gap-2">
          {hotel.offeredAmenities.map((data, i) => (
            <Amenities name={data} key={i} />
          ))}
        </div>
        <h4 className="capitalize">Country: {hotel.country}</h4>
        <h4 className="capitalize">State: {hotel.state}</h4>
        <h4 className="capitalize">City: {hotel.city}</h4>
        <h4>Zip: {hotel.zip}</h4>
        <h4 className="capitalize">Address: {hotel.address}</h4>
        <h4>Latitude: {hotel.latitude}</h4>
        <h4>Longitude: {hotel.longitude}</h4>
        <h4>
          Is booked:{" "}
          <Badge variant={hotel.isBooked ? "success" : "warning"}>
            {hotel.isBooked ? "Booked" : "Not Booked"}
          </Badge>
        </h4>
        <h4>
          Is featured:{" "}
          <Badge variant={hotel.isFeatured ? "success" : "warning"}>
            {hotel.isFeatured ? "Featured" : "Not Featured"}
          </Badge>
        </h4>
        <h4>Created at: {new Date(hotel.createdAt).toLocaleDateString()}</h4>
        <h4>Updated at: {new Date(hotel.updatedAt).toLocaleDateString()}</h4>
      </div>
    </div>
  );
};

export default HotelDetail;
