'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CareersPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to YC Job Page per sprint doc
    router.replace('https://www.ycombinator.com/companies/maitai/jobs');
  }, [router]);
  
  return (
    <div className="container mx-auto px-6 lg:px-8 py-20">
      <h1 className="text-2xl font-bold text-center">Redirecting to Maitai Careers...</h1>
      <p className="text-center mt-4">
        Please wait while we redirect you to our careers page.
      </p>
    </div>
  );
} 