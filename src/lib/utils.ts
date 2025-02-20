import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const quotes = [
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Health is the greatest gift, contentment the greatest wealth.",
    author: "Buddha"
  },
  {
    text: "Yoga is the journey of the self, through the self, to the self.",
    author: "Bhagavad Gita"
  },
  {
    text: "When you own your breath, nobody can steal your peace.",
    author: "Ancient Proverb"
  }
];