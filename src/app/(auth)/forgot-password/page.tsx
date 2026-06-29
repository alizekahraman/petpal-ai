import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return (
    <Card className="p-6 space-y-5 border-border/50">
      <div>
        <h2 className="text-lg font-semibold">Reset your password</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Enter your email and we&apos;ll send a reset link
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button className="w-full rounded-xl" size="lg">
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}
