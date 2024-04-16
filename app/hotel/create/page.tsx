import {getCategories} from "@/actions/categoryAction";
import CreateHotelForm from "@/components/create-hotel-form";

export const metadata = {
  title: "Create Hotel",
};

const CreateHotel = async () => {
  const categories = await getCategories();

  return (
    <div className="my-20 flex min-h-screen w-full items-center justify-center">
      <div className="max-w-[80%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <CreateHotelForm categories={categories} />
      </div>
    </div>
  );
};

export default CreateHotel;
