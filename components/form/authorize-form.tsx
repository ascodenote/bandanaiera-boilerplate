"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSuccess,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Link from "next/link";

// import { loginAction } from "@/actions/auth.action";
import { LoginSchema } from "@/schemas/auth";

export const AuthorizeForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    // console.log(values);
    startTransition(async () => {
      try {
        // const response = await fetch("/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // });

        // const data = await response.json();

        // if (!response.ok) {
        //   setError(data.message || "Login failed.");
        // } else {
        //   setSuccess("Login successful.");
        //   // You can handle success like redirecting to dashboard or saving tokens
        // }
        console.log(values);
      } catch (err) {
        setError("An unexpected error occurred.");
      }
    });
    // startTransition(() => {
    //   loginAction(values).then((data) => {
    //     console.log("on form", values);
    //     setError(data?.error);
    //   });
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <div className="grid gap-1">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="selamet@mail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  {/* <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm "
                    tabIndex={-1}
                  >
                    Forgot your password?
                  </Link> */}
                </div>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};
