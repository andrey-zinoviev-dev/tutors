// "use client";
import Link from "next/link";
import Image from "next/image";
// import { auth } from "@/auth";
// import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDecodeSessionQuery } from "@/lib/features/apiSlice";
import { deleteSession, getDecodedSession } from "@/lib/sessions/sessions";
import { redirect } from "next/navigation";

export default async function User() {
  const { user } = await getDecodedSession() as { user: {id: string, provider: string}};
  // console.log(user);
  // const user = useSelector((state: RootState) => state.user.user);
  // console.log(user);
  // if (!user) {
  //   return <div>Loading user data...</div>;
  // }
  // const { data: userData, isLoading } = useDecodeSessionQuery();
  // console.log(userData?.user);
  // if (isLoading) {
  //   return <div>Loading user data...</div>;
  // }
  
  return (
    <div>
      <Link href="/">Главная</Link>
      <span>User ID: {user?.id}</span>
      <span>User Provider: {user?.provider}</span>
      <div>
        {/* <span>У вас пройдено 10 уроков, {userData?.provider}</span> */}
      </div>

      <form action={async () => {
        'use server';
        await deleteSession();
        redirect("/");
      }}>
        <button type="submit">Выйти</button>
      </form>
    </div>
  );
}
