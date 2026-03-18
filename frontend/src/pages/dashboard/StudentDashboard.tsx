import { User, FileText, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Profile",
      desc: "View and update your personal details",
      icon: User,
      bg: "bg-blue-100",
      color: "text-blue-600",
      link: "/my-profile",
    },
    {
      title: "Available Courses",
      desc: "Browse and enroll in available courses",
      icon: BookOpen,
      bg: "bg-green-100",
      color: "text-green-600",
      link: "/available-courses",
    },
    {
      title: "My Enrollments",
      desc: "Track your course enrollment status",
      icon: FileText,
      bg: "bg-orange-100",
      color: "text-orange-600",
      link: "/my-enrollments",
    },
  ];

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || user?.email || "Student"}!
        </h1>
        <p className="text-muted-foreground">Student Dashboard</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card
            key={c.title}
            className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => navigate(c.link)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">{c.title}</CardTitle>
              <div className={`rounded-lg p-2 ${c.bg}`}>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
