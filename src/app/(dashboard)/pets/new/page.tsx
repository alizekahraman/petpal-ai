import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Add Pet" };

export default function NewPetPage() {
  return (
    <div className="max-w-md mx-auto">
      <PageHeader
        title="Add a pet"
        description="Tell us about your new companion."
        action={
          <Link href="/pets">
            <Button variant="ghost" size="sm" className="rounded-xl gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
          </Link>
        }
      />

      <Card className="p-5 border-border/50">
        <form className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Pet name *</Label>
            <Input id="name" placeholder="Luna" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="species">Species *</Label>
              <Select>
                <SelectTrigger id="species">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                  <SelectItem value="fish">Fish</SelectItem>
                  <SelectItem value="reptile">Reptile</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" placeholder="Golden Retriever" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="weight">Weight</Label>
              <div className="flex gap-2">
                <Input id="weight" type="number" placeholder="28" className="flex-1" />
                <Select defaultValue="kg">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any special notes about your pet..." rows={3} />
          </div>

          <div className="flex gap-3 pt-1">
            <Button className="flex-1 rounded-xl" size="lg">
              Save pet
            </Button>
            <Link href="/pets">
              <Button variant="outline" className="rounded-xl" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
