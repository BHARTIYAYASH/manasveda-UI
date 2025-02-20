import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart as BarChartIcon,
  Users,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Download,
  Filter,
  Bell,
  Settings,
  Activity,
  Brain,
  Heart,
  Frown,
  Lightbulb,
  CloudRain,
  Building2,
  UserCircle2,
  Briefcase
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format } from 'date-fns';

// Enhanced data structures
interface TeamData {
  id: string;
  name: string;
  department: string;
  memberCount: number;
  averageStress: number;
  averageEngagement: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface EmotionalData {
  emotion: string;
  sanskrit: string;
  value: number;
  description: string;
}

const emotionsData: EmotionalData[] = [
  { emotion: 'Stress', sanskrit: 'Tanāv', value: 65, description: 'Work-related pressure' },
  { emotion: 'Anxiety', sanskrit: 'Chintā', value: 45, description: 'Future uncertainty' },
  { emotion: 'Jealousy', sanskrit: 'Abhyasuya', value: 30, description: 'Peer comparison' },
  { emotion: 'Fear', sanskrit: 'Bhaya', value: 40, description: 'Performance anxiety' },
  { emotion: 'Confusion', sanskrit: 'Moha', value: 55, description: 'Decision paralysis' },
  { emotion: 'Sadness', sanskrit: 'Soka', value: 35, description: 'Low motivation' }
];

const doshaDistribution = [
  { name: 'Vata', value: 35, color: '#818cf8' },
  { name: 'Pitta', value: 40, color: '#f87171' },
  { name: 'Kapha', value: 25, color: '#4ade80' }
];

const weeklyTrends = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return {
    date: format(date, 'EEE'),
    stress: 45 + Math.random() * 20,
    anxiety: 30 + Math.random() * 15,
    engagement: 65 + Math.random() * 25
  };
});

const teams: TeamData[] = [
  {
    id: 'T001',
    name: 'Engineering Team A',
    department: 'Technology',
    memberCount: 12,
    averageStress: 68,
    averageEngagement: 75,
    riskLevel: 'medium'
  },
  {
    id: 'T002',
    name: 'Sales Team',
    department: 'Business',
    memberCount: 8,
    averageStress: 72,
    averageEngagement: 82,
    riskLevel: 'high'
  },
  {
    id: 'T003',
    name: 'Design Team',
    department: 'Creative',
    memberCount: 6,
    averageStress: 45,
    averageEngagement: 90,
    riskLevel: 'low'
  }
];

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [department, setDepartment] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  const engagementScore = 78;

  const getTeamRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Manasik Vatavaran</h1>
          <p className="text-gray-600">
            Workplace Mental Wellness Analytics Dashboard
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-gray-500" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="creative">Creative</option>
            </select>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-6 w-6 text-primary-500" />
            <h2 className="text-lg font-semibold">Overall Wellness Score</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-gray-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - engagementScore / 100)}`}
                  className="text-primary-500"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-2xl font-bold">{engagementScore}</div>
                <div className="text-sm text-gray-500">out of 100</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">5% increase from last week</span>
              </div>
              <div className="text-sm text-gray-500">
                Based on multiple wellness factors
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold">Dosha Distribution</h2>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={doshaDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {doshaDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold">High-Risk Teams</h2>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {teams.filter(t => t.riskLevel === 'high').length} identified
            </span>
          </div>
          <div className="space-y-4">
            {teams.filter(team => team.riskLevel === 'high').map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{team.name}</div>
                  <div className="text-sm text-gray-500">{team.department}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTeamRiskColor(team.riskLevel)}`}>
                    {team.riskLevel.charAt(0).toUpperCase() + team.riskLevel.slice(1)} Risk
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">{team.averageStress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChartIcon className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold">Emotional Landscape</h2>
            </div>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={emotionsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="emotion" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Emotions"
                  dataKey="value"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold">Weekly Trends</h2>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#eab308"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500 rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold">Schedule Workshop</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Plan stress management sessions for high-risk teams
          </p>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Schedule Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <UserCircle2 className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold">Contact Counselor</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Connect with wellness professionals
          </p>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Reach Out
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold">View Resources</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Access wellness support materials
          </p>
          <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Browse Library
          </button>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500 rounded-lg">
              <CloudRain className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold">Crisis Support</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Immediate assistance for urgent situations
          </p>
          <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Get Help
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;