"use client";

import Image from "next/image";
import {
  AirVent,
  BedDouble,
  Beer,
  Coffee,
  Dumbbell,
  Expand,
  MapPin,
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

const Amenities = ({name}: {name: string}) => {
  const base = "flex items-center gap-2 px-3 py-2";

  switch (name) {
    case "wifi":
      return (
        <Badge className={base}>
          <Wifi size={16} /> Wifi
        </Badge>
      );

    case "air-conditioning":
      return (
        <Badge className={base}>
          <AirVent size={16} /> Air Conditioning
        </Badge>
      );

    case "self-check-in":
      return (
        <Badge className={base}>
          <UserCheck size={16} /> Self Check In
        </Badge>
      );

    case "gym":
      return (
        <Badge className={base}>
          <Dumbbell size={16} /> Gym
        </Badge>
      );

    case "free-breakfast":
      return (
        <Badge className={base}>
          <Utensils size={16} /> Free Breakfast
        </Badge>
      );

    case "newspaper":
      return (
        <Badge className={base}>
          <Newspaper size={16} /> Newspaper
        </Badge>
      );

    case "cafe":
      return (
        <Badge className={base}>
          <Coffee size={16} /> Cafe
        </Badge>
      );

    case "bar":
      return (
        <Badge className={base}>
          <Beer size={16} /> Bar
        </Badge>
      );

    default:
      return null;
  }
};

const HotelDetail = ({hotel}: HotelDetailsProps) => {
  const finalPrice = parseInt(hotel.price) - parseInt(hotel.discount);

  return (
    <div className="container mx-auto my-10 space-y-8 rounded-md py-10 shadow-md dark:shadow-gray-400">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold capitalize">{hotel.title}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {hotel.description}
          </p>
        </div>
        <div className="rounded-xl border p-6 text-center shadow-md">
          <p className="text-sm text-muted-foreground">Price per night</p>
          <p className="text-3xl font-bold text-primary">₹{finalPrice}</p>
          <p className="text-sm text-muted-foreground line-through">
            ₹{hotel.price}
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl">
        <Carousel>
          <CarouselContent>
            {hotel.image.map((img) => (
              <CarouselItem key={img.public_id}>
                <Image
                  src={img.url}
                  alt={img.public_id}
                  height={600}
                  width={1200}
                  className="h-[420px] w-full object-cover"
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
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">About this place</h2>
            <p className="text-muted-foreground">{hotel.content}</p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-semibold">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {hotel.offeredAmenities.map((data, i) => (
                <Amenities name={data} key={i} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Expand size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Dimension</p>
                <p className="font-medium">{hotel.dimension}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <BedDouble size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Beds</p>
                <p className="font-medium">{hotel.numberOfBeds}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <MapPin size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{hotel.city}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Address</h2>
            <p className="text-muted-foreground">
              {hotel.address}, {hotel.city}, {hotel.state}, {hotel.country} -{" "}
              {hotel.zip}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-xl border p-5">
            <Image
              src={hotel.owner.image.url}
              alt={hotel.owner.image.public_id}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-muted-foreground">Hosted by</p>
              <p className="font-semibold capitalize">{hotel.owner.name}</p>
              <p className="text-sm">{hotel.owner.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border p-5">
            <Image
              src={hotel.category.image.url}
              alt={hotel.category.image.public_id}
              width={60}
              height={60}
              className="rounded"
            />
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-semibold">{hotel.category.name}</p>
            </div>
          </div>
          <div className="space-y-2 rounded-xl border p-5">
            <div className="flex justify-between">
              <span>Booking Status</span>
              <Badge variant={hotel.isBooked ? "success" : "warning"}>
                {hotel.isBooked ? "Booked" : "Available"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Featured</span>
              <Badge variant={hotel.isFeatured ? "success" : "secondary"}>
                {hotel.isFeatured ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <p>Created: {new Date(hotel.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(hotel.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default HotelDetail;
