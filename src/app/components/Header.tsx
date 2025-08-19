"use client";
import { useState } from "react";
import OAuthPopup from "./OAuthPopup";

export default function Header() {
  const [ oauthPopupOpened, setOauthPopupOpened ] = useState(false);
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Header</h1>
      <button onClick={() => setOauthPopupOpened(true)}>Login</button>
      {oauthPopupOpened && <OAuthPopup />}
    </header>
  );
}