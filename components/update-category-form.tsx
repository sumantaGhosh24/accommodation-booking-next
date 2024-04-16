"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {validFiles} from "@/libs/utils";
import {updateCategory} from "@/actions/categoryAction";
import {ICategory} from "@/models/categoryModel";
import {CategoryValidation} from "@/validations/category";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

interface Props {
  category: ICategory;
}

interface File {
  status: string;
  imgUrl: string;
  message?: string;
  fileUpload: undefined;
}

const UpdateCategoryForm = ({category}: Props) => {
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof CategoryValidation>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("files", file.fileUpload!);
        URL.revokeObjectURL(file.imgUrl);
      }

      if (file) {
        await updateCategory({
          id: category._id,
          name: values.name,
          formData,
          public_id: category.image.public_id,
          path: pathname,
        });
      } else {
        await updateCategory({
          id: category._id,
          name: values.name,
          path: pathname,
        });
      }

      toast.success("Successfully update a category!");
      setFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (files: any) => {
    if (!files.length) return;
    // eslint-disable-next-line array-callback-return
    [...files].map((file) => {
      const result = validFiles(file);
      if (result?.message) return toast("something went wrong");
      setFile(result as any);
    });
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer;
    handleImageChange(data.files);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl font-bold">Update Category</h1>
        {category.image && (
          <Image
            src={category.image.url}
            alt={category.image.public_id}
            height={200}
            width={500}
            className="mb-5 w-full"
          />
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center rounded-full bg-black">
            <Image
              src={file?.imgUrl || "https://placehold.co/600x400.png"}
              alt="image"
              width={150}
              height={150}
              sizes="50vw"
              priority
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-base font-semibold text-gray-200">
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              placeholder="Add your image"
              className="file:text-primary cursor-pointer border-none bg-transparent text-black outline-none dark:text-white"
              hidden
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base font-semibold">
                Category Name
              </FormLabel>
              <FormControl>
                <Input
                  type="name"
                  className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  placeholder="Enter category name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="max-w-fit">
          {loading ? "Processing..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCategoryForm;
