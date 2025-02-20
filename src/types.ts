export interface User {
  id: string;
  name: string;
  email: string;
  doshaProfile: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  wellbeingScore: number;
}

export interface DailyCheck {
  id: string;
  userId: string;
  date: string;
  mood: number;
  energy: number;
  stress: number;
  sleep: number;
  notes?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'meditation' | 'yoga' | 'breathing' | 'exercise';
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  batch: string;
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

export interface Batch {
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

export interface AyurvedicRecommendation {
  id: string;
  category: 'yoga' | 'meditation' | 'diet' | 'lifestyle';
  sanskritName: string;
  englishName: string;
  description: string;
  benefits: string[];
  instructions?: string[];
  contraindications?: string[];
  metrics: {
    stress?: number;
    anxiety?: number;
    fear?: number;
    confusion?: number;
  };
  doshaEffect: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}