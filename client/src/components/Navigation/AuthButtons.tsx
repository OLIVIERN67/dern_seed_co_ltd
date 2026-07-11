import { Link } from "wouter";
import { LogIn, UserPlus } from "lucide-react";

interface AuthButtonsProps {
  getTranslation: (key: string, fallback: string) => string;
}

export default function AuthButtons({ getTranslation }: AuthButtonsProps) {
  return (
    <div className="hidden lg:flex items-center gap-2">
      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
      <Link
        href="/login"
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
      >
        <LogIn className="w-4 h-4" />
        {getTranslation("nav_login", "Login")}
      </Link>
      <Link
        href="/signup"
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5"
      >
        <UserPlus className="w-4 h-4" />
        {getTranslation("nav_signup", "Sign Up")}
      </Link>
    </div>
  );
}