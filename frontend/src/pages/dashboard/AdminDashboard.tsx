import { UserPlus, BookOpen, Building2, Users, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { label: "Add User", value: "", icon: UserPlus, iconBg: "bg-blue-100", iconColor: "text-blue-600", link: "/admin/add-user" },
  { label: "Courses", value: "", icon: BookOpen, iconBg: "bg-green-100", iconColor: "text-green-600", link: "/courses" },
  { label: "Department", value: "", icon: Building2, iconBg: "bg-orange-100", iconColor: "text-orange-500", link: "/departments" },
];

const recentUsers = [
  { name: "Prasath", email: "prasath@gmail.com", role: "Student", status: "Active" },
  { name: "Shyam", email: "shyam@gmail.com", role: "Student", status: "Active" },
  { name: "Balaprakash", email: "balaprakash@gmail.com", role: "Student", status: "Active" },
  { name: "Kumark", email: "kumark@gmail.com", role: "Student", status: "Active" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 p-6 min-h-full bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.email} 👋</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <button
              key={s.label}
              onClick={() => navigate(s.link)}
              className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}>
                <s.icon className={`h-6 w-6 ${s.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">Manage</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* Recent Users Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-800">Recent Users</h2>
            <button
              onClick={() => navigate("/admin/students")}
              className="text-sm font-medium text-violet-600 hover:underline"
            >
              View All
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="py-3 text-gray-500">{u.email}</td>
                  <td className="py-3 text-gray-500">{u.role}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 shrink-0 space-y-6">

        {/* Summary Card */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">Quick Summary</h2>
          <div className="space-y-4">
            {[
              { label: "Total Students", icon: GraduationCap, color: "bg-violet-100 text-violet-600" },
              { label: "Total Teachers", icon: Users, color: "bg-blue-100 text-blue-600" },
              { label: "Total Courses", icon: BookOpen, color: "bg-green-100 text-green-600" },
              { label: "Departments", icon: Building2, color: "bg-orange-100 text-orange-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-sm">
          <h2 className="text-base font-bold mb-1">Add New User</h2>
          <p className="text-xs text-violet-200 mb-4">Register students or teachers quickly</p>
          <button
            onClick={() => navigate("/admin/add-user")}
            className="w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-violet-600 hover:bg-violet-50 transition"
          >
            + Add User
          </button>
        </div>

      </div>
    </div>
  );
}
