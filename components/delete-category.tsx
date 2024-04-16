"use client";

import {useState} from "react";
import {Trash} from "lucide-react";
import {toast} from "react-hot-toast";

import {deleteCategory} from "@/actions/categoryAction";

import {Button} from "./ui/button";

const DeleteCategory = ({id, publicId}: {id: string; publicId: string}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory(id, publicId);
      toast.success("Category deleted successful!");
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

export default DeleteCategory;
