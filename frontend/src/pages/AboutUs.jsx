import React from 'react';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20 text-gray-800 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-700">About ShivShaktiStore</h1>

        <p className="text-lg mb-4">
          Welcome to <span className="font-semibold text-green-700">ShivShaktiStore</span> — your trusted destination for quality products at the best prices.
          Our goal is to make shopping simple, affordable, and accessible to everyone.
        </p>

        <p className="text-lg mb-4">
          We offer a wide range of products including electronics, fashion, home goods, groceries, and more.
          Each item is carefully selected to ensure it meets our high standards for quality and value.
        </p>

        <p className="text-lg mb-4">
          What makes us different? We're not just an online store — we're a community.
          We care about our customers and focus on providing:
        </p>

        <ul className="list-disc list-inside mb-4 text-lg space-y-2">
          <li>Fast & reliable delivery</li>
          <li>Easy returns and secure payments</li>
          <li>24/7 customer support</li>
          <li>Exclusive deals and discounts</li>
        </ul>

        <p className="text-lg">
          Join thousands of happy customers who trust us every day. Thank you for choosing <span className="font-semibold text-green-700">ShivShaktiStore</span>.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
