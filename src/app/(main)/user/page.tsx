"use client";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function AccountPage() {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  if (!user) {
    return <div>Loading user data...</div>;
  }
  
  return (
    <div>
      <Link href="/">Главная</Link>
      <span>User ID: {user.id}</span>
      <div>
        <span>У вас пройдено 10 уроков, {user.email}</span>
      </div>
    </div>
  );
}
