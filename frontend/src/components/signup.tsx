import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import backgroundImage from "@/assets/background.jpg"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


const genderEnum = z.enum(["Male", "Female"]);


const formSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z
    .string()
    .min(8, "at least 8 characters")
    .max(20, "at most 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Alphanumeric only"),
  password: z
    .string()
    .min(8, "at least 8 characters")
    .regex(/[A-Z]/, "at least one uppercase")
    .regex(/[a-z]/, "at least one lowercase")
    .regex(/[0-9]/, "at least one number")
    .regex(/[!@#$%^&*_]/, "at least one special character"),
  age: z.union([
    z.number().min(16, "Age must be at least 16").max(80, "Age must be below 80"),
    z.string()
      .transform((val) => val === "" ? undefined : Number(val))
      .refine((val) => val === undefined || !isNaN(val), "Must be a number")    
      .refine((val) => val === undefined || val >= 16, "Age must be at least 16")
      .refine((val) => val === undefined || val <= 80, "Age must be below 80")
  ]),
  gender: genderEnum
});

type FormData = z.infer<typeof formSchema>;


export default function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate()
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            age: undefined,
            gender: undefined,
    
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
    }


    return (
        <div 
        style={{ backgroundImage: `url(${backgroundImage})` }} 
        className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-8 overflow-y-auto"
        >
        
        <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          damping: 10,
          stiffness: 100
        }}
        className="relative text-center mb-10 sm:mb-10 px-2"
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
          Create your account and start your fitness journey
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
        className="relative w-full max-w-xl"
        >
        
        <Card className="w-full bg-white/0 opacity-100 border-white/20 shadow-md shadow-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-100">
              Create Account    
            </CardTitle>
            <CardDescription className="text-gray-400" > Sign in to start your fitness journey </CardDescription>
          </CardHeader>
          <CardContent>
        <Form {...form}>
            <form id="signup" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                >
                <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-gray-200">Email</FormLabel>
                        <FormControl>
                            <Input
                            label="what's your email?" {...field}
                            className="autofill:shadow-[inset_0_0_0px_1000px_rgb(16,16,16)] autofill:text-white"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}>
                </FormField>
                </motion.div>
                </div>
                
                <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                >
                <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-gray-200">Username</FormLabel>
                        <FormControl>
                            <Input 
                            label="what's your userame?" {...field}
                            className="autofill:shadow-[inset_0_0_0px_1000px_rgb(16,16,16)] autofill:text-white"
                            
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}>
                </FormField>
                </motion.div>
                </div>

                <div>
                    <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                >
                <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-gray-200">Password</FormLabel>
                        <FormControl>
                            <div className="relative">
                            <Input 
                            label="what's your password?" {...field}
                            type={showPassword ? "text" : "password"}
                            aria-invalid = {form.formState.errors.password !== undefined}
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3.5 right-3 text-gray-200 hover:text-gray-400"
                            >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                
                            </button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}>
                </FormField>
                </motion.div>
                </div>
                
                <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                >
                <FormField
                control={form.control}
                name="age"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-gray-200">Age</FormLabel>
                        <FormControl>
                            <Input type="number" label="what's your age?" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"{...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}>
                </FormField>
                </motion.div>
                </div>

                <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.7
                  }}
                >
                    <FormField
                    control={form.control}
                    name="gender"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-gray-200">Gender</FormLabel>
                            <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                            >
                            <FormControl>
                                <SelectTrigger size="md" className="w-full text-gray-200">
                                    <SelectValue placeholder="Select your gender"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {genderEnum.options.map((g) => (
                                <SelectItem key={g} value={g}>
                                    {g}
                                </SelectItem>))}
                            </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>

                    )}/>
                    </motion.div>
                </div>
            </form>
        </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-gray-200 hover:bg-gray-400 text-black mb-4" form="signup">Sign Up</Button>
            <hr className="bg-gray-200 w-full"/>
            <p className="text-gray-200 text-sm">
            Already have an account?{" "}
            <button
                onClick={() => navigate("/login")}
                className="relative font-semibold text-gray-200 after:content-[''] after:absolute after:left-1/2 after:bottom-0
                after:w-0 after:h-[2px] after:bg-gray-200 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 cursor-pointer"
              >
                Login Here
            </button>
            </p>
        </CardFooter>


        </Card>
        </motion.div>
        </div>
        
    )
}