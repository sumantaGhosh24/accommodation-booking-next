import Image from "next/image";
import Link from "next/link";

import {IHotel} from "@/models/hotelModel";

import {Badge} from "./ui/badge";

type CardProps = {
  hotel: IHotel;
};

const Card = ({hotel}: CardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-4 shadow-md dark:bg-black">
      <Link href={`/hotel/details/${hotel._id}`}>
        <Image
          src={hotel.image[0].url}
          alt="Card Image"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL={hotel.image[0].blurHash}
          priority
          className="mb-4 h-40 w-full rounded-md object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="mb-4 flex gap-2">
        <Badge>₹ {hotel.price}</Badge>
        <Badge className="line-clamp-1" variant="secondary">
          {hotel.category.name}
        </Badge>
      </div>
      <Link href={`/hotel/details/${hotel._id}`}>
        <p className="mb-2 text-xl font-bold capitalize">{hotel.title}</p>
        <p className="mb-2 text-base font-bold capitalize">
          {hotel.description}
        </p>
      </Link>
    </div>
  );
};

export default Card;
