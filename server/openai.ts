import OpenAI from 'openai';

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-testing'
});

export interface TripDetails {
  destination: string;
  budget: number;
  tripType: string;
  days: number;
  adults: number;
  children: number;
}

export interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    description: string;
  }[];
}

export interface GeneratedItinerary {
  summary: string;
  days: ItineraryDay[];
}

export async function generateTripItinerary(
  tripDetails: TripDetails
): Promise<GeneratedItinerary> {
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
    - ${hasChildren ? 'Include family-friendly activities suitable for children' : 'Focus on activities suited for adult travelers'}
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
          ],
          "food":[
            {"type": "Breakfast", "description": "Activity description"},
            {"type": "Lunch", "description": "Activity description"},
            {"type": "Dinner", "description": "Activity description"},
          ]
        },
        ... (repeat for each day)
      ]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert travel planner that creates detailed, realistic itineraries and suggests local delicacies.'
        },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    const itineraryContent = response.choices[0].message.content;

    if (!itineraryContent) {
      throw new Error('Failed to generate itinerary content');
    }

    return JSON.parse(itineraryContent) as GeneratedItinerary;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    // Fallback simple itinerary in case of OpenAI API failure
    return {
      summary: `A ${days}-day ${tripType} trip to ${destination} for ${adults} adults and ${children} children with a budget of $${budget}.`,
      days: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: [
          { time: 'Morning', description: 'Explore local attractions' },
          { time: 'Afternoon', description: 'Visit popular landmarks' },
          { time: 'Evening', description: 'Enjoy local cuisine' }
        ],
        food: [
          { type: 'Breakfast', description: 'Activity description' },
          { type: 'Lunch', description: 'Activity description' },
          { type: 'Dinner', description: 'Activity description' }
        ]
      }))
    };
  }
}
