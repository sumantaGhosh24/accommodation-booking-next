import {redirect} from "next/navigation";

import {getCategory} from "@/actions/categoryAction";
import UpdateCategoryForm from "@/components/update-category-form";

export const metadata = {
  title: "Update Category",
};

const UpdateCategory = async ({params}: {params: {id: string}}) => {
  const category = await getCategory(params.id);

  if (!category) redirect("/category");

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="container mx-auto my-10 space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
        <UpdateCategoryForm category={JSON.parse(JSON.stringify(category))} />
      </div>
    </div>
  );
};

export default UpdateCategory;
