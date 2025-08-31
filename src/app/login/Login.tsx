"use client";
import { useState, useRef } from "react";
import styles from "./page.module.css";
// import Input from "../../components/Input/Input";
// import Form from "../../components/Form/Form";
// import SubmitButton from "../../components/SubmitButton/SubmitButton";
// import { signIn } from "@/auth";
import VKIDWrapper from "@/app/components/VKIDWrapper";
import YandexIDWrapper from "@/app/components/YandexIDWrapper";

export default function OAuthPopup() {
  return (
    <div className={styles.oauthPopup}>
      <h2>Войти в аккаунт</h2>

      <YandexIDWrapper />
      <VKIDWrapper />

    </div>
  );
}
