import { InputHTMLAttributes } from "react";
import styles from './page.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function Input({ ...props }: InputProps) {
  return (
    <input {...props} className={styles.input} />
  );
}