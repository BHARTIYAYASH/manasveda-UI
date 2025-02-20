import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookHeart, 
  Play, 
  Pause, 
  Heart,
  Filter,
  Volume2,
  Clock,
  Tag
} from 'lucide-react';

interface Mantra {
  id: string;
  title: string;
  sanskrit: string;
  translation: string;
  description: string;
  duration: number;
  category: 'peace' | 'healing' | 'strength' | 'wisdom' | 'abundance';
  audioUrl: string;
  benefits: string[];
  image: string;
}

const mantras: Mantra[] = [
  {
    id: '1',
    title: 'Om Shanti',
    sanskrit: 'ॐ शान्ति',
    translation: 'Om Peace',
    description: 'A powerful mantra for inner peace and tranquility, helping to calm the mind and reduce anxiety.',
    duration: 5,
    category: 'peace',
    audioUrl: 'https://example.com/om-shanti.mp3', // This would be replaced with actual audio URL
    benefits: [
      'Reduces stress and anxiety',
      'Promotes inner peace',
      'Enhances mental clarity'
    ],
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '2',
    title: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः',
    translation: 'Om, Earth, Air, Heaven',
    description: 'One of the most sacred mantras in Hinduism, known for its powerful healing and transformative properties.',
    duration: 8,
    category: 'healing',
    audioUrl: 'https://example.com/gayatri.mp3',
    benefits: [
      'Spiritual enlightenment',
      'Mental purification',
      'Enhanced consciousness'
    ],
    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '3',
    title: 'Om Namah Shivaya',
    sanskrit: 'ॐ नमः शिवाय',
    translation: 'I bow to Shiva',
    description: 'A powerful mantra for transformation and inner strength, helping to overcome obstacles.',
    duration: 6,
    category: 'strength',
    audioUrl: 'https://example.com/shiva.mp3',
    benefits: [
      'Builds inner strength',
      'Removes obstacles',
      'Promotes self-awareness'
    ],
    image: 'https://images.unsplash.com/photo-1609859682889-3b08ad06f7c5?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '4',
    title: 'Om Gam Ganapataye',
    sanskrit: 'ॐ गं गणपतये',
    translation: 'Om, Salutations to Ganesha',
    description: 'A mantra dedicated to Ganesha, the remover of obstacles and patron of wisdom and learning.',
    duration: 7,
    category: 'wisdom',
    audioUrl: 'https://example.com/ganesha.mp3',
    benefits: [
      'Removes obstacles',
      'Enhances wisdom',
      'Brings success'
    ],
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=400&h=300'
  }
];

const MantraVault: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [playingMantra, setPlayingMantra] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMantras = mantras.filter(mantra => {
    const categoryMatch = selectedCategory === 'all' || mantra.category === selectedCategory;
    const searchMatch = 
      mantra.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mantra.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mantra.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const toggleFavorite = (mantraId: string) => {
    setFavorites(prev => 
      prev.includes(mantraId)
        ? prev.filter(id => id !== mantraId)
        : [...prev, mantraId]
    );
  };

  const togglePlay = (mantraId: string) => {
    setPlayingMantra(playingMantra === mantraId ? null : mantraId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookHeart className="h-8 w-8 text-primary-500" />
          Mantra Vault
        </h1>
        <p className="text-gray-600">
          Discover sacred mantras for meditation and spiritual growth.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search mantras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="peace">Peace</option>
            <option value="healing">Healing</option>
            <option value="strength">Strength</option>
            <option value="wisdom">Wisdom</option>
            <option value="abundance">Abundance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMantras.map((mantra) => (
          <motion.div
            key={mantra.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src={mantra.image}
                alt={mantra.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleFavorite(mantra.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(mantra.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium text-gray-500 capitalize">
                  {mantra.category}
                </span>
                <span className="ml-auto flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{mantra.duration}m</span>
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{mantra.title}</h3>
              <p className="text-lg font-medium text-primary-600 mb-2">{mantra.sanskrit}</p>
              <p className="text-sm text-gray-500 italic mb-3">{mantra.translation}</p>
              <p className="text-gray-600 mb-4">{mantra.description}</p>
              
              <div className="space-y-2 mb-4">
                {mantra.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">Sanskrit Audio</span>
                </div>
                <button
                  onClick={() => togglePlay(mantra.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {playingMantra === mantra.id ? (
                    <>
                      <Pause className="h-5 w-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Play
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MantraVault;