import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Share2Icon, SaveIcon } from "lucide-react";

interface TripDetails {
  destination: string;
  tripType: string;
  days: number;
  budget: number;
}

interface Activity {
  time: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  activities: Activity[];
}

interface Itinerary {
  summary: string;
  days: ItineraryDay[];
}

interface TripItineraryProps {
  itinerary: Itinerary;
  tripDetails: TripDetails;
}

const TripItinerary: React.FC<TripItineraryProps> = ({ itinerary, tripDetails }) => {
  const { toast } = useToast();
  
  const handleSave = () => {
    // In a real app, this would save to user's account 
    // or download as PDF/file, but for the demo we'll just show a toast
    toast({
      title: "Itinerary Saved",
      description: "Your itinerary has been saved successfully.",
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trip Itinerary for ${tripDetails.destination}`,
          text: `Check out my ${tripDetails.days}-day trip to ${tripDetails.destination}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast({
          title: "Share URL Copied",
          description: "Share link has been copied to your clipboard.",
        });
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Share URL Copied",
        description: "Share link has been copied to your clipboard.",
      });
    }
  };
  
  const getTripTypeLabel = (type: string): string => {
    const tripTypes: Record<string, string> = {
      adventure: "Adventure",
      relaxation: "Relaxation",
      culture: "Culture",
      food: "Food & Cuisine",
      family: "Family"
    };
    
    return tripTypes[type] || type;
  };
  
  return (
    <div className="h-full">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-900">Your Trip to {tripDetails.destination}</h3>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span>{getTripTypeLabel(tripDetails.tripType)}</span>
          <span className="mx-2">•</span>
          <span>{tripDetails.days} days</span>
          <span className="mx-2">•</span>
          <span>${tripDetails.budget}</span>
        </div>
        
        {itinerary.summary && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            {itinerary.summary}
          </div>
        )}
        
        <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {itinerary.days.map((day) => (
            <div key={day.day} className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900">Day {day.day}</h4>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                {day.activities.map((activity, index) => (
                  <li key={index} className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>{activity.time}:</strong> {activity.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleSave}
          >
            <SaveIcon className="h-5 w-5 mr-2" />
            Save Itinerary
          </Button>
          <Button 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
            variant="outline"
            onClick={handleShare}
          >
            <Share2Icon className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Success!</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>You've been added to our waitlist! We'll notify you when TripGenius launches.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;
