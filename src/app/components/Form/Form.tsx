import styles from './page.module.css';

type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
};

export default function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}