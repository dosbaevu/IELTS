// pages/dashboard.jsx
import Link from 'next/link';

export default function Dashboard() {
  const modules = [
    { name: 'Listening', icon: '🎧', path: '/test/listening', desc: '4 Parts, 40 Questions' },
    { name: 'Reading', icon: '📖', path: '/test/reading', desc: '3 Passages, 40 Questions' },
    { name: 'Writing', icon: '✍️', path: '/test/writing', desc: 'Task 1 & Task 2' },
    { name: 'Speaking', icon: '🗣️', path: '/test/speaking', desc: 'Full 3-Part Simulation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Stats */}
        <header className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Practice Dashboard</h2>
            <p className="text-gray-500">Welcome back! Continue your preparation.</p>
          </div>
          <div className="text-right border-l pl-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Current Band</p>
            <p className="text-3xl font-bold text-blue-600">6.5</p>
          </div>
        </header>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <Link href={mod.path} key={mod.name}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex flex-col items-center text-center space-y-4 group">
                <span className="text-5xl group-hover:scale-110 transition-transform">{mod.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{mod.name}</h3>
                  <p className="text-sm text-gray-500">{mod.desc}</p>
                </div>
                <div className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium mt-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Start Practice
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
