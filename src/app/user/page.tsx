import Link from "next/link";
import Image from "next/image";

export default function AccountPage() {
  return (
    <div>
      <Link href="/">Главная</Link>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        alt="Account"
        width={100}
        height={100}
      />
      <span>Name</span>
      <div>
        <span>У вас пройдено 10 уроков</span>
      </div>
    </div>
  );
}