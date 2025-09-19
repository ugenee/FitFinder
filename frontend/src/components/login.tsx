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
import { useState } from "react"
import { motion } from "framer-motion"
import backgroundImage from "@/assets/background.jpg"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom"
import { useLoginAuthLoginPost } from "@/api/endpoints/auth/auth.gen";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  
  const { mutate, isPending, isError, error } = useLoginAuthLoginPost({
    mutation: {
      onSuccess: () => {
        console.log("Logged in");
        // navigate("/dashboard");
      },
      onError: () => {
        console.error("Login failed");
      },
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({data : {username: username.trim(), password: password.trim()}});
  };
  
  const navigate = useNavigate()
  
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-6 overflow-y-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 20 + 10; // px
          const left = Math.random() * 100; // %
          const delay = Math.random() * 8; // s
          const duration = Math.random() * 10 + 5; // s
          const initialY = -10; // vh, random start above screen

          return (
            <span
              key={i}
              className="absolute text-white"
              style={{
                left: `${left}%`,
                fontSize: `${size}px`,
                top: `${initialY}vh`,
                animation: `snowfall ${duration}s linear ${delay}s infinite`,
              }}
            >
              {["❅", "❆"][Math.floor(Math.random() * 2)]}
            </span>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          damping: 10,
          stiffness: 100
        }}
        className="relative text-center mb-10"
      >
        <motion.h1 
        className="text-5xl font-extrabold text-white"
        initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay: 0.2
          }}
        >
          FitFinder
        </motion.h1>

        <motion.p 
        className="mt-3 text-lg text-gray-200"
        initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay: 0.4
          }}
        >
          Your fitness journey begins here – Join the FitFinder community
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay: 0.3
          }
        }}
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
              <div className="flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                  className="grid gap-2"
                >
                  <Label className="text-gray-200">Username</Label> 
                  <Input
                    className="!placeholder-gray-400 text-gray-200 autofill:shadow-[inset_0_0_0px_1000px_rgb(16,16,16)] autofill:text-white"
                    id="username"
                    type="username"
                    value={username}
                    label="What's your username?"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                  className="grid gap-2"
                >
                  <div className="flex items-center">
                    <Label className="text-gray-200">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-gray-200"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                  <Input
                    className="text-gray-200"
                    id="password"
                    label="What's your password?"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 right-3 text-gray-200 hover:text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                  </div>
                </motion.div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex-col gap-2">
            {isError && (
              <div className="text-sm text-red-500">
                {error.response?.data.detail?.map((err) => err.msg).join(", ") ?? "Login failed. Please check your credentials."}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-gray-200 text-black hover:bg-gray-400 mb-4 cursor-pointer"
              form="login-form"
              disabled={isPending} // disable while loading
            >
              {isPending? "Logging in ..." : "Login"}
            </Button>
            <hr className="bg-gray-200 w-full" />
            <p className="text-gray-200 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="relative font-semibold text-gray-200 after:content-[''] after:absolute after:left-1/2 after:bottom-0
                after:w-0 after:h-[2px] after:bg-gray-200 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 cursor-pointer"
              >
                Sign Up Here
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
