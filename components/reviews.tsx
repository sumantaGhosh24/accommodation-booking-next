"use client";

import Image from "next/image";
import Link from "next/link";

import {IReview} from "@/models/reviewModel";

import Pagination from "./Pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {buttonVariants} from "./ui/button";

type ReviewProps = {
  data: IReview[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  user: any;
};

const Reviews = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
  user,
}: ReviewProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <Table>
            <TableCaption>A list of your reviews.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((review) => (
                <TableRow key={review._id}>
                  <TableCell className="font-medium">{review._id}</TableCell>
                  <TableCell>
                    <Image
                      src={review.user.image.url}
                      alt={review.user.image.public_id}
                      height={50}
                      width={50}
                      className="h-12 rounded"
                    />
                    <span className="capitalize">{review.user.name}</span>
                    <br />
                    {user.role === "admin" && (
                      <Link
                        href={`/review/user/${review.user._id}`}
                        className={buttonVariants()}
                      >
                        User Review
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={review.hotel.image[0].url}
                      alt={review.hotel.image[0].public_id}
                      height={50}
                      width={50}
                      className="h-12 rounded"
                    />
                    <span className="capitalize">{review.hotel.title}</span>
                    <br />
                    {user.role === "admin" && (
                      <Link
                        href={`/review/hotel/${review.hotel._id}`}
                        className={buttonVariants()}
                      >
                        Hotel Review
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(review.updatedAt).toLocaleDateString()}
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

export default Reviews;
