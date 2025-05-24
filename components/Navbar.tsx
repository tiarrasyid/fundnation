"use client";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Tambahkan ini

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getPathForItem = (item: string) => {
    switch (item) {
      case "Home":
        return "/";
      case "Projects":
        return "/product";
      case "About Us":
        return "/about_us";
      default:
        return "/";
    }
  };

  if (!isMounted) return null; // Tambahkan ini

  return (
    <nav className="flex justify-between items-center h-[100px] bg-[#222222] px-[50px] w-full">
      {/* Logo */}
      <div className="logo-text text-[25px] font-sen-bold text-[#ffffff]">
        FundNation
      </div>

      {/* Navigation Items */}
      <div className="flex gap-[51px]">
        {["Home", "Projects", "About Us"].map((item) => {
          const isActive = pathname === getPathForItem(item);
          return (
            <Link
              href={getPathForItem(item)}
              key={item}
              className={`text-[20px] font-sen-bold no-underline ${
                isActive ? "text-[#1dcd9f]" : "text-[#FFFFFF]"
              } hover:text-[#1dcd9f] transition-colors`}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-[27px]">
        <button
          onClick={() => router.push("/creators")}
          className="bg-[#169976] text-[#ffffff] text-[20px] font-sen-bold h-[50px] w-[166px] rounded-[15px] hover:bg-[#138a69] transition-colors"
        >
          For Creators
        </button>

        <SignedOut>
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-transparent border-none text-[#ffffff] text-[20px] font-sen-bold transition-colors"
          >
            Login
          </button>
        </SignedOut>

        <SignedIn>
          <div className="text-white">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
