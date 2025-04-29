"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";
import {
  GoogleReCaptchaProvider,
} from "@google-recaptcha/react";
import { useGoogleReCaptcha } from '@google-recaptcha/react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define the form schema using Zod
const SignUpFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  businessEmail: z.string().email({ message: "Please enter a valid email address." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  companySize: z.string().min(1, { message: "Please select a company size." }),
  whyMaitai: z.string().optional(),
});

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

// Re-define options here for independence
const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1,000 employees" },
  { value: "1001+", label: "1,001+ employees" },
];

// Main component content
function SignUpBannerContent() {
  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { executeV3 } = useGoogleReCaptcha();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessEmail: "",
      companyName: "",
      companySize: "",
      whyMaitai: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    if (!executeV3) {
      console.error("reCAPTCHA not ready");
      setFormMessage({ type: 'error', text: "reCAPTCHA not ready. Please try again." });
      return;
    }

    setFormMessage(null); // Clear previous messages

    startTransition(async () => {
      try {
        const token = await executeV3("signup_form");

        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptchaToken: token }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong.");
        }

        setFormMessage({ type: 'success', text: "Thanks for signing up! We'll be in touch." });
        form.reset(); // Reset form on success
        // Optionally use toast for success
        // toast.success("Thanks for signing up!");

      } catch (error) {
        console.error("Signup failed:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        setFormMessage({ type: 'error', text: `Signup failed: ${errorMessage}` });
         // Optionally use toast for error
        // toast.error(`Signup failed: ${errorMessage}`);
      }
    });
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Get Started with Maitai
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Ready to see how Maitai can help your team? Fill out the form below to get started or request a demo.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-w-3xl mx-auto items-start text-left"
          >
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-medium">First Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-0 rounded-md shadow-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-medium">Last Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-0 rounded-md shadow-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Business Email */}
            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-medium">Business Email *</FormLabel>
                  <FormControl>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-0 rounded-md shadow-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-medium">Company Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Corporation"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-0 rounded-md shadow-sm"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Company Size - Full width on mobile, half on md+ */}
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem className="md:col-span-2"> {/* Span full width on medium+ */}
                  <FormLabel className="text-gray-800 font-medium">Company Size *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 rounded-md shadow-sm data-[placeholder]:text-gray-500">
                        <SelectValue placeholder="Select company size..." />
                      </SelectTrigger>
                    </FormControl>
                    {/* Style SelectContent for dark bg? Provider is light here */}
                    <SelectContent className="bg-white border-gray-300 text-gray-900">
                      {companySizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="focus:bg-gray-100">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Why Maitai? - Full width */}
            <FormField
              control={form.control}
              name="whyMaitai"
              render={({ field }) => (
                <FormItem className="md:col-span-2"> {/* Span full width */}
                  <FormLabel className="text-gray-800 font-medium">Why Maitai? (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What pain point and/or initiative sparked your interest?"
                      className="resize-none bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-0 h-24 rounded-md shadow-sm"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button - Full width */}
            <div className="md:col-span-2 flex flex-col items-center"> {/* Center button container */}
              <Button
                type="submit"
                variant="secondary"
                className="w-full max-w-xs bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors px-8 py-3 h-auto border border-brand-50 mt-4"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>

               {/* Optional: Display general success/error message below button */}
                {formMessage && !isPending && (
                   <div className={`mt-4 text-sm flex items-center justify-center gap-2 px-3 py-2 rounded w-full max-w-md ${formMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                      {formMessage.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                      {formMessage.text}
                  </div>
                )}
            </div>

          </form>
        </Form>
      </div>
    </section>
  );
}


// Wrapper component providing the reCAPTCHA context
export default function SignUpBanner() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set in environment variables.");
    // Render a fallback or null if reCAPTCHA is essential and missing
    return (
        <div className="w-full bg-gradient-to-r from-brand-600 to-brand-700 py-16 md:py-20 text-white">
             <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                <p className="text-red-300">Signup form configuration error. Please contact support.</p>
             </div>
        </div>
    );
  }

  return (
    <GoogleReCaptchaProvider siteKey={siteKey} type="v3">
      <SignUpBannerContent />
    </GoogleReCaptchaProvider>
  );
}
