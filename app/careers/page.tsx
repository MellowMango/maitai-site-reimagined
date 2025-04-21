import React from 'react';

export default function CareersPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Join Our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're building the future of reliable AI. If you're passionate about cutting-edge technology and making a real impact, check out our open positions below.
          </p>
        </div>

        {/* Placeholder for Greenhouse Embed */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div id="grnhse_app">{/* Greenhouse embed script will target this div */}</div>
          <p className="mt-4 text-sm text-gray-500">
            Loading open positions...
          </p>
          {/* TODO: Add Greenhouse embed script here or via a script tag in layout/head */}
          {/* Example script (replace with actual Greenhouse provided script):
          <script src="https://boards.greenhouse.io/embed/job_board/js?for=YOUR_COMPANY_NAME"></script> 
          */}
        </div>
      </div>
    </div>
  );
}
