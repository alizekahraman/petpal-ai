"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/actions/auth";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    const fd = new FormData();
    fd.set("email", values.email);
    const result = await forgotPassword(fd);
    if (result?.error) {
      toast.error(result.error);
    } else {
      setSent(true);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="p-6 space-y-5 border-border/50 shadow-card">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <MailCheck className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Check your email</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  We sent a reset link to <span className="font-medium text-foreground">{getValues("email")}</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Didn&apos;t get it? Check spam or{" "}
                <button
                  className="text-primary hover:underline"
                  onClick={() => setSent(false)}
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Reset your password</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Enter your email and we&apos;ll send a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full rounded-xl" size="lg" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Send reset link
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </Card>
    </motion.div>
  );
}
