import Link from "next/link";

import {getAllCategories} from "@/actions/categoryAction";
import Categories from "@/components/categories";
import SearchBar from "@/components/search-bar";
import {buttonVariants} from "@/components/ui/button";

export const metadata = {
  title: "Manage Hotel",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const ManageCategories = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";

  const categories = await getAllCategories({
    searchString: searchText,
    pageNumber: page,
    pageSize: 5,
  });

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="flex justify-between">
        <div className="mb-8 text-left">
          <h2 className="mb-4 text-3xl font-bold">Manage Categories</h2>
          <p className="text-gray-600">Admin manage all categories.</p>
        </div>
        <Link href="/category/create" className={buttonVariants()}>
          Create Category
        </Link>
      </div>
      <div className="mb-8">
        <SearchBar placeholder="Search categories" />
      </div>
      <Categories
        data={categories?.data}
        emptyTitle="No category found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={categories?.totalPages}
      />
    </div>
  );
};

export default ManageCategories;
