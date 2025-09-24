import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { signInWithGoogle, signInWithGithub, login } from "../services/auth";
import { useForm } from "react-hook-form";
import { Code } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import AuthLoader from "@/animations/AuthLoader";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      await login(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden bg-slate-900">
        {/* Left side - Image */}
        {/* Left side - Image with overlay */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="hidden md:block relative w-1/2 h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1656863492763-23732b72ea4d?q=80&w=1170&auto=format&fit=crop"
            alt="Login Illustration"
            className="object-cover w-full h-full rounded-r-2xl"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent rounded-r-2xl" />
        </motion.div>

        {/* Right side - Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 p-8"
        >
          {/* Logo + Title */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
            >
              <Code className="w-6 h-6 text-white" />
            </motion.div>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              CodeCraft
            </span>
          </div>

          <Card className="w-full bg-slate-800 text-white border border-slate-700 shadow-2xl">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-2xl font-semibold">
                Welcome Back
              </CardTitle>
              <p className="text-slate-400 text-sm mt-1">
                Please login to your account
              </p>
            </CardHeader>

            <CardContent>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleLogin)}
              >
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" className="text-slate-200 text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email", { required: true })}
                    className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-slate-200 text-sm"
                    >
                      Password
                    </Label>
                    <a
                      href="#"
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Login button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? (
                    <AuthLoader />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full mt-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white shadow-lg"
                    >
                      Login
                    </Button>
                  )}
                </motion.div>

                {/* Social logins */}
                <div className="flex flex-col gap-2 mt-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 cursor-pointer text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2"
                      onClick={signInWithGoogle}
                    >
                      <FaGoogle className="w-5 h-5 " />
                      Login with Google
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 cursor-pointer text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2"
                      onClick={signInWithGithub}
                    >
                      <FaGithub />
                      Login with GitHub
                    </Button>
                  </motion.div>
                </div>

                {/* Sign up link */}
                <p className="text-sm text-slate-300 text-center mt-4">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-400 hover:underline font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
