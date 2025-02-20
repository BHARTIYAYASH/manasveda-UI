import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Brain,
  Search,
  Download,
  X,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Filter,
  FileDown,
  TrendingUp,
  TrendingDown,
  Activity,
  Frown,
  Lightbulb,
  CloudRain,
  Heart
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format, subDays } from 'date-fns';
import ResourcesSection from './Resources';

// Types
interface Student {
  id: string;
  name: string;
  rollNumber: string;
  stressLevel: 'low' | 'medium' | 'high';
  metrics: {
    stress: number;
    anxiety: number;
    fear: number;
    confusion: number;
    engagement: number;
  };
  trends: {
    date: string;
    stress: number;
    anxiety: number;
    engagement: number;
  }[];
  emotionalProfile: {
    name: string;
    value: number;
  }[];
}

interface Batch {
  id: string;
  name: string;
  studentCount: number;
  averageMetrics: {
    stress: number;
    anxiety: number;
    fear: number;
    confusion: number;
    engagement: number;
  };
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

// Mock Data
const mockBatches: Batch[] = [
  {
    id: '1',
    name: 'JEE Advanced 2025',
    studentCount: 120,
    averageMetrics: {
      stress: 65,
      anxiety: 58,
      fear: 45,
      confusion: 52,
      engagement: 78
    },
    riskDistribution: {
      low: 40,
      medium: 50,
      high: 30
    }
  },
  {
    id: '2',
    name: 'NEET 2025',
    studentCount: 150,
    averageMetrics: {
      stress: 70,
      anxiety: 62,
      fear: 48,
      confusion: 55,
      engagement: 75
    },
    riskDistribution: {
      low: 45,
      medium: 65,
      high: 40
    }
  }
];

const generateMockStudents = (batchId: string): Student[] => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: `${batchId}-${index + 1}`,
    name: `Student ${index + 1}`,
    rollNumber: `2025${batchId}${(index + 1).toString().padStart(3, '0')}`,
    stressLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
    metrics: {
      stress: 40 + Math.random() * 40,
      anxiety: 30 + Math.random() * 50,
      fear: 20 + Math.random() * 40,
      confusion: 25 + Math.random() * 45,
      engagement: 60 + Math.random() * 30
    },
    trends: Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      stress: 40 + Math.random() * 40,
      anxiety: 30 + Math.random() * 50,
      engagement: 60 + Math.random() * 30
    })),
    emotionalProfile: [
      { name: 'Stress', value: 40 + Math.random() * 40 },
      { name: 'Anxiety', value: 30 + Math.random() * 50 },
      { name: 'Fear', value: 20 + Math.random() * 40 },
      { name: 'Confusion', value: 25 + Math.random() * 45 },
      { name: 'Depression', value: 15 + Math.random() * 35 },
      { name: 'Anger', value: 20 + Math.random() * 30 }
    ]
  }));
};

const FacultyDashboard: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<Batch>(mockBatches[0]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [students] = useState<Student[]>(generateMockStudents(selectedBatch.id));
  const [timeRange, setTimeRange] = useState('week');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStressLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 70) return 'text-red-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const downloadReport = (studentId: string) => {
    console.log('Downloading report for student:', studentId);
    // Implement PDF generation and download logic
  };

  const pieChartData = [
    { name: 'Low Risk', value: selectedBatch.riskDistribution.low, color: '#22c55e' },
    { name: 'Medium Risk', value: selectedBatch.riskDistribution.medium, color: '#facc15' },
    { name: 'High Risk', value: selectedBatch.riskDistribution.high, color: '#ef4444' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary-500" />
              Mānasik Vātāvaran
            </h1>
            <p className="text-gray-600">
              Mental Health Dashboard for Faculty
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedBatch.id}
                onChange={(e) => setSelectedBatch(mockBatches.find(b => b.id === e.target.value) || mockBatches[0])}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {mockBatches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold">Total Students</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {selectedBatch.studentCount}
            </div>
            <div className="text-sm text-gray-500">
              Active in {selectedBatch.name}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold">Average Engagement</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {selectedBatch.averageMetrics.engagement}%
            </div>
            <div className="flex items-center gap-2 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>5% increase from last week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold">High Risk Students</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {selectedBatch.riskDistribution.high}
            </div>
            <div className="flex items-center gap-2 text-sm text-red-500">
              <TrendingUp className="h-4 w-4" />
              <span>Requires immediate attention</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-6 w-6 text-primary-500" />
              <h2 className="text-lg font-semibold">Average Stress Level</h2>
            </div>
            <div className="text-3xl font-bold mb-2">
              {selectedBatch.averageMetrics.stress}%
            </div>
            <div className="flex items-center gap-2 text-sm text-yellow-500">
              <TrendingDown className="h-4 w-4" />
              <span>2% decrease from last week</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary-500" />
                Batch Metrics Overview
              </h2>
              <button className="text-gray-500 hover:text-gray-700">
                <Download className="h-5 w-5" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Stress',
                      value: selectedBatch.averageMetrics.stress,
                      fill: '#ef4444'
                    },
                    {
                      name: 'Anxiety',
                      value: selectedBatch.averageMetrics.anxiety,
                      fill: '#f59e0b'
                    },
                    {
                      name: 'Fear',
                      value: selectedBatch.averageMetrics.fear,
                      fill: '#3b82f6'
                    },
                    {
                      name: 'Confusion',
                      value: selectedBatch.averageMetrics.confusion,
                      fill: '#8b5cf6'
                    }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary-500" />
                Risk Distribution
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {selectedBatch.riskDistribution.low}
                </div>
                <div className="text-sm text-green-600">Low Risk</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {selectedBatch.riskDistribution.medium}
                </div>
                <div className="text-sm text-yellow-600">Medium Risk</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {selectedBatch.riskDistribution.high}
                </div>
                <div className="text-sm text-red-600">High Risk</div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {
                      pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-6 w-6 text-primary-500" />
                Student List
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stress Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {student.rollNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStressLevelColor(student.stressLevel)}`}>
                        {student.stressLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getMetricColor(student.metrics.stress)}`}>
                        {student.metrics.stress.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getMetricColor(student.metrics.engagement)}`}>
                        {student.metrics.engagement.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => downloadReport(student.id)}
                        className="text-primary-600 hover:text-primary-900 flex items-center gap-2"
                      >
                        <FileDown className="h-5 w-5" />
                        Download Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-8">
          <ResourcesSection selectedBatch={selectedBatch} />
        </div>
      </motion.div>
    </div>
  );
};

export default FacultyDashboard;