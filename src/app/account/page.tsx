import Link from "next/link";

export default function AccountPage() {
  return (
    <div>
      <Link href="/">Главная</Link>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        alt="Account"
      />
      <span>Name</span>
      <div>
        <span>У вас пройдено 10 уроков</span>
      </div>
    </div>
  );
}