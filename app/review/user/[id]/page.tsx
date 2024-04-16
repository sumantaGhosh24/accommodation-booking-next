import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getUserReviews} from "@/actions/reviewActions";
import Reviews from "@/components/reviews";

export const metadata = {
  title: "Manage User Reviews",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
  params: {id: string};
}

const UserReviews = async ({searchParams, params}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  if (!params.id) redirect("/review");

  const reviews = await getUserReviews({
    pageNumber: page,
    pageSize: 5,
    user: params.id,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage User Reviews</h2>
        <p className="text-gray-600">Admin manage user reviews.</p>
      </div>
      <Reviews
        data={reviews?.data}
        emptyTitle="No user reviews found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
        user={user}
      />
    </div>
  );
};

export default UserReviews;
