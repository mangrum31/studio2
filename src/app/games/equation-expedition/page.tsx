'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MAX_TIME = 30;
const MAX_NUMBER = 10;

export default function EquationExpeditionPage() {
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(MAX_TIME);
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [question, setQuestion] = useState('? + ?');
  const [gameRunning, setGameRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{
    text: string;
    color: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = useCallback(() => {
    const operatorIndex = Math.floor(Math.random() * 3);
    let num1 = Math.floor(Math.random() * MAX_NUMBER) + 1;
    let num2 = Math.floor(Math.random() * MAX_NUMBER) + 1;
    let questionString;
    let answer;

    if (operatorIndex === 0) {
      // Addition
      questionString = `${num1} + ${num2}`;
      answer = num1 + num2;
    } else if (operatorIndex === 1) {
      // Subtraction
      if (num1 < num2) [num1, num2] = [num2, num1]; // Swap
      questionString = `${num1} - ${num2}`;
      answer = num1 - num2;
    } else {
      // Multiplication
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      questionString = `${num1} × ${num2}`;
      answer = num1 * num2;
    }

    setQuestion(questionString);
    setCurrentAnswer(answer);
  }, []);

  const showFeedback = (text: string, color: string) => {
    setFeedback({ text, color });
    setTimeout(() => {
      setFeedback(null);
    }, 1500);
  };

  const endGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setGameRunning(false);
    setShowModal(true);
  }, []);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setGameRunning(true);
    setScore(0);
    setTimeRemaining(MAX_TIME);
    setInputValue('');
    setShowModal(false);
    inputRef.current?.focus();

    generateProblem();
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [generateProblem, endGame]);

  const checkAnswer = useCallback(() => {
    if (!gameRunning) return;

    const userAnswer = parseInt(inputValue, 10);
    if (isNaN(userAnswer)) return;

    if (userAnswer === currentAnswer) {
      setScore((prev) => prev + 1);
      showFeedback('Correct! +1 Point', 'text-green-600');
      generateProblem();
      setInputValue('');
    } else {
      showFeedback('Try again!', 'text-red-500');
    }
  }, [gameRunning, inputValue, currentAnswer, generateProblem]);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const getTimerColor = () => {
    if (timeRemaining <= 10) return 'text-red-500';
    if (timeRemaining <= 20) return 'text-yellow-500';
    return 'text-indigo-500';
  };

  return (
    <div className="relative w-full max-w-lg bg-card shadow-2xl rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
        Math Dash
      </h1>

      <div className="flex justify-between items-center mb-6 bg-muted/50 p-3 rounded-xl shadow-inner">
        <div className="flex flex-col items-start">
          <span className="text-base font-medium text-muted-foreground">Score:</span>
          <span id="score-display" className="text-3xl font-black text-green-600">
            {score}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base font-medium text-muted-foreground">Time:</span>
          <span
            id="timer-display"
            className={`text-3xl font-black transition-colors ${getTimerColor()}`}
          >
            {timeRemaining}
          </span>
        </div>
      </div>

      <div id="problem-area" className="mb-6">
        <p className="text-xl font-semibold text-card-foreground mb-3">
          Solve this problem:
        </p>
        <div
          id="question-display"
          className="text-5xl sm:text-6xl font-black text-foreground bg-primary/10 p-4 rounded-xl shadow-md"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      <div className="flex flex-col items-center mb-4">
        <Input
          ref={inputRef}
          type="number"
          id="answer-input"
          placeholder="Your Answer"
          className="w-full p-3 border-4 border-primary/70 rounded-xl text-2xl text-center font-bold focus:outline-none focus:border-primary transition duration-150"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          disabled={!gameRunning}
        />
        <div
          id="feedback-message"
          className={`h-6 mt-3 text-lg font-semibold ${feedback?.color || ''}`}
        >
          {feedback?.text}
        </div>
      </div>

      {!gameRunning && !showModal && (
        <Button
          id="start-btn"
          onClick={startGame}
          className="w-full py-3 h-auto px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-xl shadow-lg transition duration-200 transform hover:scale-[1.02]"
        >
          Start Game
        </Button>
      )}

      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-2xl">
          <div className="bg-card p-6 rounded-xl shadow-2xl text-center w-4/5 max-w-xs transform scale-100 transition-transform duration-300">
            <h2 className="text-3xl font-black text-red-600 mb-3">
              Time's Up!
            </h2>
            <p className="text-lg text-card-foreground mb-4">
              Your final score is:
            </p>
            <p
              id="final-score"
              className="text-5xl font-black text-green-500 mb-6"
            >
              {score}
            </p>
            <Button
              onClick={startGame}
              className="py-2 h-auto px-5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-base shadow-md transition"
            >
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>