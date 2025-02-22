import { Input } from "@/components/ui/input";
import React from "react";

const ContactPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center px-4 py-6 space-y-4">
      {/* Header Section */}
      <section className="w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-2 text-gray-600">
          We’d love to hear from you! Please fill out the form below, and we'll
          get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Form */}
      <form className="flex flex-col gap-4 w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        {/* Name Input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="mt-1"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1"
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            className="mt-1"
          />
        </div>

        {/* Message Textarea */}
        <div className="flex flex-col">
          <label htmlFor="message" className="font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Write your message here..."
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
        >
          Send Message
        </button>
      </form>
    </main>
  );
};

export default ContactPage;
