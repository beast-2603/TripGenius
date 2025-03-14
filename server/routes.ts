import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateTripItinerary } from "./openai";
import { insertWaitlistSchema, insertItinerarySchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to generate itinerary and add to waitlist
  app.post("/api/trip-plan", async (req: Request, res: Response) => {
    try {
      // Validate form data
      const validatedData = insertWaitlistSchema.parse(req.body);
      
      // Add user to waitlist
      const waitlistEntry = await storage.createWaitlistEntry({
        ...validatedData
      });

      // Generate itinerary using OpenAI
      const generatedItinerary = await generateTripItinerary({
        destination: validatedData.destination,
        budget: validatedData.budget,
        tripType: validatedData.tripType,
        days: validatedData.days,
        adults: validatedData.adults,
        children: validatedData.children
      });

      // Save the generated itinerary
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
      if (error instanceof z.ZodError) {
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
          error: (error as Error).message
        });
      }
    }
  });

  // API endpoint to get itineraries by email
  app.get("/api/itineraries", async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      const itineraries = await storage.getItineraryByEmail(email);
      
      res.status(200).json({
        success: true,
        itineraries: itineraries.map(itinerary => ({
          ...itinerary,
          content: JSON.parse(itinerary.content)
        }))
      });
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch itineraries",
        error: (error as Error).message
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
