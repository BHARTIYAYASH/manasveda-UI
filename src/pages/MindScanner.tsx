import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Smile, 
  Battery, 
  Activity, 
  Moon,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';

interface CheckInData {
  mood: number;
  energy: number;
  stress: number;
  sleep: number;
  notes: string;
}

const MindScanner: React.FC = () => {
  const [step, setStep] = useState(1);
  const [checkInData, setCheckInData] = useState<CheckInData>({
    mood: 3,
    energy: 3,
    stress: 3,
    sleep: 3,
    notes: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting check-in data:', checkInData);
    // Here you would typically send the data to your backend
  };

  const renderScale = (
    value: number,
    onChange: (value: number) => void,
    icons: JSX.Element[]
  ) => (
    <div className="flex justify-between items-center gap-4 mt-4">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            value === num
              ? 'bg-primary-500 text-white scale-110'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {icons[num - 1]}
        </button>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Smile className="h-6 w-6 text-primary-500" />
              How are you feeling today?
            </h2>
            {renderScale(
              checkInData.mood,
              (value) => setCheckInData({ ...checkInData, mood: value }),
              [
                <Smile className="h-6 w-6 text-red-500" />,
                <Smile className="h-6 w-6 text-orange-500" />,
                <Smile className="h-6 w-6 text-yellow-500" />,
                <Smile className="h-6 w-6 text-green-500" />,
                <Smile className="h-6 w-6 text-emerald-500" />
              ]
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Battery className="h-6 w-6 text-primary-500" />
              How's your energy level?
            </h2>
            {renderScale(
              checkInData.energy,
              (value) => setCheckInData({ ...checkInData, energy: value }),
              [
                <Battery className="h-6 w-6" />,
                <Battery className="h-6 w-6" />,
                <Battery className="h-6 w-6" />,
                <Battery className="h-6 w-6" />,
                <Battery className="h-6 w-6" />
              ]
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary-500" />
              What's your stress level?
            </h2>
            {renderScale(
              checkInData.stress,
              (value) => setCheckInData({ ...checkInData, stress: value }),
              [
                <Activity className="h-6 w-6 text-emerald-500" />,
                <Activity className="h-6 w-6 text-green-500" />,
                <Activity className="h-6 w-6 text-yellow-500" />,
                <Activity className="h-6 w-6 text-orange-500" />,
                <Activity className="h-6 w-6 text-red-500" />
              ]
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Moon className="h-6 w-6 text-primary-500" />
              How well did you sleep?
            </h2>
            {renderScale(
              checkInData.sleep,
              (value) => setCheckInData({ ...checkInData, sleep: value }),
              [
                <Moon className="h-6 w-6 text-red-500" />,
                <Moon className="h-6 w-6 text-orange-500" />,
                <Moon className="h-6 w-6 text-yellow-500" />,
                <Moon className="h-6 w-6 text-green-500" />,
                <Moon className="h-6 w-6 text-emerald-500" />
              ]
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Any additional thoughts?</h2>
            <textarea
              value={checkInData.notes}
              onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
              className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Share your thoughts, feelings, or experiences..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <Brain className="h-8 w-8 text-primary-500" />
          <h1 className="text-3xl font-bold">Daily Mind Check-in</h1>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          {renderStepContent()}
        </motion.div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          {step === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Submit
              <Send className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index + 1 === step ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {step === totalSteps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-6 bg-secondary-50 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-secondary-700 mb-2">
            Today's Insight
          </h3>
          <p className="text-secondary-600">
            Based on your responses, we recommend taking a few moments for deep breathing exercises. 
            This can help balance your energy levels and reduce stress.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MindScanner;