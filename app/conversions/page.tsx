import React from 'react'

const ConversionsPage = () => {
  return (
    <section className="w-full px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-gray-600 mb-6">
        This is a responsive Next.js app with a flexible layout.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example items */}
        <div className="bg-white p-4 rounded shadow">Card 1</div>
        <div className="bg-white p-4 rounded shadow">Card 2</div>
        <div className="bg-white p-4 rounded shadow">Card 3</div>
      </div>
    </section>
  )
}

export default ConversionsPage