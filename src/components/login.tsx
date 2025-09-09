import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { motion } from "framer-motion"
import backgroundImage from "@/assets/background.jpg"
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  }
  
  return (
    <motion.div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold text-white">
          FitFinder
        </h1>
        <p className="mt-3 text-lg text-gray-200">
          Your fitness journey begins here – Join the FitFinder community
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="relative w-full max-w-lg"
      >
        <Card className="w-full bg-white/0 opacity-100 border-white/20 shadow-md shadow-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-100">
              Welcome back!
            </CardTitle>
            <CardDescription className="text-gray-400" > Sign in to start your fitness journey </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} id="login-form">
              <div className="flex flex-col gap-8">
                <div className="grid gap-2">
                  <Label
                    htmlFor="username"
                    className="text-gray-200 font-medium"
                  >
                    Username
                  </Label>
                  <Input
                    className="!placeholder-gray-400 text-gray-200"
                    id="username"
                    type="username"
                    value={username}
                    placeholder="e.g JohnDoe"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="password"
                      className="text-gray-200 font-medium"
                    >
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-gray-200"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                  <Input
                    className="!placeholder-gray-400 text-gray-200"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="e.g JohnDoe123!"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-2 text-gray-200 hover:text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-gray-200 text-black hover:bg-gray-400 mb-4 cursor-pointer"
              form="login-form"
            >
              Login
            </Button>
            <hr className="bg-gray-200 w-full" />
            <p className="text-gray-200 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium underline hover:text-gray-400"
              >
                Sign Up
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
