"use client";
import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, CheckSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Context } from "@components/Clients";
import { useRouter } from "next/navigation"; // For redirecting the user
import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const router = useRouter(); // For redirect

  // Login Handler
  const loginHandler = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
      router.push("/"); // Redirect to the homepage or dashboard after login
    } catch (error) {
      return toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user?._id) {
      router.push("/tasklists"); // Use router.push for client-side redirection
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <CheckSquare className="h-6 w-6 text-green-500" />
            <CardTitle className="text-2xl font-bold text-center">
              Todo List Login
            </CardTitle>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Enter your credentials to access your tasks
          </p>
        </CardHeader>

        {/* Form Wrapper */}
        <form onSubmit={loginHandler}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="flex items-center justify-between w-full text-sm">
              <a href="/register" className="text-primary hover:underline">
                Don't have an account?
              </a>
              <a href="/register" className="text-primary hover:underline">
                Create account
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>

      <div className="fixed bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
        <p>© 2024 Todo List App. All rights reserved.</p>
      </div>
    </div>
  );
}
