import Link from "next/link";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Verify Email" };

export default function VerifyEmailPage() {
  return (
    <Card className="p-6 space-y-5 border-border/50 shadow-card text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Verify your email</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We&apos;ve sent a confirmation link to your email address. Click it to activate your account.
        </p>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Didn&apos;t receive it? Check your spam folder.</p>
      </div>

      <Link href="/login">
        <Button variant="outline" className="w-full rounded-xl">
          Back to sign in
        </Button>
      </Link>
    </Card>
  );
}
