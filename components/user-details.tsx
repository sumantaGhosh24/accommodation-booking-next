"use client";

import Image from "next/image";

import {IUser} from "@/models/userModel";

import {Badge} from "./ui/badge";

interface UserDetailsProps {
  user: IUser;
}

const UserDetails = ({user}: UserDetailsProps) => {
  return (
    <div className="my-10 rounded-md p-8 shadow-md dark:shadow-gray-400">
      <div className="flex flex-col items-center gap-4 pb-6">
        <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-neutral-200 dark:border-neutral-700">
          <Image
            src={user.image.url}
            alt={user.image.public_id}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold capitalize">{user.name}</h1>
          <p className="text-neutral-500">@{user.username}</p>
        </div>
        {user.role === "admin" && (
          <Badge className="px-3 py-1 text-sm">ADMIN</Badge>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProfileItem label="Email" value={user.email} />
        <ProfileItem label="Mobile" value={user.mobileNumber} />
        <ProfileItem
          label="DOB"
          value={new Date(user.dob).toLocaleDateString()}
        />
        <ProfileItem label="Gender" value={user.gender} />
        <ProfileItem label="City" value={user.city} />
        <ProfileItem label="State" value={user.state} />
        <ProfileItem label="Country" value={user.country} />
        <ProfileItem label="Zip Code" value={user.zip} />
        <ProfileItem label="Address" value={user.addressline} />
      </div>
      <div className="mt-8 flex items-center justify-between pt-4 text-sm text-neutral-500">
        <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

interface ProfileItemProps {
  label: string;
  value?: string | number;
}

const ProfileItem = ({label, value}: ProfileItemProps) => {
  return (
    <div className="rounded-lg border p-4 dark:border-neutral-800">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="font-medium capitalize">{value || "-"}</p>
    </div>
  );
};

export default UserDetails;
