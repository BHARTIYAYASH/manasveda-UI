import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Scroll, Filter, Download, Cog as Yoga, Leaf, Sun, Moon, Wind, Coffee, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import type { AyurvedicRecommendation, Batch } from '../types';

const mockRecommendations: AyurvedicRecommendation[] = [
  {
    id: '1',
    category: 'yoga',
    sanskritName: 'शवासन',
    englishName: 'Shavasana (Corpse Pose)',
    description: 'A relaxation pose that calms the mind and reduces stress.',
    benefits: [
      'Reduces stress and anxiety',
      'Calms the nervous system',
      'Improves sleep quality'
    ],
    instructions: [
      'Lie flat on your back',
      'Arms relaxed by your sides',
      'Close your eyes and breathe naturally',
      'Hold for 5-10 minutes'
    ],
    metrics: {
      stress: -30,
      anxiety: -25
    },
    doshaEffect: {
      vata: -2,
      pitta: -2,
      kapha: 1
    }
  },
  {
    id: '2',
    category: 'meditation',
    sanskritName: 'अनुलोम विलोम',
    englishName: 'Anulom Vilom (Alternate Nostril Breathing)',
    description: 'A pranayama technique that balances the nervous system.',
    benefits: [
      'Reduces anxiety and stress',
      'Improves focus and concentration',
      'Balances the doshas'
    ],
    instructions: [
      'Sit in a comfortable position',
      'Close right nostril with thumb',
      'Inhale through left nostril',
      'Close left nostril, open right',
      'Exhale through right nostril'
    ],
    metrics: {
      anxiety: -35,
      stress: -20
    },
    doshaEffect: {
      vata: -2,
      pitta: -2,
      kapha: -1
    }
  },
  {
    id: '3',
    category: 'diet',
    sanskritName: 'सात्त्विक आहार',
    englishName: 'Sattvic Diet',
    description: 'Pure, wholesome foods that promote mental clarity and calmness.',
    benefits: [
      'Enhances mental clarity',
      'Reduces stress and anxiety',
      'Improves overall well-being'
    ],
    instructions: [
      'Include fresh fruits and vegetables',
      'Whole grains and legumes',
      'Avoid processed foods',
      'Eat mindfully and at regular times'
    ],
    metrics: {
      stress: -15,
      confusion: -20
    },
    doshaEffect: {
      vata: -1,
      pitta: -2,
      kapha: -1
    }
  },
  {
    id: '4',
    category: 'lifestyle',
    sanskritName: 'ब्रह्म मुहूर्त',
    englishName: 'Brahma Muhurta (Early Morning Routine)',
    description: 'Waking up during the auspicious morning hours for enhanced learning and mental clarity.',
    benefits: [
      'Improves learning capacity',
      'Enhances mental clarity',
      'Reduces stress levels'
    ],
    instructions: [
      'Wake up 96 minutes before sunrise',
      'Practice meditation or yoga',
      'Study during these hours',
      'Maintain consistency'
    ],
    metrics: {
      confusion: -25,
      stress: -15
    },
    doshaEffect: {
      vata: -1,
      pitta: 1,
      kapha: -2
    }
  }
];

interface ResourcesSectionProps {
  selectedBatch: Batch;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ selectedBatch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'yoga':
        return <Yoga className="h-5 w-5" />;
      case 'meditation':
        return <Wind className="h-5 w-5" />;
      case 'diet':
        return <Leaf className="h-5 w-5" />;
      case 'lifestyle':
        return <Sun className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const filteredRecommendations = useMemo(() => {
    let recommendations = [...mockRecommendations];

    // Filter by category if selected
    if (selectedCategory !== 'all') {
      recommendations = recommendations.filter(r => r.category === selectedCategory);
    }

    // Sort by relevance based on batch metrics
    recommendations.sort((a, b) => {
      const aRelevance = Object.entries(a.metrics).reduce((sum, [metric, value]) => {
        const batchValue = selectedBatch.averageMetrics[metric as keyof typeof selectedBatch.averageMetrics];
        return sum + (batchValue ? Math.abs(value!) : 0);
      }, 0);

      const bRelevance = Object.entries(b.metrics).reduce((sum, [metric, value]) => {
        const batchValue = selectedBatch.averageMetrics[metric as keyof typeof selectedBatch.averageMetrics];
        return sum + (batchValue ? Math.abs(value!) : 0);
      }, 0);

      return bRelevance - aRelevance;
    });

    return recommendations;
  }, [selectedCategory, selectedBatch]);

  const downloadRecommendations = () => {
    // Implement PDF generation and download logic
    console.log('Downloading recommendations...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scroll className="h-6 w-6 text-primary-500" />
          <h2 className="text-xl font-semibold">Ayurvedic Recommendations</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="yoga">Yoga</option>
              <option value="meditation">Meditation</option>
              <option value="diet">Diet</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>
          <button
            onClick={downloadRecommendations}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecommendations.map((recommendation) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-100 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(recommendation.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  recommendation.category === 'yoga' ? 'bg-blue-50 text-blue-500' :
                  recommendation.category === 'meditation' ? 'bg-purple-50 text-purple-500' :
                  recommendation.category === 'diet' ? 'bg-green-50 text-green-500' :
                  'bg-orange-50 text-orange-500'
                }`}>
                  {getCategoryIcon(recommendation.category)}
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    {recommendation.sanskritName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {recommendation.englishName}
                  </p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                {expandedItems.includes(recommendation.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {expandedItems.includes(recommendation.id) && (
              <div className="px-4 pb-4">
                <p className="text-gray-600 mb-4">
                  {recommendation.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {recommendation.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {recommendation.instructions && (
                    <div>
                      <h4 className="font-medium mb-2">Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {recommendation.instructions.map((instruction, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium mb-2">Dosha Effects:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">Vata</div>
                      <div className={`text-sm ${recommendation.doshaEffect.vata < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {recommendation.doshaEffect.vata > 0 ? '+' : ''}{recommendation.doshaEffect.vata}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">Pitta</div>
                      <div className={`text-sm ${recommendation.doshaEffect.pitta < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {recommendation.doshaEffect.pitta > 0 ? '+' : ''}{recommendation.doshaEffect.pitta}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">Kapha</div>
                      <div className={`text-sm ${recommendation.doshaEffect.kapha < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {recommendation.doshaEffect.kapha > 0 ? '+' : ''}{recommendation.doshaEffect.kapha}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourcesSection;