'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Info } from "lucide-react"; // For checklist icon and Info icon
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Added Tooltip components
import { useCallback } from 'react'; // Import useCallback
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from '@google-recaptcha/react';

// Define Zod schema based on actively.ai screenshot
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  businessEmail: z.string().email({ message: "Please enter a valid email address." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  companySize: z.string().min(1, { message: "Please select a company size." }), // Assuming value is string ID
  whyMaitai: z.string().optional(), // Optional textarea
});

type FormData = z.infer<typeof formSchema>;

// Placeholder options for Select components
const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1,000 employees" },
  { value: "1001+", label: "1,001+ employees" },
];

// --- Form Component --- 
// Extracted the form logic into a separate component to use the hook
function DemoForm() {
  const { executeV3 } = useGoogleReCaptcha();

  // 1. Define form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessEmail: "",
      companyName: "",
      companySize: "",
      whyMaitai: "",
    },
  });

  // 2. Define a submit handler using useCallback
  const onSubmit = useCallback(async (values: FormData) => {
    if (!executeV3) {
      console.error("Execute reCAPTCHA v3 not yet available");
      // TODO: Handle error state - maybe show a message to the user?
      return;
    }

    try {
      const token = await executeV3('demo_submit');
      console.log('reCAPTCHA token:', token);

      // TODO: Send data (values + token) to API route /api/demo
      console.log("Form Submitted with reCAPTCHA:", { ...values, recaptchaToken: token });

      // TODO: Show success message/state
      // form.reset(); // Optionally reset form on success

    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      // TODO: Handle error state
    }

  }, [executeV3, form]); // Add form to dependency array if using form.reset()

  return (
    <div className="bg-maitai-vampire-black text-white p-8 md:p-10 rounded-lg shadow-xl">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
        See Maitai in Action
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields (adjusted label/input styles for dark bg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Reduced gap */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="bg-gray-800 border-gray-700 text-white focus:border-maitai-lime focus:ring-maitai-lime" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="bg-gray-800 border-gray-700 text-white focus:border-maitai-lime focus:ring-maitai-lime" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Business Email *</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@company.com" {...field} className="bg-gray-800 border-gray-700 text-white focus:border-maitai-lime focus:ring-maitai-lime" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corporation" {...field} className="bg-gray-800 border-gray-700 text-white focus:border-maitai-lime focus:ring-maitai-lime" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Reduced gap */}
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Company Size *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-maitai-lime focus:ring-maitai-lime">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {companySizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="focus:bg-maitai-lime/20">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="whyMaitai"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Why Maitai? (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What pain point and/or initiative sparked your interest in Maitai?"
                    className="resize-none bg-gray-800 border-gray-700 text-white focus:border-maitai-lime focus:ring-maitai-lime"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Tell us a bit about your use case or what you hope to achieve.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-maitai-lime hover:bg-maitai-lime/90 text-maitai-vampire-black" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Request a Demo'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

// --- Main Page Component --- 
export default function DemoPage() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.error("Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set in environment variables.");
    // Optionally render an error message or fallback UI
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-bold">Configuration Error: reCAPTCHA site key is missing.</p>
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider
      siteKey={recaptchaSiteKey}
      type="v3"
    >
      <TooltipProvider>
        {/* Main container for the page section */}
        <div className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
              {/* Left Column: Content/Proof */}
              <div className="space-y-8 pt-4 lg:pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-maitai-vampire-black leading-tight">
                  Generate revenue, efficiently
                </h1>
                <p className="text-lg text-gray-700">
                  Maitai helps you identify, engage, and win high-impact deals by applying custom AI reasoning that delivers account strategies to maximize quality pipeline and conversion.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-maitai-lime flex-shrink-0" />
                    Custom AI model for your business
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-maitai-lime flex-shrink-0" />
                    Deep reasoning engine that continuously improves
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-maitai-lime flex-shrink-0" />
                    Integrates with your stack (e.g., Salesforce, Gong)
                  </li>
                </ul>
                {/* Customer Logos Placeholder */}
                <div className="pt-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                    DRIVING EFFICIENT PIPELINE GROWTH FOR TOP REVENUE TEAMS
                  </p>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-400">
                    {/* Replace with actual next/image logos */}
                    <span className="font-medium text-lg">[Logo 1]</span>
                    <span className="font-medium text-lg">[Logo 2]</span>
                    <span className="font-medium text-lg">[Logo 3]</span>
                    <span className="font-medium text-lg">[Logo 4]</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Component */}
              <DemoForm /> 

            </div>
          </div>
        </div>
      </TooltipProvider>
    </GoogleReCaptchaProvider>
  );
} 