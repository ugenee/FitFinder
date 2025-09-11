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
    age: z.coerce
    .number()
    .min(16, "Age must be at least 16")
    .max(80, "Age must be below 80"),
    gender: genderEnum.refine((val) => !!val, {
    message: "Gender is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
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
        <div style={{ backgroundImage: `url(${backgroundImage})` }} 
        className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center px-4">
        
        <div className="relative text-center mb-10">
        <h1 className="font-bold text-3xl text-white">Create Account</h1>
        <p className="mt-3 text-lg text-gray-200">
          Create your account and start your fitness journey
        </p>
        </div>
        
        <div className="relative w-full max-w-xl">
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>
                
                <div>
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
                </div>

                <div>
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
                </div>
            </form>
        </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-gray-200 hover:bg-gray-400 text-black mb-4" form="signup">Sign Up</Button>
            <hr className="bg-gray-200 w-full"/>
            <p className="text-gray-200 text-sm">
            Already have an account?{" "}
            <a
                href="/login"
                className="font-medium underline hover:text-gray-400"
            >
                Login
            </a>
            </p>
        </CardFooter>


        </Card>
        </div>
        </div>
        
    )
}