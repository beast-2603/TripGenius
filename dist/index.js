// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  waitlist;
  itineraries;
  userId;
  waitlistId;
  itineraryId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.waitlist = /* @__PURE__ */ new Map();
    this.itineraries = /* @__PURE__ */ new Map();
    this.userId = 1;
    this.waitlistId = 1;
    this.itineraryId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createWaitlistEntry(entry) {
    const id = this.waitlistId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const waitlistEntry = { ...entry, id, createdAt };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }
  async createItinerary(itinerary) {
    const id = this.itineraryId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const newItinerary = { ...itinerary, id, createdAt };
    this.itineraries.set(id, newItinerary);
    return newItinerary;
  }
  async getItineraryByEmail(email) {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.email === email
    );
  }
};
var storage = new MemStorage();

// server/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-testing" });
async function generateTripItinerary(tripDetails) {
  const { destination, budget, tripType, days, adults, children } = tripDetails;
  const totalTravelers = adults + children;
  const budgetPerDay = Math.floor(budget / days);
  const hasChildren = children > 0;
  const prompt = `
    Generate a detailed travel itinerary for a trip to ${destination} with the following details:
    - Budget: $${budget} total ($${budgetPerDay} per day)
    - Trip Type: ${tripType}
    - Duration: ${days} days
    - Travelers: ${adults} adults and ${children} children
    
    Requirements:
    - Suggest realistic activities and places that match the trip type and budget
    - ${hasChildren ? "Include family-friendly activities suitable for children" : "Focus on activities suited for adult travelers"}
    - Allocate realistic time for each activity and travel between locations
    - Spread the budget wisely across accommodations, food, activities, and transportation
    - For each day, include morning, afternoon, and evening activities
    
    Please format your response as a JSON object with the following structure:
    {
      "summary": "A brief 2-3 sentence overview of the trip",
      "days": [
        {
          "day": 1,
          "activities": [
            { "time": "Morning", "description": "Activity description" },
            { "time": "Afternoon", "description": "Activity description" },
            { "time": "Evening", "description": "Activity description" }
          ]
        },
        ... (repeat for each day)
      ]
    }
  `;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert travel planner that creates detailed, realistic itineraries." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });
    const itineraryContent = response.choices[0].message.content;
    if (!itineraryContent) {
      throw new Error("Failed to generate itinerary content");
    }
    return JSON.parse(itineraryContent);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return {
      summary: `A ${days}-day ${tripType} trip to ${destination} for ${adults} adults and ${children} children with a budget of $${budget}.`,
      days: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: [
          { time: "Morning", description: "Explore local attractions" },
          { time: "Afternoon", description: "Visit popular landmarks" },
          { time: "Evening", description: "Enjoy local cuisine" }
        ]
      }))
    };
  }
}

// shared/schema.ts
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  tripType: text("trip_type").notNull(),
  days: integer("days").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  createdAt: text("created_at").notNull()
});
var itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  tripType: text("trip_type").notNull(),
  days: integer("days").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  content: text("content").notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertWaitlistSchema = createInsertSchema(waitlist).pick({
  email: true,
  destination: true,
  budget: true,
  tripType: true,
  days: true,
  adults: true,
  children: true
});
var insertItinerarySchema = createInsertSchema(itineraries).pick({
  destination: true,
  budget: true,
  tripType: true,
  days: true,
  adults: true,
  children: true,
  content: true,
  email: true
});
var tripFormSchema = z.object({
  destination: z.string().min(2, "Please enter a destination"),
  budget: z.coerce.number().min(100, "Budget must be at least $100"),
  tripType: z.string().min(1, "Please select a trip type"),
  days: z.coerce.number().min(1, "Must be at least 1 day").max(30, "Maximum trip length is 30 days"),
  adults: z.coerce.number().min(1, "At least 1 adult required"),
  children: z.coerce.number().min(0, "Cannot be negative"),
  email: z.string().email("Please enter a valid email")
});

// server/routes.ts
import { z as z2 } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.post("/api/trip-plan", async (req, res) => {
    try {
      const validatedData = insertWaitlistSchema.parse(req.body);
      const waitlistEntry = await storage.createWaitlistEntry({
        ...validatedData
      });
      const generatedItinerary = await generateTripItinerary({
        destination: validatedData.destination,
        budget: validatedData.budget,
        tripType: validatedData.tripType,
        days: validatedData.days,
        adults: validatedData.adults,
        children: validatedData.children
      });
      const savedItinerary = await storage.createItinerary({
        destination: validatedData.destination,
        budget: validatedData.budget,
        tripType: validatedData.tripType,
        days: validatedData.days,
        adults: validatedData.adults,
        children: validatedData.children,
        content: JSON.stringify(generatedItinerary),
        email: validatedData.email
      });
      res.status(200).json({
        success: true,
        message: "Successfully added to waitlist and generated itinerary",
        itinerary: generatedItinerary,
        waitlistId: waitlistEntry.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      } else {
        console.error("Error generating itinerary:", error);
        res.status(500).json({
          success: false,
          message: "Failed to generate itinerary",
          error: error.message
        });
      }
    }
  });
  app2.get("/api/itineraries", async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }
      const itineraries2 = await storage.getItineraryByEmail(email);
      res.status(200).json({
        success: true,
        itineraries: itineraries2.map((itinerary) => ({
          ...itinerary,
          content: JSON.parse(itinerary.content)
        }))
      });
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch itineraries",
        error: error.message
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
