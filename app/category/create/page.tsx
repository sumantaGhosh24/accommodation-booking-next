import CreateCategoryForm from "@/components/create-category-form";

export const metadata = {
  title: "Create Category",
};

const CreateCategory = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="container mx-auto space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
        <CreateCategoryForm />
      </div>
    </div>
  );
};

export default CreateCategory;
