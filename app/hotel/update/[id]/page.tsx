import {redirect} from "next/navigation";

import {getHotel} from "@/actions/hotelActions";
import {getCategories} from "@/actions/categoryAction";
import UpdateHotelForm from "@/components/update-hotel-form";
import AddHotelImage from "@/components/add-hotel-image";
import RemoveHotelImage from "@/components/remove-hotel-image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export const metadata = {
  title: "Update Hotel",
};

const UpdateHotel = async ({params}: {params: {id: string}}) => {
  const hotel = await getHotel(params.id);

  if (!hotel) redirect("/hotel");

  const categories = await getCategories();

  return (
    <>
      <Tabs defaultValue="update-hotel" className="w-full">
        <TabsList className="mx-10 mt-10 grid grid-cols-3">
          <TabsTrigger value="update-hotel">Update Hotel</TabsTrigger>
          <TabsTrigger value="add-image">Add Hotel Image</TabsTrigger>
          <TabsTrigger value="remove-image">Remove Hotel Image</TabsTrigger>
        </TabsList>
        <TabsContent value="update-hotel">
          <UpdateHotelForm
            hotel={JSON.parse(JSON.stringify(hotel))}
            categories={JSON.parse(JSON.stringify(categories))}
          />
        </TabsContent>
        <TabsContent value="add-image">
          <AddHotelImage hotel={JSON.parse(JSON.stringify(hotel))} />
        </TabsContent>
        <TabsContent value="remove-image">
          <RemoveHotelImage hotel={JSON.parse(JSON.stringify(hotel))} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UpdateHotel;
