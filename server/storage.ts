import { Itinerary, InsertItinerary, Waitlist, InsertWaitlist, User, InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  getItineraryByEmail(email: string): Promise<Itinerary[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, Waitlist>;
  private itineraries: Map<number, Itinerary>;
  private userId: number;
  private waitlistId: number;
  private itineraryId: number;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.itineraries = new Map();
    this.userId = 1;
    this.waitlistId = 1;
    this.itineraryId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.waitlistId++;
    const createdAt = new Date().toISOString();
    const waitlistEntry: Waitlist = { ...entry, id, createdAt };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.itineraryId++;
    const createdAt = new Date().toISOString();
    const newItinerary: Itinerary = { ...itinerary, id, createdAt };
    this.itineraries.set(id, newItinerary);
    return newItinerary;
  }

  async getItineraryByEmail(email: string): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.email === email
    );
  }
}

export const storage = new MemStorage();
