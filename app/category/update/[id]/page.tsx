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
    <div className="my-20 flex min-h-screen w-full items-center justify-center">
      <div className="min-w-[60%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <UpdateCategoryForm category={category} />
      </div>
    </div>
  );
};

export default UpdateCategory;
