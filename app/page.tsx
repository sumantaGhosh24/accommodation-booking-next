import {getCategories} from "@/actions/categoryAction";
import {getHotels} from "@/actions/hotelActions";
import Filter from "@/components/filter";
import Hotels from "@/components/hotels";
import SearchBar from "@/components/search-bar";

export const metadata = {
  title: "Home | Accommodation Booking",
};

interface SearchParamProps {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
}

const Home = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const hotels = await getHotels({
    searchString: searchText,
    pageNumber: page,
    pageSize: 10,
    category,
  });

  const categories = await getCategories();

  return (
    <>
      <div className="my-5 p-8">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">All Hotels</h2>
          <p className="text-gray-600">Explore all hotels.</p>
        </div>
        <div className="mb-8 flex w-full flex-col gap-5 md:flex-row">
          <SearchBar placeholder="Search hotels" />
          <Filter categories={categories} />
        </div>
        <div>
          <Hotels
            data={hotels?.data}
            emptyTitle="No Hotels Found"
            emptyStateSubtext="Try again later"
            limit={6}
            page={page}
            totalPages={hotels?.totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
