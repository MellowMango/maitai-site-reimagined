'use client'; // For modal state

import React, { useState } from 'react';
import DemoModal from '../components/DemoModal'; // Import the modal

export default function ApiDemoPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">See Maitai in Action</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ready to experience robust, fast, and cost-effective AI inference? Schedule a personalized demo with our team today and see how Maitai can transform your applications.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setDemoModalOpen(true)} // Trigger modal
                className="rounded-md bg-maitai-rum px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
              >
                Request Your Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the modal, controlled by local state */}
      <DemoModal open={demoModalOpen} setOpen={setDemoModalOpen} />
    </>
  );
}
