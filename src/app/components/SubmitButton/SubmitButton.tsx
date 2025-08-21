import styles from './SubmitButton.module.css';

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function SubmitButton({ children, ...props }: SubmitButtonProps) {
  return (
    <button {...props} className={styles.submitButton}>
      {children}
    </button>
  );
}