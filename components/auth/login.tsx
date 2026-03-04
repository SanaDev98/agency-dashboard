"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@agency.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      await createAuthCookie();
      router.replace("/");
    },
    [router]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-default-900">Welcome back</h1>
        <p className="text-sm text-default-500 mt-1">
          Sign in to your account to continue
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div className="flex flex-col gap-4">
            <Input
              variant="bordered"
              label="Email address"
              type="email"
              value={values.email}
              isInvalid={!!errors.email && !!touched.email}
              errorMessage={errors.email}
              onChange={handleChange("email")}
            />
            <Input
              variant="bordered"
              label="Password"
              type="password"
              value={values.password}
              isInvalid={!!errors.password && !!touched.password}
              errorMessage={errors.password}
              onChange={handleChange("password")}
            />

            <Button
              onPress={() => handleSubmit()}
              color="primary"
              className="w-full mt-1 font-semibold"
              size="lg"
            >
              Sign in
            </Button>
          </div>
        )}
      </Formik>

      <p className="text-sm text-default-400 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary">
          Register here
        </Link>
      </p>
    </div>
  );
};
