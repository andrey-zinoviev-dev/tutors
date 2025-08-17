"use client";

import { useState } from "react";

export default function TutorsSearch() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(evt) => {
          setSearch(evt.target.value);
        }}
        placeholder="Какое направление интересует?"
      />
      <button type="submit">Найти</button>
    </form>
  );
}