import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export const NoCartAccess = () => {
  return (
    <main className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-full max-w-md ">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <span className="text-2xl ">Avion</span>
          <CardTitle className="text-2xl font-semibold">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Please login to see your card items and checkout
          </p>
          <SignInButton mode="modal">
            <button className="w-full py-1 font-semibold bg-black text-white rounded-md">
              Sign in
            </button>
          </SignInButton>
        </CardContent>

        <CardFooter className="w-full flex flex-col items-center gap-1.5">
          <p className="text-sm text-gray-500">Don&apos;t have an account ?</p>
          <SignUpButton>
          <button className="w-full py-1 bg-gray-white border rounded-md hover:bg-black hover:text-white">
              Create an account
            </button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </main>
  );
};
