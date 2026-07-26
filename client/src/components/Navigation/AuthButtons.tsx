import { Link, useLocation } from "wouter";
import { LogIn, UserPlus, LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface AuthButtonsProps {
  getTranslation: (key: string, fallback: string) => string;
}

export default function AuthButtons({ getTranslation }: AuthButtonsProps) {
  const { user, isStaff, logout } = useAuth();
  const [, navigate] = useLocation();

  if (user) {
    const dashboardHref = user.role === "admin" ? "/dashboard/admin" : user.role === "employee" ? "/dashboard/employee" : null;

    const handleLogout = async () => {
      await logout();
      toast.success(getTranslation("nav_logout_success", "Logged out"));
      navigate("/");
    };

    return (
      <div className="hidden lg:flex items-center gap-2">
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
          <User className="w-4 h-4" />
          <span className="max-w-[120px] truncate">{user.name}</span>
        </div>
        {isStaff && dashboardHref && (
          <Link
            href={dashboardHref}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
          >
            <LayoutDashboard className="w-4 h-4" />
            {getTranslation("nav_dashboard", "Dashboard")}
          </Link>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          <LogOut className="w-4 h-4" />
          {getTranslation("nav_logout", "Logout")}
        </button>
      </div>
    );
  }

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
