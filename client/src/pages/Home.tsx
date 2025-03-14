import NavBar from "@/components/NavBar";
import TripForm from "@/components/TripForm";
import FeatureCard from "@/components/FeatureCard";
import DestinationCard from "@/components/DestinationCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Zap, MessageSquare, Users, Clock, Map, Heart } from "lucide-react";

const Home = () => {
  // Featured destinations data
  const destinations = [
    {
      imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "Paris, France",
      description: "Romance, culture, and cuisine"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "Bali, Indonesia",
      description: "Tropical paradise and spiritual retreats"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "New York, USA",
      description: "Urban adventure in the city that never sleeps"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "Costa Rica",
      description: "Adventure and eco-tourism paradise"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "Tokyo, Japan",
      description: "Blend of tradition and futuristic technology"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      title: "Santorini, Greece",
      description: "Stunning views and Mediterranean charm"
    }
  ];

  // Feature cards data
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Planning",
      description: "Get a complete trip itinerary in seconds, not hours. No more endless research."
    },
    {
      icon: MessageSquare,
      title: "Personalized Recommendations",
      description: "AI tailors suggestions based on your preferences, budget, and travel style."
    },
    {
      icon: Users,
      title: "Group Friendly",
      description: "Plan for solo trips, couples, or large groups with diverse interests."
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      name: "Sarah J.",
      text: "\"TripGenius made planning our family vacation to Italy so easy! The AI created a perfect balance of sightseeing, relaxation, and kid-friendly activities.\""
    },
    {
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      name: "Michael T.",
      text: "\"As a solo traveler on a budget, I was amazed at how TripGenius found hidden gems and affordable experiences that made my trip to Thailand unforgettable.\""
    },
    {
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      name: "Jessica L.",
      text: "\"Planning our honeymoon was stressful until we found TripGenius. The AI created the perfect romantic itinerary with both adventure and luxury experiences.\""
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does TripGenius generate itineraries?",
      answer: "Our AI combines data from millions of travelers, local insights, and travel expertise to create personalized itineraries based on your preferences, budget, and travel style."
    },
    {
      question: "When will TripGenius launch?",
      answer: "We're currently in final beta testing and expect to launch in the next 2-3 months. Join our waitlist to be among the first to get access!"
    },
    {
      question: "Is TripGenius free to use?",
      answer: "TripGenius will offer both free and premium plans. Free users can generate basic itineraries, while premium subscribers get additional features like offline access, priority support, and more detailed recommendations."
    },
    {
      question: "Can I book directly through TripGenius?",
      answer: "While we don't currently offer direct booking, we provide links to trusted booking platforms for each recommendation in your itinerary. We're working on adding direct booking in future updates."
    }
  ];

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
            alt="Scenic mountain landscape with lake" 
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            data-aos="fade-down" 
            data-aos-delay="100"
          >
            Your Dream Trip, <span className="text-gradient bg-gradient-to-r from-amber-400 to-pink-500">AI Planned</span>
          </h1>
          <p 
            className="mt-6 mx-auto max-w-3xl text-xl text-gray-300"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            Stop spending hours planning your vacation. Let our AI craft the perfect personalized itinerary in seconds.
          </p>
          <div 
            className="mt-10 flex justify-center"
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            <div className="space-y-4 sm:space-y-0 sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <a href="#trip-planner">
                <Button className="flex w-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 shadow-lg transform transition-all duration-300 hover:-translate-y-1">
                  Try it free
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" className="flex w-full text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-70 border-gray-700">
                  Learn more
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 
              className="text-base font-semibold text-primary uppercase tracking-wide"
              data-aos="fade-up"
              data-aos-delay="100"
            >Features</h2>
            <p 
              className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Why choose TripGenius?
            </p>
            <p 
              className="max-w-xl mt-5 mx-auto text-xl text-gray-500"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Our AI-powered platform creates custom itineraries tailored to your preferences.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Destinations Section */}
      <div id="destinations" className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">Popular Destinations</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Get inspired for your next journey
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Explore these stunning destinations with personalized itineraries from TripGenius.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => (
              <DestinationCard 
                key={index}
                imageUrl={destination.imageUrl}
                title={destination.title}
                description={destination.description}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Trip Planner Section */}
      <div id="trip-planner" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">AI Trip Planner</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Try our waitlist demo
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Experience the power of AI trip planning before we launch. Join our waitlist for early access.
            </p>
          </div>

          <div className="mt-12">
            <TripForm />
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div id="how-it-works" className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">How It Works</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Simple steps to your perfect trip
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Our AI handles the complex planning so you can focus on enjoying your journey.
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold shadow-md">1</div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-medium text-gray-900">Tell us your preferences</h3>
                <p className="mt-3 text-base text-gray-500">
                  Enter your destination, budget, trip type, and other details to help our AI understand what you're looking for.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold shadow-md">2</div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-medium text-gray-900">Our AI creates your itinerary</h3>
                <p className="mt-3 text-base text-gray-500">
                  Within seconds, our advanced AI analyzes thousands of options to create a personalized day-by-day plan.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold shadow-md">3</div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-medium text-gray-900">Save, share, and enjoy!</h3>
                <p className="mt-3 text-base text-gray-500">
                  Download your itinerary, share it with travel companions, and make the most of your perfectly planned vacation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div id="testimonials" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">Testimonials</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              What our beta testers say
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Join these happy travelers on our waitlist for early access.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  avatarUrl={testimonial.avatarUrl}
                  name={testimonial.name}
                  text={testimonial.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">FAQ</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Frequently asked questions
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Everything you need to know about TripGenius before joining our waitlist.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-gray-900 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-500 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform how you travel?</span>
            <span className="block text-amber-400">Join our waitlist today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#trip-planner">
                <Button className="bg-white text-primary hover:bg-gray-50">
                  Get Started
                </Button>
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#how-it-works">
                <Button variant="outline" className="text-white bg-primary border-white bg-opacity-60 hover:bg-opacity-70">
                  Learn more
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Blog</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Jobs</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Press</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact</a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 TripGenius, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
