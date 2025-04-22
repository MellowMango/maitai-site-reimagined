'use client';

import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DemoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DemoModal({ open, setOpen }: DemoModalProps) {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setSubmitError(null);
  };

  // Basic validation
  const validateForm = (): boolean => {
    const { firstName, lastName, email, company, role } = formData;
    if (!firstName || !lastName || !email || !company || !role) {
      setSubmitError('Please fill out all required fields.');
      return false;
    }
    // Super basic email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubmitError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null); // Clear previous errors

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    // TODO: Implement API call to /api/demo
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/failure
    const success = Math.random() > 0.2; // Simulate 80% success rate

    if (success) {
      console.log('Form submitted successfully:', formData);
      setSubmitSuccess(true);
      // Optional: Reset form after successful submission
      // setFormData({ firstName: '', lastName: '', email: '', company: '', role: '', message: '' });
      // Keep modal open to show success message, close after delay or manually
      setTimeout(() => {
        setOpen(false);
        // Reset state for next time modal opens
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsSubmitting(false);
          setFormData({ firstName: '', lastName: '', email: '', company: '', role: '', message: '' });
        }, 300); // Delay reset slightly after modal close animation
      }, 3000); // Close modal after 3 seconds
    } else {
      console.error('Form submission failed');
      setSubmitError('Submission failed. Please try again later.');
      setIsSubmitting(false);
    }
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {/* Close Button */}
                <div className="absolute right-0 top-0 pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-maitai-lagoon focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Conditional Content */}
                {isSubmitting ? (
                  <div className="py-12 text-center">
                    {/* Basic Loading Spinner */}
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-maitai-lagoon"></div>
                    <p className="mt-4 text-gray-600">Submitting...</p>
                  </div>
                ) : submitSuccess ? (
                  <div className="py-12 text-center">
                    <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-green-600">
                      Request Received!
                    </DialogTitle>
                    <p className="mt-2 text-sm text-gray-500">
                      Thank you for your interest. Our team will contact you shortly to schedule your demo.
                    </p>
                  </div>
                ) : (
                  // Form View
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                        Request a Demo
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Fill out the form below and our team will be in touch shortly.
                        </p>
                      </div>

                      {/* Form Fields */}
                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name *</label>
                            <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maitai-lagoon focus:ring-maitai-lagoon sm:text-sm" />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name *</label>
                            <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maitai-lagoon focus:ring-maitai-lagoon sm:text-sm" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Work Email *</label>
                          <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maitai-lagoon focus:ring-maitai-lagoon sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">Company Name *</label>
                          <input type="text" name="company" id="company" required value={formData.company} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maitai-lagoon focus:ring-maitai-lagoon sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Your Role *</label>
                          <input type="text" name="role" id="role" required value={formData.role} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maitai-lagoon focus:ring-maitai-lagoon sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message (Optional)</label>
                          <textarea name="message" id="message" rows={3} value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maitai-lagoon focus:ring-maitai-lagoon sm:text-sm"></textarea>
                        </div>

                        {/* Submission Error Message */}
                        {submitError && (
                          <p className="text-sm text-red-600">{submitError}</p>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full justify-center rounded-md bg-maitai-lagoon px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-maitai-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-lagoon disabled:opacity-50"
                          >
                            {isSubmitting ? 'Submitting...' : 'Request Demo'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
