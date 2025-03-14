import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripFormValues, tripFormSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import TripItinerary from "./TripItinerary";

interface TripFormProps {
  className?: string;
}

const TripForm: React.FC<TripFormProps> = ({ className }) => {
  const [showResults, setShowResults] = useState<boolean>(false);
  const [itineraryData, setItineraryData] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      destination: "",
      budget: 1000,
      tripType: "",
      days: 7,
      adults: 2,
      children: 0,
      email: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TripFormValues) => {
      const response = await apiRequest("POST", "/api/trip-plan", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setItineraryData(data.itinerary);
        setShowResults(true);
        toast({
          title: "Success!",
          description: "You've been added to our waitlist and we've generated your itinerary.",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to generate itinerary",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate itinerary",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: TripFormValues) => {
    mutate(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Dream Trip</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="Where do you want to go?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <div className="relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <Input 
                        type="number" 
                        placeholder="1000" 
                        min={100}
                        className="pl-7" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value))} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tripType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a trip type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="relaxation">Relaxation</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="food">Food & Cuisine</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Days</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="7" 
                      min={1} 
                      max={30} 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Companions</FormLabel>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>
                      <p className="block text-xs text-gray-500">Adults</p>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2" 
                          min={1} 
                          max={20} 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                    </div>
                    <div>
                      <p className="block text-xs text-gray-500">Children</p>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          min={0} 
                          max={10} 
                          {...form.register("children", {
                            valueAsNumber: true,
                          })} 
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address (for waitlist)</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full py-6" 
                disabled={isPending}
              >
                {isPending ? "Generating..." : "Generate Itinerary & Join Waitlist"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <div className="px-6 py-10 sm:px-10 lg:p-10">
        {!showResults && !isPending && (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Your Trip Itinerary</h3>
            <p className="mt-2 text-gray-500">
              Fill out the form to see your AI-generated itinerary and join our waitlist.
            </p>
          </div>
        )}
        
        {isPending && (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-6 text-lg font-medium text-gray-900">Creating your perfect trip...</p>
            <p className="mt-2 text-gray-500">Our AI is crafting a personalized itinerary just for you.</p>
          </div>
        )}
        
        {showResults && itineraryData && (
          <TripItinerary 
            itinerary={itineraryData} 
            tripDetails={{
              destination: form.getValues("destination"),
              tripType: form.getValues("tripType"),
              days: form.getValues("days"),
              budget: form.getValues("budget")
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TripForm;
