'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Configuration & Constants ---
const SHAPES = ['Circle', 'Square', 'Triangle', 'Star'] as const;
const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#6366F1']; // Red, Blue, Green, Orange, Indigo

type ShapeType = (typeof SHAPES)[number];
type ColorType = (typeof COLORS)[number];

interface GameItem {
  shape: ShapeType;
  color: ColorType;
}

const SEQUENCE_LENGTH = 4; // Number of visible items
const MAX_LEVELS = 10;

// --- SVG Shape Component ---
const ShapeSVG: React.FC<{ shape: ShapeType; color: ColorType }> = ({
  shape,
  color,
}) => {
  const size = 80;
  const viewBox = '0 0 100 100';
  let path = '';

  switch (shape) {
    case 'Circle':
      path = `<circle cx="50" cy="50" r="40" fill="${color}" />`;
      break;
    case 'Square':
      path = `<rect x="15" y="15" width="70" height="70" fill="${color}" />`;
      break;
    case 'Triangle':
      path = `<polygon points="50,10 90,85 10,85" fill="${color}" />`;
      break;
    case 'Star':
      path = `<polygon points="50,10 61,39 90,39 67,58 78,87 50,68 22,87 33,58 10,39 39,39" fill="${color}" />`;
      break;
  }

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
};

// --- Main Game Component ---
export default function SequenceSolverPage() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<GameItem[]>([]);
  const [choices, setChoices] = useState<GameItem[]>([]);
  const [correctNextItem, setCorrectNextItem] = useState<GameItem | null>(null);
  const [feedback, setFeedback] = useState<{
    text: string;
    color: string;
  } | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // --- Game Logic ---

  const generateSequence = () => {
    const patternType = Math.floor(Math.random() * 3);
    const shapeStart = Math.floor(Math.random() * SHAPES.length);
    const colorStart = Math.floor(Math.random() * COLORS.length);
    let newSequence: GameItem[] = [];
    let nextItem: GameItem | null = null;

    for (let i = 0; i <= SEQUENCE_LENGTH; i++) {
      let currentShape: ShapeType, currentColor: ColorType;

      if (patternType === 0) { // Color Cycles, Shape Stays
        currentShape = SHAPES[shapeStart];
        currentColor = COLORS[(colorStart + i) % COLORS.length];
      } else if (patternType === 1) { // Shape Cycles, Color Stays
        currentShape = SHAPES[(shapeStart + i) % SHAPES.length];
        currentColor = COLORS[colorStart];
      } else { // Both Cycle
        currentShape = SHAPES[(shapeStart + i) % SHAPES.length];
        currentColor = COLORS[(colorStart + 2 * i) % COLORS.length];
      }

      const item = { shape: currentShape, color: currentColor };
      if (i < SEQUENCE_LENGTH) {
        newSequence.push(item);
      } else {
        nextItem = item;
      }
    }
    return { newSequence, nextItem };
  };

  const generateDistractors = (correctItem: GameItem): GameItem[] => {
    const distractors: GameItem[] = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 20) {
      attempts++;
      const wrongShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const wrongColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const distractor = { shape: wrongShape, color: wrongColor };

      const isCorrect =
        distractor.shape === correctItem.shape &&
        distractor.color === correctItem.color;
      const isDuplicate = distractors.some(
        (d) => d.shape === distractor.shape && d.color === distractor.color
      );

      if (!isCorrect && !isDuplicate) {
        distractors.push(distractor);
      }
    }
    return distractors;
  };

  const shuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setupLevel = () => {
    setIsLocked(false);
    setFeedback(null);
    if (level > MAX_LEVELS) {
      return;
    }

    const { newSequence, nextItem } = generateSequence();
    if (nextItem) {
      const distractors = generateDistractors(nextItem);
      const allChoices = shuffle([nextItem, ...distractors]);
      setSequence(newSequence);
      setCorrectNextItem(nextItem);
      setChoices(allChoices);
    }
  };

  const handleChoice = (chosenItem: GameItem) => {
    if (isLocked) return;

    const isCorrect =
      chosenItem.shape === correctNextItem?.shape &&
      chosenItem.color === correctNextItem.color;
    setIsLocked(true);

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback({ text: 'Correct! Pattern solved.', color: 'text-green-600' });
      setTimeout(() => {
        setLevel((l) => l + 1);
        setupLevel();
      }, 1000);
    } else {
      setFeedback({ text: 'Incorrect. Analyze the sequence!', color: 'text-red-600' });
      setTimeout(() => {
        setupLevel();
      }, 2000);
    }
  };

  useEffect(() => {
    setupLevel();
  }, [level]);

  if (level > MAX_LEVELS) {
    return (
      <div className="w-full max-w-4xl bg-card shadow-2xl rounded-xl p-6 sm:p-10 text-center transition-all duration-300 mx-auto">
        <h1 className="text-3xl font-extrabold text-green-700">Congratulations!</h1>
        <p className="text-xl mt-4">You solved all {MAX_LEVELS} levels!</p>
        <p className="text-2xl mt-2">Final Score: {score}</p>
        <Button onClick={() => { setLevel(1); setScore(0); }} className="mt-8">Play Again</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-card shadow-2xl rounded-xl p-6 sm:p-10 text-center transition-all duration-300 mx-auto">
      <h1 className="text-4xl font-extrabold text-primary mb-2">Sequence Solver</h1>
      <p className="text-muted-foreground mb-6">
        What is the next shape and color in the pattern?
      </p>

      <div className="flex justify-around items-center mb-8 bg-muted p-4 rounded-xl shadow-inner">
        <div className="text-center">
          <span className="text-lg font-medium text-muted-foreground">Score:</span>
          <span className="text-3xl font-black text-green-600 ml-2">{score}</span>
        </div>
        <div className="text-center">
          <span className="text-lg font-medium text-muted-foreground">Level:</span>
          <span className="text-3xl font-black text-primary ml-2">{level}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 p-4 bg-muted/50 rounded-lg shadow-md min-h-[140px]">
        {sequence.map((item, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-4">
            <div className="w-24 h-24 p-2 bg-background rounded-lg shadow-sm border">
              <ShapeSVG shape={item.shape} color={item.color} />
            </div>
            <span className="text-4xl text-muted-foreground/50 font-light">&rarr;</span>
          </div>
        ))}
        <div className="w-24 h-24 p-2 bg-muted rounded-lg shadow-inner flex items-center justify-center">
          <span className="text-4xl font-black text-muted-foreground">?</span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-2xl font-semibold text-card-foreground mb-4">
          Select the 5th item:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {choices.map((item, index) => {
             const isCorrectChoice = item.shape === correctNextItem?.shape && item.color === correctNextItem?.color;
             const isChosen = feedback && feedback.text.startsWith('Incorrect') && isCorrectChoice;
            return (
              <button
                key={index}
                className={cn(
                  "w-32 h-32 p-2 bg-muted/30 rounded-xl shadow-md flex items-center justify-center border-4 border-transparent hover:scale-105 hover:shadow-lg transition-all",
                  isLocked && isCorrectChoice && "border-green-500 bg-green-100 ring-4 ring-green-400",
                  isLocked && !isCorrectChoice && "opacity-50"
                )}
                onClick={() => handleChoice(item)}
                disabled={isLocked}
              >
                <ShapeSVG shape={item.shape} color={item.color} />
              </button>
            )
          })}
        </div>
      </div>

      <div className={cn("h-10 text-xl font-bold", feedback?.color)}>
        {feedback?.text}
      </div>
    </div>
  );
}
