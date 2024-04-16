import {redirect} from "next/navigation";

import {getHotel} from "@/actions/hotelActions";
import {getHotelReviews} from "@/actions/reviewActions";
import AddReview from "@/components/add-review";
import AllReviews from "@/components/all-reviews";
import HotelDetail from "@/components/hotel-details";
import BookHotelForm from "@/components/book-hotel-form";
import getServerUser from "@/actions/getServerUser";

export const metadata = {
  title: "Hotel Details",
};

interface HotelDetailsProps {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
}

const HotelDetails = async ({params, searchParams}: HotelDetailsProps) => {
  const hotel = await getHotel(params.id);
  if (!hotel) redirect("/");

  const user = await getServerUser();

  const page = Number(searchParams?.page) || 1;

  const reviews = await getHotelReviews({
    pageNumber: page,
    pageSize: 5,
    hotel: hotel._id,
  });

  return (
    <>
      <HotelDetail hotel={hotel} />
      <BookHotelForm hotel={hotel} user={user} />
      <AddReview hotel={hotel} user={user} />
      <AllReviews
        data={reviews?.data}
        emptyTitle="No review found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
      />
    </>
  );
};

export default HotelDetails;
