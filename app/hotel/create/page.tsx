import {getCategories} from "@/actions/categoryAction";
import CreateHotelForm from "@/components/create-hotel-form";

export const metadata = {
  title: "Create Hotel",
};

const CreateHotel = async () => {
  const categories = await getCategories();

  return (
    <div className="my-10 flex min-h-screen w-full items-center justify-center">
      <div className="container mx-auto space-y-4 rounded-md p-5 shadow-md dark:shadow-gray-400">
        <CreateHotelForm categories={categories} />
      </div>
    </div>
  );
};

export default CreateHotel;
