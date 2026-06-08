"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, Card, Input, Alert } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError(result.error.message || "Failed to create account");
        return;
      }

      setSuccess("Account created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <Card className="w-full max-w-md shadow-lg">
    
          <div className="mb-4">
            <Link
              href="/signin"
              className="text-sm text-primary hover:underline"
            >
              ← Back to Sign In
            </Link>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">
              Create Account
            </h1>
            <p className="mt-2 text-default-500">
              Sign up to get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {error && (
              <Alert
                color="danger"
                title="Error"
                variant="faded"
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                color="success"
                title="Success"
                variant="faded"
              >
                {success}
              </Alert>
            )}

            <Input
          className="text-red-500"
              label="Full Name"
              placeholder="Full Name"
              variant="bordered"
              value={form.name}
              onValueChange={(value) =>
                handleChange("name", value)
              }
              isRequired
            />

            <Input
              label="Email"
              placeholder="
              Your Email "
              type="email"
              variant="bordered"
              value={form.email}
              onValueChange={(value) =>
                handleChange("email", value)
              }
              isRequired
            />

            <Input
              label="Password"
              placeholder="Enter password"
              variant="bordered"
              type={isVisible ? "text" : "password"}
              value={form.password}
              onValueChange={(value) =>
                handleChange("password", value)
              }
              isRequired
              endContent={
                <button
                  type="button"
                  onClick={() =>
                    setIsVisible((prev) => !prev)
                  }
                  className="text-xs text-default-500"
                >
                  {isVisible ? "Hide" : "Show"}
                </button>
              }
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-default-500">
              Already have an account?
            </span>{" "}
            <Link
              href="/signin"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
      
      </Card>
    </div>
  );
}