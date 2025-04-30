"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useTransition } from "react";
// import { GoogleReCaptchaProvider } from "@google-recaptcha/react";
// import { useGoogleReCaptcha } from '@google-recaptcha/react';

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
import { motion } from "framer-motion"; // Import motion

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

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 } // Stagger children slightly
  }
};

const underlineVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 1.5, ease: 'linear' }
  }
};

// New Variants for SVG path drawing
const svgLineVariants = {
  hidden: { pathLength: 0 },
  visible: { 
    pathLength: 1, 
    transition: { duration: 1.5, ease: 'linear' } // Reading speed
  }
};

// Main component content
function SignUpBannerContent() {
  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // const { executeV3 } = useGoogleReCaptcha(); // Temporarily comment out

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
    // if (!executeV3) { // Temporarily comment out reCAPTCHA check
    //   console.error("reCAPTCHA not ready");
    //   setFormMessage({ type: 'error', text: "reCAPTCHA not ready. Please try again." });
    //   return;
    // }

    setFormMessage(null); 

    startTransition(async () => {
      try {
        // const token = await executeV3("signup_form"); // Temporarily comment out token generation

        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ ...data, recaptchaToken: token }), // Temporarily remove token
          body: JSON.stringify({ ...data }), 
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
    // Wrap section with motion, apply variants and gradient
    <motion.section 
      // Apply subtle Mint Cream -> Light Purple gradient
      className="w-full py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-[#F2FBF9] to-[#ECE6F3]" // Added gradient, relative, overflow
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger slightly earlier
    >
      {/* Radial Animation Overlay */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,theme('colors.maitai.lagoon')/15_0%,transparent_60%)]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2] // Subtle opacity pulse
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10"> {/* Ensure content is above overlay */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          variants={sectionVariants} // Inherit fade-in from parent
        >
          Get Started with Maitai
        </motion.h2>
        
        {/* Wrapper for subheading - motion.div no longer strictly needed for animation trigger */}
        <div 
          className="relative inline-block mb-8"
          // Remove motion props if not needed for other children animations
        > 
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto pb-1 bg-gradient-to-r from-maitai-lagoon to-maitai-lagoon bg-no-repeat bg-left-bottom bg-[length:0%_2px]" // Added background gradient underline styles
            variants={sectionVariants} // Keep fade-in from section
            // Add direct whileInView and transition for backgroundSize animation
            whileInView={{ backgroundSize: "100% 2px" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.5, ease: 'linear', delay: 0.2 }}
          >
            Ready to see how Maitai can help your team? Fill out the form below to get started or request a demo.
          </motion.p>
          
          {/* Remove the SVG underline */}
          {/* <svg ...> ... </svg> */}

        </div>

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
            </div>

          </form>
        </Form>

        {/* Form Message Display */}
         {formMessage && (
           <motion.div 
             className={`mt-6 p-3 rounded-md text-center text-sm font-medium ${formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0 }}
           >
             {formMessage.type === 'success' ? <CheckCircle className="inline-block mr-2 h-5 w-5" /> : <AlertTriangle className="inline-block mr-2 h-5 w-5" />}
             {formMessage.text}
           </motion.div>
         )}
      </div>
    </motion.section>
  );
}

// Temporarily export SignUpBannerContent directly
export default SignUpBannerContent;

/* // Temporarily commented out Provider Wrapper
export default function SignUpBanner() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    console.warn("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
    return <SignUpBannerContent />;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey} language="en">
      <SignUpBannerContent />
    </GoogleReCaptchaProvider>
  );
}
*/
