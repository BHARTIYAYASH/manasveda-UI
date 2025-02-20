import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Wind,
  Activity,
  Brain,
  Calendar,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const mockUser = {
    name: 'Sarah',
    doshaProfile: {
      vata: 40,
      pitta: 30,
      kapha: 30
    },
    wellbeingScore: 85,
    dailyQuote: "Peace comes from within. Do not seek it without.",
    nextActivity: "10-minute Mindful Meditation",
    upcomingEvents: [
      { title: "Group Meditation", time: "2:00 PM" },
      { title: "Yoga Session", time: "4:30 PM" }
    ]
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">
          Namaste, {mockUser.name}
        </h1>
        <p className="text-primary-100 text-lg">
          "{mockUser.dailyQuote}"
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary-500" />
            Dosha Balance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-purple-500" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vata</span>
                  <span className="text-sm text-gray-500">{mockUser.doshaProfile.vata}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${mockUser.doshaProfile.vata}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pitta</span>
                  <span className="text-sm text-gray-500">{mockUser.doshaProfile.pitta}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${mockUser.doshaProfile.pitta}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Kapha</span>
                  <span className="text-sm text-gray-500">{mockUser.doshaProfile.kapha}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${mockUser.doshaProfile.kapha}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary-500" />
            Well-being Score
          </h2>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-100"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-primary-500"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 56}`,
                    strokeDashoffset: `${2 * Math.PI * 56 * (1 - mockUser.wellbeingScore / 100)}`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%'
                  }}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-900">
                {mockUser.wellbeingScore}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-500" />
            Today's Schedule
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-primary-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <p className="font-medium">{mockUser.nextActivity}</p>
                <p className="text-sm text-gray-500">Next up in 15 minutes</p>
              </div>
            </div>
            {mockUser.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="font-medium">{event.title}</span>
                <span className="text-sm text-gray-500">{event.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;