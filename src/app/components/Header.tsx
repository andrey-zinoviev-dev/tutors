// "use client";
import { useState } from "react";
import OAuthPopup from "../login/Login";
import Link from "next/link";

export default function Header() {
  // const [ oauthPopupOpened, setOauthPopupOpened ] = useState(false);
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Header</h1>
      <Link href="/login">Login</Link>
    </header>
  );
}