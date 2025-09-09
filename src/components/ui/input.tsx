import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label: string;
  containerClassName?: string;
}

function Input({ 
  className, 
  type, 
  label, 
  containerClassName,
  id,
  ...props 
}: FloatingInputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  
  return (
    <div className={cn("relative w-full", containerClassName)}>
      <input
        id={inputId}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "flex h-12 w-full min-w-0 rounded-lg border border-input bg-transparent/70 backdrop-blur-sm",
          "px-3 pt-4 pb-1 text-base shadow-xs transition-all outline-none text-gray-200",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm peer",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "dark:bg-gray-800/30 dark:backdrop-blur-sm",
          className
        )}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] start-4",
          "peer-focus:text-gray-200 peer-focus:dark:text-blue-400",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
          "peer-focus:scale-75 peer-focus:-translate-y-3",
          "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
          "pointer-events-none transition-all"
        )}
      >
        {label}
      </label>
    </div>
  )
}

export { Input }