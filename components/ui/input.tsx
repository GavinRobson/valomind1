import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          id={id}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className="
            absolute
            text-md
            text-zinc-400
            duration-150
            transform
            -translate-y-5
            -translate-x-2
            scale-75
            top-4
            z-10
            origin-[0]
            left-4
            hover:cursor-text
            peer-placeholder-shown:-translate-y-2
            peer-focus:scale-75
            peer-focus:-translate-y-5
            peer-focus:-translate-x-2
            peer-focus:text-black
          "
        >
          {label}
        </label>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
