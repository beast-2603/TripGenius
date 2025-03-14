import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  tripType: text("trip_type").notNull(),
  days: integer("days").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  createdAt: text("created_at").notNull(),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  tripType: text("trip_type").notNull(),
  days: integer("days").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  content: text("content").notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistSchema = createInsertSchema(waitlist).pick({
  email: true,
  destination: true,
  budget: true,
  tripType: true,
  days: true,
  adults: true,
  children: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).pick({
  destination: true,
  budget: true,
  tripType: true,
  days: true,
  adults: true,
  children: true,
  content: true,
  email: true,
});

export const tripFormSchema = z.object({
  destination: z.string().min(2, "Please enter a destination"),
  budget: z.coerce.number().min(100, "Budget must be at least $100"),
  tripType: z.string().min(1, "Please select a trip type"),
  days: z.coerce.number().min(1, "Must be at least 1 day").max(30, "Maximum trip length is 30 days"),
  adults: z.coerce.number().min(1, "At least 1 adult required"),
  children: z.coerce.number().min(0, "Cannot be negative"),
  email: z.string().email("Please enter a valid email")
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;
export type TripFormValues = z.infer<typeof tripFormSchema>;
