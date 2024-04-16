import {redirect} from "next/navigation";

import getServerUser from "@/actions/getServerUser";
import {getUserReviews} from "@/actions/reviewActions";
import Reviews from "@/components/reviews";

export const metadata = {
  title: "Manage My Reviews",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const MyReviews = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const user = await getServerUser();

  if (!user) redirect("/");

  const reviews = await getUserReviews({
    pageNumber: page,
    pageSize: 5,
    user: user._id,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage My Reviews</h2>
        <p className="text-gray-600">Admin manage my reviews.</p>
      </div>
      <Reviews
        data={reviews?.data}
        emptyTitle="No my reviews found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
        user={user}
      />
    </div>
  );
};

export default MyReviews;
