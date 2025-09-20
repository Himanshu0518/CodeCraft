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
import { signInWithGoogle , signInWithGithub , login} from "../services/auth";
import { useForm } from "react-hook-form"


function LoginPage() {
  const { register, handleSubmit } = useForm();


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-sm bg-slate-800 text-white shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-2xl text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4"
          onSubmit={handleSubmit(login)}
          >
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

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-200 text-sm">Password</Label>
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
                {...register("password" , {required : true})}
                className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button type="submit" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>

            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" 
              className="w-full border-blue-500 text-blue-400 hover:border-blue-600 hover:text-blue-500"
              onClick={signInWithGoogle}
              >
                Login with Google
              </Button>

              <Button variant="outline" 
              className="w-full border-blue-500 text-blue-400 hover:border-blue-600 hover:text-blue-500"
              onClick={signInWithGithub}
              >
                Login with GitHub
              </Button>
            </div>

            <p className="text-sm text-slate-300 text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
