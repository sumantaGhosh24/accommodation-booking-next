import Link from "next/link";

import {getHotels} from "@/actions/hotelActions";
import ManageHotels from "@/components/manage-hotels";
import SearchBar from "@/components/search-bar";
import {buttonVariants} from "@/components/ui/button";

export const metadata = {
  title: "Manage Hotels",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const ManageHotel = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";

  const hotels = await getHotels({
    searchString: searchText,
    pageNumber: page,
    pageSize: 5,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="flex justify-between">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">Manage Hotels</h2>
          <p className="text-gray-600">Admin manage all hotels.</p>
        </div>
        <Link href="/hotel/create" className={buttonVariants()}>
          Create Hotel
        </Link>
      </div>
      <div className="mb-8">
        <SearchBar placeholder="Search hotels" />
      </div>
      <ManageHotels
        data={hotels?.data}
        emptyTitle="No hotel found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={hotels?.totalPages}
      />
    </div>
  );
};

export default ManageHotel;
