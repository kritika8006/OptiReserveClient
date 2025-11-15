import React from "react";

export default function OOPConceptsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8 sm:mb-12">
        OOPS Concepts Used in This Project
      </h1>

      {/* Main container */}
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">

        {/* Encapsulation */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            1. Encapsulation
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Encapsulation is used by wrapping data (state variables) and the functions inside React
            components. For example, in <strong>LoginPage</strong>, the entered name and roll number
            are hidden inside the component. Only functions like <strong>handleLogin()</strong> can modify them.
          </p>
        </section>

        {/* Abstraction */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            2. Abstraction
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Abstraction hides the internal logic of seat arrangement, booking,
            page switching, and updating data.  
            For example, <strong>AvailabilityPage</strong> shows seats visually, but the internal logic
            of splitting seats or assigning colors is hidden from the user.
          </p>
        </section>

        {/* Inheritance */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            3. Inheritance
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            React does not use classical inheritance, but it uses <strong>component reusability</strong>.
            Reusable components behave like parent classes whose features are reused (similar to inheritance).
          </p>
        </section>

        {/* Polymorphism */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            4. Polymorphism
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Polymorphism appears when components behave differently depending on props.
          </p>

          <ul className="list-disc ml-5 mt-2 text-gray-600 text-sm sm:text-base space-y-1">
            <li>
              <strong>Seat component</strong> changes color based on <strong>status</strong>.
            </li>
            <li>
              <strong>App component</strong> renders different pages depending on <strong>page</strong>.
            </li>
          </ul>
        </section>

        {/* Classes / Objects */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            5. Objects & Classes (Conceptually)
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Every React component behaves like a class. Each render acts like an object instance with:
          </p>

          <ul className="list-disc ml-5 mt-2 text-gray-600 text-sm sm:text-base space-y-1">
            <li>State</li>
            <li>Methods</li>
            <li>UI representation</li>
          </ul>
        </section>

        {/* Data models */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            6. Data Models as Objects
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Floors, seats, and booking information are stored as JavaScript objects,
            representing real-world entities.
          </p>
        </section>

        {/* Conclusion box */}
        <section className="bg-blue-100 p-5 sm:p-6 rounded-xl mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">
            Conclusion
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Even though React is not a classical OOP framework, our project uses OOPS concepts
            like encapsulation, abstraction, polymorphism, and component-based reusability
            effectively in a modern JavaScript structure.
          </p>
        </section>
      </div>
    </div>
  );
}
