"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User, Bell, Shield, Trash2, Camera, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";
import { Toggle } from "@/components/shared/toggle";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
];

interface NotificationPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const DEFAULT_NOTIF_PREFS: NotificationPref[] = [
  { id: "feeding", label: "Feeding reminders", description: "Daily meal time alerts", enabled: true },
  { id: "health", label: "Health reminders", description: "Upcoming vet visits and vaccinations", enabled: true },
  { id: "ai", label: "AI insights", description: "Weekly health summaries from your AI assistant", enabled: false },
];

export default function SettingsPage() {
  const router = useRouter();

  // Profile state
  const [fullName, setFullName] = React.useState("Jane Doe");
  const [email] = React.useState("jane@example.com");
  const [timezone, setTimezone] = React.useState("Europe/London");
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [profileSaving, setProfileSaving] = React.useState(false);
  const [profileSaved, setProfileSaved] = React.useState(false);

  // Notification state
  const [notifPrefs, setNotifPrefs] = React.useState(DEFAULT_NOTIF_PREFS);

  // Delete account state
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    // TODO: wire to updateProfile server action
    await new Promise((r) => setTimeout(r, 800));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  function toggleNotif(id: string) {
    setNotifPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    // TODO: wire to deleteAccount server action
    await new Promise((r) => setTimeout(r, 1200));
    setDeleting(false);
    setShowDeleteDialog(false);
    router.push("/sign-in");
  }

  return (
    <div className="max-w-lg mx-auto">
      <PageHeader title="Settings" description="Manage your account and preferences." />

      {/* Profile */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          Profile
        </h3>
        <Card className="p-5 border-border/50">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
                  <AvatarFallback className="bg-accent text-accent-foreground text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                  aria-label="Change profile photo"
                >
                  <Camera className="w-3 h-3 text-primary-foreground" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setAvatarUrl(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
              <div>
                <p className="text-sm font-medium">{fullName}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                minLength={2}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            <Button type="submit" className="rounded-xl" disabled={profileSaving}>
              {profileSaving ? "Saving…" : profileSaved ? "Saved!" : "Save changes"}
            </Button>
          </form>
        </Card>
      </section>

      {/* Notifications */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </h3>
        <Card className="divide-y divide-border border-border/50">
          {notifPrefs.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Toggle
                checked={item.enabled}
                onChange={() => toggleNotif(item.id)}
                label={item.label}
                id={`notif-${item.id}`}
              />
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
        <Card className="border-border/50 divide-y divide-border">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="flex items-center justify-between w-full px-5 py-4 text-sm font-medium hover:bg-muted/50 transition-colors rounded-t-xl"
          >
            Change password
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            className="flex items-center justify-between w-full px-5 py-4 text-sm font-medium hover:bg-muted/50 transition-colors rounded-b-xl opacity-50 cursor-not-allowed"
            disabled
            title="Coming soon"
          >
            Two-factor authentication
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              Soon
            </span>
          </button>
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
            Permanently delete your account and all associated data. This cannot be undone.
          </p>
          <Button
            variant="destructive"
            className="rounded-xl"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete account
          </Button>
        </Card>
      </section>

      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete account?"
        description="All your pets, health records, and data will be permanently deleted. This action cannot be undone."
        confirmLabel="Yes, delete my account"
        variant="destructive"
        loading={deleting}
      />
    </div>
  );
}
