import type { Metadata } from "next";
import { User, Bell, Shield, Moon, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="max-w-lg mx-auto">
      <PageHeader title="Settings" description="Manage your account and preferences." />

      {/* Profile */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          Profile
        </h3>
        <Card className="p-5 space-y-4 border-border/50">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-accent text-accent-foreground text-lg font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="rounded-xl">
              Change photo
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" defaultValue="Jane Doe" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jane@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="Europe/London" />
            </div>
          </div>
          <Button className="rounded-xl">Save changes</Button>
        </Card>
      </section>

      {/* Notifications */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </h3>
        <Card className="divide-y divide-border border-border/50">
          {[
            { label: "Feeding reminders", description: "Daily meal time alerts" },
            { label: "Health reminders", description: "Upcoming vet visits and vaccinations" },
            { label: "AI insights", description: "Weekly health summaries from your AI assistant" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <div className="w-10 h-6 rounded-full bg-primary/20 relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary" />
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Security */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Security
        </h3>
        <Card className="p-5 space-y-3 border-border/50">
          <Button variant="outline" className="w-full rounded-xl justify-start">
            Change password
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start">
            Two-factor authentication
          </Button>
        </Card>
      </section>

      {/* Danger zone */}
      <section>
        <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Trash2 className="w-3.5 h-3.5" />
          Danger zone
        </h3>
        <Card className="p-5 border-destructive/20">
          <p className="text-sm text-muted-foreground mb-3">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="destructive" className="rounded-xl">
            Delete account
          </Button>
        </Card>
      </section>
    </div>
  );
}
