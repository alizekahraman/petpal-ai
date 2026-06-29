export type Species = "dog" | "cat" | "bird" | "rabbit" | "fish" | "reptile" | "other";

export type Gender = "male" | "female" | "unknown";

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: Species;
  breed?: string;
  gender: Gender;
  dateOfBirth?: string;
  weight?: number;
  weightUnit: "kg" | "lbs";
  photoUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type HealthEventType =
  | "vaccination"
  | "vet_visit"
  | "medication"
  | "surgery"
  | "dental"
  | "grooming"
  | "weight"
  | "other";

export interface HealthEvent {
  id: string;
  petId: string;
  type: HealthEventType;
  title: string;
  description?: string;
  date: string;
  nextDueDate?: string;
  vetName?: string;
  cost?: number;
  documents?: string[];
  createdAt: string;
}

export type MealFrequency = "once" | "twice" | "three_times" | "free_feeding" | "custom";

export interface FeedingSchedule {
  id: string;
  petId: string;
  foodName: string;
  brand?: string;
  portionSize: number;
  portionUnit: "cups" | "grams" | "oz" | "ml";
  frequency: MealFrequency;
  times: string[];
  notes?: string;
  createdAt: string;
}

export interface FeedingLog {
  id: string;
  petId: string;
  scheduleId?: string;
  loggedAt: string;
  portionGiven: number;
  portionUnit: string;
  notes?: string;
}

export interface ScheduleReminder {
  id: string;
  petId: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: string;
  recurring: boolean;
  recurringInterval?: "daily" | "weekly" | "monthly" | "yearly";
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  timezone: string;
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  userId: string;
  petId?: string;
  title: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}
