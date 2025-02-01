import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen  bg-gray-100">
      <header className="bg-primary text-white p-4">
        <h1 className="text-2xl font-semibold">Grocery Shop Dashboard</h1>
      </header>

      <main className="p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Sales Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700">Total Sales</h2>
            <p className="text-3xl font-bold text-green-500">$25,000</p>
          </div>

          {/* Inventory Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700">Inventory</h2>
            <p className="text-3xl font-bold text-blue-500">1500 Items</p>
          </div>

          {/* Pending Orders Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700">Pending Orders</h2>
            <p className="text-3xl font-bold text-yellow-500">23 Orders</p>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Sales */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700">Monthly Sales</h2>
            <div className="h-32 bg-gray-200 rounded-lg"></div> {/* Placeholder for chart */}
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700">Recent Orders</h2>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Order #123</span>
                <span className="text-gray-500">2 Items</span>
              </li>
              <li className="flex justify-between">
                <span>Order #124</span>
                <span className="text-gray-500">5 Items</span>
              </li>
              <li className="flex justify-between">
                <span>Order #125</span>
                <span className="text-gray-500">1 Item</span>
              </li>
            </ul>
          </div>

          {/* Low Stock */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700">Low Stock Items</h2>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Rice</span>
                <span className="text-red-500">10 Left</span>
              </li>
              <li className="flex justify-between">
                <span>Apples</span>
                <span className="text-red-500">5 Left</span>
              </li>
              <li className="flex justify-between">
                <span>Tomatoes</span>
                <span className="text-red-500">7 Left</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 text-gray-700 text-center p-4 mt-8">
        <p>&copy; 2025 Grocery Shop Admin Panel</p>
      </footer>
    </div>
  );
};

export default Dashboard;
