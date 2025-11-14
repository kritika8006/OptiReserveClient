import React from "react";

export default function OOPConceptsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        OOPS Concepts Used in This Project
      </h1>

      <div className="max-w-5xl mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-lg">

        {/* Encapsulation */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Encapsulation</h2>
          <p className="text-gray-600 leading-relaxed">
            Encapsulation is used by wrapping data (state variables) and the functions (handlers)
            inside React components. For example, in <strong>LoginPage</strong>, the entered email
            and password are hidden inside the component and cannot be accessed directly from other
            pages. Only functions like <strong>handleLogin()</strong> can modify them.
          </p>
        </div>

        {/* Abstraction */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. Abstraction</h2>
          <p className="text-gray-600 leading-relaxed">
            Abstraction hides the internal logic of seat arrangement, booking,
            page switching, and updating data.  
            For example, <strong>AvailabilityPage</strong> shows seats visually, but the internal logic
            of splitting seats, assigning colors, or rendering rows is hidden from the user.
          </p>
        </div>

        {/* Inheritance */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. Inheritance</h2>
          <p className="text-gray-600 leading-relaxed">
            Although React does not use classical inheritance, it uses
            <strong> component reusability </strong> which is similar to inheritance.  
            Components like <strong>SeatBox</strong> (if created), Buttons, Cards, etc. can share
            styling and behavior.  
            Reusable components behave like “parent classes" whose features are inherited
            by children.
          </p>
        </div>

        {/* Polymorphism */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Polymorphism</h2>
          <p className="text-gray-600 leading-relaxed">
            Polymorphism appears in the way components behave differently
            depending on props. For example:
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Seat component</strong> changes color depending on the <strong>status</strong>.
              </li>
              <li>
                The <strong>App component</strong> renders different pages (Login, Availability, Booking)
                depending on the value of <code>page</code>.
              </li>
            </ul>
          </p>
        </div>

        {/* Classes / Objects (Conceptual) */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Objects & Classes (Conceptually)</h2>
          <p className="text-gray-600 leading-relaxed">
            Each React component behaves like a class.  
            <br />
            Every time a component is rendered, it acts like an object instance with its own:
            <ul className="list-disc ml-6 mt-2">
              <li>State</li>
              <li>Methods</li>
              <li>UI representation</li>
            </ul>
          </p>
        </div>

        {/* Data Structures as Objects */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">6. Data Models as Objects</h2>
          <p className="text-gray-600 leading-relaxed">
            Floors, seats, booking information, user credentials — all are stored as JavaScript
            objects. These objects behave like real-world entities (students, seats, floors).
          </p>
        </div>

        {/* Conclusion */}
        <div className="bg-blue-100 p-6 rounded-xl mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Conclusion</h2>
          <p className="text-gray-700">
            Even though React is not a classical OOP framework, your project has successfully used
            OOPS through concepts like encapsulation, abstraction, polymorphism, and component-based
            inheritance in a modern JavaScript way.
          </p>
        </div>
      </div>
    </div>
  );
}
