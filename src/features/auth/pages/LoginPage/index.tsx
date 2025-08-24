import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "../../api/useLogin";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(100),
});

const LoginPage = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        toast.success("Login successful!");
        form.reset();
        navigate("/dashboard");
      },
      onError: () => {
        toast.error("Login failed. Please try again.");
      },
    });
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0"></div>
      <Card className="max-w-lg w-full bg-gray-900/70 rounded-3xl shadow-2xl py-12 px-8 backdrop-blur-lg border border-gray-800">
        <CardHeader className="mb-2">
          <CardTitle>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
              UnityHQ for Coders
            </h1>
          </CardTitle>
          <CardDescription>
            <span className="text-slate-300">
              A professional workspace for developers, teams, and tech
              enthusiasts. Fast, modern, and beautiful.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              aria-disabled={isPending}
            >
              {/* Add a debug button to force submit for testing */}
              {/* <button type="button" onClick={() => onSubmit(form.getValues())}>Debug Submit</button> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="bg-gray-800/80 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***************"
                        type="password"
                        {...field}
                        className="bg-gray-800/80 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-150 shadow-md"
              >
                {isPending ? "Logging In..." : "Log In"}
              </Button>
              <div className="text-center mt-4">
                <span className="text-slate-400">Don't have an account?</span>
                <Link
                  to="/sign-up"
                  className="ml-2 text-blue-400 hover:text-blue-500 underline transition-all duration-150"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
