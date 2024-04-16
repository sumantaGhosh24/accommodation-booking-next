import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getHotelReviews} from "@/actions/reviewActions";
import Reviews from "@/components/reviews";

export const metadata = {
  title: "Manage Hotel Reviews",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
  params: {id: string};
}

const HotelReviews = async ({searchParams, params}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  if (!params.id) redirect("/review");

  const reviews = await getHotelReviews({
    pageNumber: page,
    pageSize: 5,
    hotel: params.id,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage Hotel Reviews</h2>
        <p className="text-gray-600">Admin manage hotel reviews.</p>
      </div>
      <Reviews
        data={reviews?.data}
        emptyTitle="No hotel reviews found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
        user={user}
      />
    </div>
  );
};

export default HotelReviews;
