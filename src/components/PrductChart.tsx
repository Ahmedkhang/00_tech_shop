"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

interface SalesData { month: string; total: number; }
interface StatusData { status: string; count: number; }
interface ProductData { title: string; revenue: number; }

export default function SalesCharts({
  salesByDate,
  ordersByStatus,
  topProducts
}: {
  salesByDate: SalesData[];
  ordersByStatus: StatusData[];
  topProducts: ProductData[];
}) {

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window?.innerWidth < 768 ? 1.5 : 2,
    plugins: { 
      legend: { 
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: window?.innerWidth < 768 ? 10 : 12
          }
        }
      },
      tooltip: {
        titleFont: {
          size: window?.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window?.innerWidth < 768 ? 11 : 13
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: window?.innerWidth < 768 ? 10 : 12
          },
          maxRotation: window?.innerWidth < 768 ? 45 : 0
        }
      },
      y: {
        ticks: {
          font: {
            size: window?.innerWidth < 768 ? 10 : 12
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window?.innerWidth < 768 ? 1 : 1.5,
    plugins: { 
      legend: { 
        position: window?.innerWidth < 768 ? 'bottom' as const : 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: window?.innerWidth < 768 ? 10 : 12
          }
        }
      },
      tooltip: {
        titleFont: {
          size: window?.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window?.innerWidth < 768 ? 11 : 13
        }
      }
    }
  };

  const salesChartData = {
    labels: salesByDate.map(d => d.month),
    datasets: [{ 
      label: 'Total Sales ($)', 
      data: salesByDate.map(d => d.total), 
      borderColor: '#2a71d0', 
      backgroundColor: 'rgba(42, 113, 208, 0.2)', 
      fill: true,
      tension: 0.4
    }]
  };

  const statusChartData = {
    labels: ordersByStatus.map(d => d.status),
    datasets: [{ 
      label: 'Order Count', 
      data: ordersByStatus.map(d => d.count), 
      backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0', '#ff6b6b', '#17A8F5'], 
      borderColor: '#000', 
      borderWidth: 1 
    }]
  };

  const productChartData = {
    labels: topProducts.map(d => d.title),
    datasets: [{ 
      label: 'Revenue ($)', 
      data: topProducts.map(d => d.revenue), 
      backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0', '#ff6b6b', '#17A8F5'], 
      borderColor: '#000', 
      borderWidth: 1 
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Sales Dashboard</h1>
            <div className="flex items-center gap-3">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <SignedIn>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Sales Analytics</h2>
            <p className="text-sm text-gray-600">Overview of your sales performance and metrics</p>
          </div>
          
          {salesByDate.length === 0 && ordersByStatus.length === 0 && topProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500 text-lg">No sales data available.</p>
              <p className="text-gray-400 text-sm mt-2">Data will appear here once you have sales activity.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Sales by Month Chart */}
              {salesByDate.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Sales by Month</h3>
                    <p className="text-sm text-gray-600 mt-1">Monthly sales trend overview</p>
                  </div>
                  <div className="relative h-64 sm:h-80">
                    <Line data={salesChartData} options={chartOptions} />
                  </div>
                </div>
              )}
              
              {/* Orders by Status Chart */}
              {ordersByStatus.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Orders by Status</h3>
                    <p className="text-sm text-gray-600 mt-1">Distribution of order statuses</p>
                  </div>
                  <div className="relative h-64 sm:h-80">
                    <Bar data={statusChartData} options={chartOptions} />
                  </div>
                </div>
              )}
              
              {/* Top Products Chart */}
              {topProducts.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top 5 Products by Revenue</h3>
                    <p className="text-sm text-gray-600 mt-1">Best performing products in terms of revenue</p>
                  </div>
                  <div className="relative" style={{ height: window?.innerWidth < 768 ? '300px' : '400px' }}>
                    <Pie data={productChartData} options={pieChartOptions} />
                  </div>
                </div>
              )}
            </div>
          )}
        </SignedIn>
        
        <SignedOut>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
              <p className="text-red-500 mb-6">Please sign in to view sales analytics and dashboard data.</p>
              <SignInButton mode="modal">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}