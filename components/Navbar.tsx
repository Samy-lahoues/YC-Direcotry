import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";

const Navbar = async () => {
  const session = await auth();
  console.log("User ID with '_'", session?.id);
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30}></Image>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <LogoutButton />
              <Link href={`/user/${session.id}`}>
                <span>{session.user.name}</span>
              </Link>
              <Link href="/"></Link>
            </>
          ) : (
            <>
              <LoginButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
