"use client";

import Image from "next/image";

import {IUser} from "@/models/userModel";

import {Badge} from "./ui/badge";

interface UserDetailsProps {
  user: IUser;
}

const UserDetails = ({user}: UserDetailsProps) => {
  return (
    <div className="my-10 flex w-full items-center justify-center">
      <div className="w-[95%] space-y-4 rounded-lg p-5 shadow-lg shadow-black dark:shadow-white">
        <h1 className="mb-5 text-2xl font-bold">Your Details</h1>
        <div className="mb-5 md:mb-0">
          <h2 className="text-2xl font-bold capitalize">{user.name}</h2>
          <h3 className="mt-5 text-xl">{user.username}</h3>
        </div>
        <div className="mx-auto w-[65%]">
          <Image
            src={user.image.url}
            alt={user.image.public_id}
            height={200}
            width={100}
            className="h-[350px] w-full rounded"
          />
        </div>
        <h4 className="capitalize">Email: {user.email}</h4>
        <h4 className="capitalize">Mobile number: {user.mobileNumber}</h4>
        <h4 className="capitalize">
          DOB: {new Date(user.dob).toLocaleDateString()}
        </h4>
        <h4 className="capitalize">Gender: {user.gender}</h4>
        <h4 className="capitalize">City: {user.city}</h4>
        <h4 className="capitalize">State: {user.state}</h4>
        <h4 className="capitalize">Country: {user.country}</h4>
        <h4 className="capitalize">Zip: {user.zip}</h4>
        <h4 className="capitalize">Addressline: {user.addressline}</h4>
        <h4>Created at: {new Date(user.createdAt).toLocaleDateString()}</h4>
        <h4>Updated at: {new Date(user.updatedAt).toLocaleDateString()}</h4>
        {user.role === "admin" && <Badge>ADMIN</Badge>}
      </div>
    </div>
  );
};

export default UserDetails;
