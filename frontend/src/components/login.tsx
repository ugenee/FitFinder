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
import { useMutation } from "@tanstack/react-query"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [snowflakes] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const delay = Math.random() * 6;
      const duration = Math.random() * 10 + 5;
      const initialY = -20;
      const symbol = ["❅", "❆"][Math.floor(Math.random() * 2)];
      return { id: i, size, left, delay, duration, initialY, symbol };
    })
  );
  
  async function loginPost({ username, password }: { username: string; password: string }) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      body: formData, // FastAPI expects form-encoded data for OAuth2PasswordRequestForm
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail?.[0]?.msg ?? "Login failed");
    }

    return response.json();
  }

  const { mutate, isPending, isError, error} = useMutation({
    mutationFn: loginPost,
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({username, password});
  };
  
  const navigate = useNavigate()
  
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-6 overflow-y-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute text-white"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            top: `${flake.initialY}vh`,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {flake.symbol}
        </span>
      ))}
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
              {error?.message || "Login failed. Please check your credentials."}
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
