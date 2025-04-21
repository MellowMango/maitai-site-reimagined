'use client';

import React from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DemoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DemoModal({ open, setOpen }: DemoModalProps) {
  // TODO: Implement form state and submission logic
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for form submission to /api/demo
    console.log('Form submitted'); 
    // Show thank you message / close modal
    setOpen(false); // Close modal on submit for now
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-50" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Modal Overlay */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* Wrap DialogPanel in a div to fix type issue */}
              <div>
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  {/* Close Button */}
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-maitai-rum focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  {/* Modal Content */}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Get a Demo
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Fill out the form below to schedule a demo with our team.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maitai-rum sm:text-sm sm:leading-6"
                          placeholder="Jane Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maitai-rum sm:text-sm sm:leading-6"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                     <div>
                      <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                        Company
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="company"
                          id="company"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maitai-rum sm:text-sm sm:leading-6"
                          placeholder="Your Company Inc."
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="use-case" className="block text-sm font-medium leading-6 text-gray-900">
                        Use Case
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows={4}
                          name="use-case"
                          id="use-case"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maitai-rum sm:text-sm sm:leading-6"
                          placeholder="Tell us how you plan to use Maitai..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-maitai-rum px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>

                </DialogPanel>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
