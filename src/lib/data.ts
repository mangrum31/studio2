import type { ChartConfig } from '@/components/ui/chart';

export const progressData = [
  { month: 'January', math: 18, vocabulary: 12, problemSolving: 10 },
  { month: 'February', math: 30, vocabulary: 15, problemSolving: 12 },
  { month: 'March', math: 45, vocabulary: 22, problemSolving: 20 },
  { month: 'April', math: 50, vocabulary: 28, problemSolving: 25 },
  { month: 'May', math: 62, vocabulary: 35, problemSolving: 30 },
  { month: 'June', math: 75, vocabulary: 40, problemSolving: 38 },
];

export const progressChartConfig = {
  math: {
    label: 'Math',
    color: 'hsl(var(--chart-1))',
  },
  vocabulary: {
    label: 'Vocabulary',
    color: 'hsl(var(--chart-2))',
  },
  problemSolving: {
    label: 'Problem Solving',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export const quests = [
  {
    id: 'quest-1',
    title: 'The Lost Treasure of Numera',
    description:
      'Solve math puzzles to uncover the hidden treasure of the ancient city of Numera.',
    image_id: '1',
    category: 'Math',
  },
  {
    id: 'quest-2',
    title: 'The Whispering Woods of Wordcraft',
    description:
      'Embark on a journey to lift the curse of silence by mastering new vocabulary.',
    image_id: '2',
    category: 'Vocabulary',
  },
  {
    id: 'quest-3',
    title: 'The Logic Labyrinth',
    description:
      "Navigate a maze of brain-teasers and logical challenges to find the labyrinth's center.",
    image_id: '3',
    category: 'Problem-Solving',
  },
  {
    id: 'quest-4',
    title: 'The Starfall Isles',
    description:
      'A new adventure awaits! Explore the isles and help the locals with their puzzles.',
    image_id: '4',
    category: 'Mixed Skills',
  },
];

export const games = [
  {
    id: 'game-1',
    title: 'Equation Expedition',
    description: 'Race against the clock to solve arithmetic problems.',
    skill: 'Math',
  },
  {
    id: 'game-2',
    title: 'Word Weavers',
    description: 'Create as many words as you can from a set of letters.',
    skill: 'Vocabulary',
  },
  {
    id: 'game-3',
    title: 'Pattern Detectives',
    description: 'Identify the next item in a sequence of shapes and colors.',
    skill: 'Problem-Solving',
  },
  {
    id: 'game-4',
    title: 'Rhythm Master',
    description: 'Follow the beat and repeat musical patterns.',
    skill: 'Memory',
  },
];
