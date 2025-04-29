import { NextResponse } from 'next/server';
import { z } from 'zod';

// Simple schema for the incoming request body
const SignupRequestSchema = z.object({
  // Match the fields from the SignUpBanner form
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  businessEmail: z.string().email(),
  companyName: z.string().min(1),
  companySize: z.string().min(1),
  whyMaitai: z.string().optional(),
  recaptchaToken: z.string(),
});

// Basic reCAPTCHA verification function (replace with actual implementation if available)
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
    // In a real app, you might want to throw an error or return false based on policy
    // For this placeholder, we'll allow requests to proceed if the key is missing,
    // but log a warning. Return false if you want to block signups without a key.
    return true; // Or false, depending on desired behavior when key is missing
  }

  // This is where you'd make the actual call to Google's verify endpoint
  // Example using fetch:
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`,
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`reCAPTCHA verification request failed: ${response.status} ${errorText}`);
        return false;
    }

    const data = await response.json();
    console.log('reCAPTCHA verification response:', data);

    // Check for success and potentially score threshold (for v3)
    // Adjust this logic based on your reCAPTCHA version and security needs
    return data.success === true; // Basic check for v2/v3 success

  } catch (error) {
    console.error('Error verifying reCAPTCHA token:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = SignupRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Destructure all validated fields
    const { 
      firstName,
      lastName,
      businessEmail,
      companyName,
      companySize,
      whyMaitai,
      recaptchaToken 
    } = validationResult.data;

    // Verify reCAPTCHA token
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      console.warn(`reCAPTCHA validation failed for email: ${businessEmail}`);
      return NextResponse.json({ message: 'reCAPTCHA validation failed.' }, { status: 403 }); // 403 Forbidden
    }

    // --- Placeholder Logic --- 
    // In a real application, you would add the email to your database,
    // mailing list (e.g., Mailchimp, SendGrid lists), or CRM here.
    console.log(`Placeholder: Signup request received for:`, {
      firstName,
      lastName,
      businessEmail,
      companyName,
      companySize,
      whyMaitai: whyMaitai || 'N/A',
    });
    // -------------------------

    // Return success response
    return NextResponse.json({ message: 'Signup successful!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing signup request:', error);
    // Generic error for unexpected issues
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 