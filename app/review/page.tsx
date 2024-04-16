import getServerUser from "@/actions/getServerUser";
import {getAllReviews} from "@/actions/reviewActions";
import Reviews from "@/components/reviews";

export const metadata = {
  title: "Manage Reviews",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const ManageReviews = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const reviews = await getAllReviews({
    pageNumber: page,
    pageSize: 5,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage Reviews</h2>
        <p className="text-gray-600">Admin manage all reviews.</p>
      </div>
      <Reviews
        data={reviews?.data}
        emptyTitle="No reviews found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={reviews?.totalPages}
        user={user}
      />
    </div>
  );
};

export default ManageReviews;
