import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


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
    firstName: z
    .string()
    .min(2, "at least 2 characters")
    .max(50, "at most 50 characters")
    .regex(/^[A-Za-z]+$/, "letters and spaces only"),
    lastName: z
    .string()
    .min(2, "at least 2 characters")
    .max(50, "at most 50 characters")
    .regex(/^[A-Za-z]+$/, "letters and spaces only"),
    age: z.coerce
    .number()
    .min(16, "Age must be at least 16")
    .max(80, "Age must be below 80")
    .optional(),
    gender: genderEnum.optional(),
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
            firstName: "",
            lastName: "",
            age: undefined,
            gender: undefined,
    
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
    }


    return (
        
        <div>
        <h1 className="font-bold text-3xl">Create Account</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <div>
                <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input 
                            placeholder="email@example.com" {...field}
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
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input 
                            placeholder="JohnDoe123" {...field}
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="relative">
                            <Input 
                            placeholder="JohnDoe123!" {...field}
                            type={showPassword ? "text" : "password"}
                            required
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-2 right-2"
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
                name="firstName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}>
                </FormField>
                </div>

                <div>
                <FormField
                control={form.control}
                name="lastName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Doe" {...field}/>
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
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g. 30" {...field}/>
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
                            <FormLabel>Gender</FormLabel>
                            <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                            >
                            <FormControl>
                                <SelectTrigger className="w-full">
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



                <Button type="submit">Sign Up</Button>
            </form>
        </Form>
        </div>
    )
}