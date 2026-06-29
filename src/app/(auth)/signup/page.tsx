import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <Card className="p-6 space-y-5 border-border/50">
      <div>
        <h2 className="text-lg font-semibold">Create your account</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Start caring for your pets smarter</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" type="text" placeholder="Jane Doe" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Min. 8 characters" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" />
        </div>
        <Button className="w-full rounded-xl" size="lg">
          Create account
        </Button>
      </form>

      <Separator />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
