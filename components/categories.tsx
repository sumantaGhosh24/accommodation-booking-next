"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import {Pen} from "lucide-react";

import {ICategory} from "@/models/categoryModel";

import Pagination from "./Pagination";
import {Button} from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import DeleteCategory from "./delete-category";
import DialogProvider from "./dialog-provider";

type CategoryProps = {
  data: ICategory[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const Categories = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: CategoryProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    router.push(`/category/update/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of all categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((cat) => (
                <TableRow key={cat._id}>
                  <TableCell className="font-medium">{cat._id}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    <DialogProvider
                      trigger={
                        <Image
                          src={cat.image.url}
                          alt={cat.image.public_id}
                          height={50}
                          width={50}
                          className="h-12 animate-pulse cursor-pointer"
                        />
                      }
                      title="Category Image"
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={cat.image.url}
                          alt={cat.image.public_id}
                          height={250}
                          width={300}
                          className="h-[300px] w-full rounded"
                        />
                      </div>
                    </DialogProvider>
                  </TableCell>
                  <TableCell>
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(cat.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      onClick={() => handleUpdate(cat._id)}
                      className="mb-4 md:mr-4"
                    >
                      <Pen size={24} className="mr-2" />
                      Update
                    </Button>
                    <DeleteCategory
                      id={cat._id}
                      publicId={cat.image.public_id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[14px] bg-white py-28 text-center shadow shadow-black dark:bg-black dark:shadow-white">
          <h3 className="text-xl font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Categories;
