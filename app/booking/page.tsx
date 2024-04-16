import getServerUser from "@/actions/getServerUser";
import {getAllBookings} from "@/actions/bookingActions";
import Bookings from "@/components/bookings";

export const metadata = {
  title: "Manage Bookings",
};

interface SearchParamProps {
  searchParams: {[key: string]: string | string[] | undefined};
}

const ManageBookings = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const bookings = await getAllBookings({
    pageNumber: page,
    pageSize: 5,
  });

  const user = await getServerUser();

  return (
    <div className="mx-auto my-20 w-[95%] rounded p-8 shadow shadow-black dark:shadow-white">
      <div className="mb-8 text-left">
        <h2 className="mb-4 text-3xl font-bold">Manage Bookings</h2>
        <p className="text-gray-600">Admin manage all bookings.</p>
      </div>
      <Bookings
        data={bookings?.data}
        emptyTitle="No bookings found"
        emptyStateSubtext="Try again later"
        page={page}
        totalPages={bookings?.totalPages}
        user={user}
      />
    </div>
  );
};

export default ManageBookings;
