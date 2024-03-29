import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  object,
  string,
  email,
  minLength,
  boolean,
  forward,
  custom,
  Input as ValibotInput,
  Output as ValibotOutput,
} from "valibot";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { Checkbox } from "./components/ui/checkbox";

import "./globals.css";

const signUpFormValueSchema = object(
  {
    email: string([email("Invalid e-mail address.")]),
    password: string([minLength(8, "Password must be at least 8 characters.")]),
    passwordConfirmation: string([
      minLength(8, "Password must be at least 8 characters."),
    ]),
    agreeWithTerms: boolean(),
  },
  [
    forward(
      custom(
        (value) => value.password === value.passwordConfirmation,
        "The password confirmation does not match."
      ),
      ["passwordConfirmation"]
    ),
    forward(
      custom((value) => value.agreeWithTerms, "You must agree with the terms."),
      ["agreeWithTerms"]
    ),
  ]
);

const SignupForm: FC = () => {
  const form = useForm<ValibotInput<typeof signUpFormValueSchema>>({
    resolver: valibotResolver(signUpFormValueSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      agreeWithTerms: false,
    },
  });

  function onSubmit(values: ValibotOutput<typeof signUpFormValueSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Your e-mail address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>At least 8 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreeWithTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Agree terms</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="container mx-auto p-4 space-y-8">
      <SignupForm />
    </div>
  </React.StrictMode>
);
