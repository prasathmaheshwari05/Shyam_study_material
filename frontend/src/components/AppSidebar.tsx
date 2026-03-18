import {
  LayoutDashboard,
  BookOpen,
  Building2,
  BookMarked,
  ListChecks,
  Award,
  CalendarCheck,
  User,
  ShoppingCart,
  FileText,
  LogOut,
  UserPlus,
  HelpCircle,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const adminMenu = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add User", url: "/admin/add-user", icon: UserPlus },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Department", url: "/departments", icon: Building2 },
];

const teacherMenu = [
  { title: "My Courses", url: "/my-courses", icon: BookMarked },
  { title: "Roster", url: "/roster", icon: ListChecks },
  { title: "Grades", url: "/grades", icon: Award },
  { title: "Attendance", url: "/attendance", icon: CalendarCheck },
];

const studentMenu = [
  { title: "Dashboard", url: "/student-dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/my-profile", icon: User },
  { title: "Available Courses", url: "/available-courses", icon: ShoppingCart },
  { title: "My Enrollments", url: "/my-enrollments", icon: FileText },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { dark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const menu =
    user?.role?.toUpperCase() === "ADMIN"
      ? adminMenu
      : user?.role?.toUpperCase() === "TEACHER"
      ? teacherMenu
      : studentMenu;

  return (
    <div className={`flex h-screen w-56 shrink-0 flex-col border-r transition-colors duration-300 ${dark ? "bg-gray-900 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
      {/* Logo */}
      <div className="px-6 py-5">
        <span className="text-xl font-extrabold text-violet-500 tracking-tight">
          UniManage
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {menu.map((item) => {
          const active = location.pathname === item.url;
          return (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                ${active
                  ? dark ? "bg-gray-700 text-violet-400 shadow-sm" : "bg-white text-violet-700 shadow-sm"
                  : dark ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200" : "text-gray-500 hover:bg-gray-300 hover:text-gray-800"
                }`}
            >
              <item.icon
                className={`h-4 w-4 shrink-0 ${active ? "text-violet-500" : dark ? "text-gray-500" : "text-gray-400"}`}
              />
              {item.title}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={`border-t px-3 py-3 space-y-1 ${dark ? "border-gray-700" : "border-gray-300"}`}>
        <button className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${dark ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200" : "text-gray-500 hover:bg-gray-300 hover:text-gray-800"}`}>
          <HelpCircle className="h-4 w-4 text-gray-400" />
          Help Center
        </button>
        <button className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${dark ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200" : "text-gray-500 hover:bg-gray-300 hover:text-gray-800"}`}>
          <Settings className="h-4 w-4 text-gray-400" />
          Settings
        </button>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
