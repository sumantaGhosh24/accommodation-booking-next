import {getServerSession} from "next-auth";

import {options} from "@/app/api/auth/[...nextauth]/route";

const getServerUser = async () => {
  const session = await getServerSession(options);
  return session?.user;
};

export default getServerUser;
