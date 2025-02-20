import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Flame,
  Leaf,
  Wind,
  Timer,
  Award,
  ChevronLeft,
  Volume2,
  VolumeX,
  Coins
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  sanskritName: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  options: string[];
  type: 'mcq' | 'flashcard' | 'body' | 'tracking';
  image?: string;
}

interface Answer {
  questionId: string;
  answer: string;
  changeCount?: number;
}

const rooms: Room[] = [
  {
    id: 'vichar',
    name: 'Thought Room',
    sanskritName: 'विचार कक्ष',
    icon: <Brain className="h-6 w-6" />,
    description: 'Explore your decision-making patterns through real-life scenarios',
    color: 'indigo',
    questions: [
      {
        id: 'v1',
        text: 'When faced with a difficult decision, you typically:',
        type: 'flashcard',
        options: [
          'Take immediate action based on instinct',
          'Analyze all possible outcomes thoroughly',
          'Seek advice from others before deciding',
          'Postpone the decision until absolutely necessary'
        ]
      },
      // Add more questions
    ]
  },
  {
    id: 'agni',
    name: 'Fire Room',
    sanskritName: 'अग्नि कक्ष',
    icon: <Flame className="h-6 w-6" />,
    description: 'Test your stress response and emotional resilience',
    color: 'red',
    questions: [
      {
        id: 'a1',
        text: 'Under pressure, you tend to:',
        type: 'mcq',
        options: [
          'Feel energized and focused',
          'Become anxious and overwhelmed',
          'Get irritable and impatient',
          'Withdraw and seek solitude'
        ]
      },
      // Add more questions
    ]
  },
  {
    id: 'sharir',
    name: 'Body Room',
    sanskritName: 'शरीर कक्ष',
    icon: <Leaf className="h-6 w-6" />,
    description: 'Understand your physical constitution and tendencies',
    color: 'green',
    questions: [
      {
        id: 's1',
        text: 'How would you describe your typical energy levels throughout the day?',
        type: 'body',
        options: [
          'Variable and unpredictable',
          'Sharp and intense',
          'Steady and sustained',
          'Slow to start but long-lasting'
        ]
      },
      // Add more questions
    ]
  },
  {
    id: 'chanchal',
    name: 'Unstable Room',
    sanskritName: 'चंचल कक्ष',
    icon: <Wind className="h-6 w-6" />,
    description: 'Explore patterns of uncertainty and mental fluctuations',
    color: 'purple',
    questions: [
      {
        id: 'c1',
        text: 'When making choices, how often do you second-guess yourself?',
        type: 'tracking',
        options: [
          'Rarely - I trust my initial instincts',
          'Sometimes - only for important decisions',
          'Often - I like to consider all angles',
          'Very often - I frequently change my mind'
        ]
      },
      // Add more questions
    ]
  }
];

const Activities: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'rooms' | 'question' | 'results'>('welcome');
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [coins, setCoins] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [completedRooms, setCompletedRooms] = useState<string[]>([]);

  // Sound effects
  const [playEnter] = useSound('/sounds/enter.mp3', { volume: 0.5 });
  const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.5 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.3 });

  const handleSoundToggle = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleStartJourney = () => {
    if (isSoundEnabled) playEnter();
    setCurrentScreen('rooms');
  };

  const handleRoomSelect = (room: Room) => {
    if (isSoundEnabled) playClick();
    setCurrentRoom(room);
    setCurrentScreen('question');
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (answer: string) => {
    if (isSoundEnabled) playClick();
    
    setAnswers([
      ...answers,
      {
        questionId: currentRoom!.questions[currentQuestionIndex].id,
        answer,
        changeCount: 0
      }
    ]);

    if (currentQuestionIndex < currentRoom!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (isSoundEnabled) playSuccess();
      setCoins(coins + 25);
      setCompletedRooms([...completedRooms, currentRoom!.id]);
      setCurrentScreen('rooms');
      setCurrentRoom(null);
      setCurrentQuestionIndex(0);
    }
  };

  const calculateDoshaProfile = () => {
    // Implement dosha calculation logic based on answers
    return {
      vata: 40,
      pitta: 35,
      kapha: 25
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Sparkles className="h-8 w-8 text-primary-500" />
            <h1 className="text-3xl font-bold">Prashna</h1>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              {isSoundEnabled ? (
                <Volume2 className="h-6 w-6 text-gray-600" />
              ) : (
                <VolumeX className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{coins}</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-4">
                  Welcome to Prashna
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  A Journey Within to Discover Your True Nature
                </p>
                <button
                  onClick={handleStartJourney}
                  className="px-8 py-4 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  Begin Your Journey
                  <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {currentScreen === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleRoomSelect(room)}
                    disabled={completedRooms.includes(room.id)}
                    className={`w-full p-6 rounded-xl text-left transition-all transform hover:scale-105 ${
                      completedRooms.includes(room.id)
                        ? 'bg-gray-100 cursor-not-allowed'
                        : `bg-${room.color}-50 hover:bg-${room.color}-100`
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-${room.color}-100 flex items-center justify-center mb-4`}>
                      {room.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">
                      {room.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {room.sanskritName}
                    </p>
                    <p className="text-gray-600">
                      {room.description}
                    </p>
                    {completedRooms.includes(room.id) && (
                      <div className="flex items-center gap-2 mt-4 text-green-500">
                        <Award className="h-5 w-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {currentScreen === 'question' && currentRoom && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-8">
                <button
                  onClick={() => setCurrentScreen('rooms')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                  <h3 className="text-xl font-semibold">{currentRoom.name}</h3>
                  <p className="text-sm text-gray-500">{currentRoom.sanskritName}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {currentRoom.questions.length}
                  </span>
                </div>
                <h4 className="text-lg font-medium mb-6">
                  {currentRoom.questions[currentQuestionIndex].text}
                </h4>
                <div className="space-y-4">
                  {currentRoom.questions[currentQuestionIndex].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {completedRooms.length === rooms.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold mb-6">Your Dosha Profile</h3>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {Object.entries(calculateDoshaProfile()).map(([dosha, value]) => (
                <div key={dosha} className="text-center">
                  <div className="text-2xl font-bold mb-2">{value}%</div>
                  <div className="text-gray-500 capitalize">{dosha}</div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Explore Your Personalized Wellness Plan
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Activities;

