import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { signInWithGoogle , signInWithGithub , signUp} from "../services/auth";
import { useForm } from "react-hook-form"


function SignupPage() {

  const { register, handleSubmit } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-sm bg-slate-800 text-white shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-2xl text-center">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4"
          onSubmit = {handleSubmit(signUp)}
          >
       

            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-slate-200 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email" , {required : true})}
                className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-slate-200 text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password" , {required : true})}
                className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

          

            {/* Signup Button */}
            <Button type="submit" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
              Sign Up
            </Button>

            {/* Social Signup */}
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline"
               className="w-full border-blue-500 text-blue-400 hover:border-blue-600 hover:text-blue-500"
               onClick={() => signInWithGoogle()}
               >
                Sign up with Google
              </Button>
              <Button variant="outline"
               className="w-full border-blue-500 text-blue-400 hover:border-blue-600 hover:text-blue-500"
               onClick={() => signInWithGithub()}
               >
                Sign up with GitHub
              </Button>
            </div>

            {/* Login link */}
            <p className="text-sm text-slate-300 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupPage
