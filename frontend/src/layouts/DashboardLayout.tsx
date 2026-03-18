import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/context/AuthContext";
import { Bell, Search, ChevronDown, LogOut, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function Layout() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [dropOpen, setDropOpen] = useState(false);
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className={`flex h-16 shrink-0 items-center gap-4 border-b px-6 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>

          {/* Search */}
          <div className={`flex flex-1 items-center gap-2 rounded-full border px-4 py-2 max-w-sm ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
            <Search className={`h-4 w-4 shrink-0 ${dark ? "text-gray-400" : "text-gray-400"}`} />
            <input
              type="text"
              placeholder="Try search..."
              className={`flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 ${dark ? "text-gray-200" : "text-gray-600"}`}
            />
          </div>

          <div className="flex-1" />

          {/* Dark / Light Toggle */}
          <button
            onClick={toggle}
            className={`relative flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${dark ? "bg-violet-600" : "bg-gray-200"}`}
          >
            <span className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform duration-300 ${dark ? "translate-x-7" : "translate-x-1"}`}>
              {dark
                ? <Moon className="h-3.5 w-3.5 text-violet-600" />
                : <Sun className="h-3.5 w-3.5 text-yellow-500" />
              }
            </span>
          </button>

          {/* Bell */}
          <button className={`relative flex h-9 w-9 items-center justify-center rounded-full transition ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <Bell className={`h-5 w-5 ${dark ? "text-gray-300" : "text-gray-500"}`} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                {initials}
              </div>
              <span className={`text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>{user?.email?.split("@")[0]}</span>
              <ChevronDown className={`h-4 w-4 ${dark ? "text-gray-400" : "text-gray-400"}`} />
            </button>

            {dropOpen && (
              <div className={`absolute right-0 top-12 z-50 w-44 rounded-xl border shadow-lg py-1 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className={`px-4 py-2 border-b ${dark ? "border-gray-700" : "border-gray-100"}`}>
                  <p className={`text-xs font-semibold truncate ${dark ? "text-gray-200" : "text-gray-800"}`}>{user?.email}</p>
                  <p className="text-xs text-gray-400">{user?.role}</p>
                </div>
                <button
                  onClick={() => { setDropOpen(false); logout(); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function DashboardLayout() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
