import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <Card className="p-6 space-y-5 border-border/50">
      <div>
        <h2 className="text-lg font-semibold">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Sign in to your account</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button className="w-full rounded-xl" size="lg">
          Sign in
        </Button>
      </form>

      <Separator />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
}
