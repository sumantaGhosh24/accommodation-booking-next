"use client";

import {useState} from "react";
import {Trash} from "lucide-react";
import {toast} from "react-hot-toast";

import {deleteHotel} from "@/actions/hotelActions";

import {Button} from "./ui/button";

const DeleteHotel = ({id}: {id: string}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteHotel(id);
      toast.success("Hotel deleted successful!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <Trash size={24} className="mr-2" />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteHotel;
