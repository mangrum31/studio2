'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Core Game Data ---
const ALL_LETTERS =
  'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ';
const LETTERS_COUNT = 7;
const MIN_WORD_LENGTH = 3;

// For this example, we use a small, fast list.
const VALID_WORDS = new Set([
  'CAT', 'ACT', 'CAR', 'RAT', 'ART', 'TAR', 'SAT', 'STAR', 'CART', 'TRAC',
  'CASE', 'ACE', 'SEE', 'EAT', 'TEA', 'ATE', 'SET', 'REST', 'EAST', 'SEAT',
  'TEST', 'RATE', 'MEET', 'TEAM', 'MATE', 'META', 'TAME', 'RATTED', 'METER',
  'TREE', 'MERCURY', 'YES', 'TRY', 'CRY', 'YOUR', 'YARD', 'RAD', 'DAY',
  'DRAY', 'DARK', 'DOCK', 'COAT', 'CODE', 'CROW', 'RAGE', 'GAME', 'MAN',
  'RACE', 'READ', 'DEAR', 'RADE', 'RATTLED', 'TRAM', 'MAR', 'ARM', 'RUM',
  'MUTT', 'UTTER', 'TERRA', 'FACE', 'ICE', 'FINE', 'FIND', 'FADE', 'DART',
  'TRADE', 'MATTER', 'TREAT', 'TEAR', 'RAIN', 'RANT', 'NICE', 'DINE',
]);

export default function WordWeaversPage() {
  const [currentLetters, setCurrentLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const generateLetters = useCallback(() => {
    const letters: string[] = [];
    for (let i = 0; i < LETTERS_COUNT; i++) {
      const randomIndex = Math.floor(Math.random() * ALL_LETTERS.length);
      letters.push(ALL_LETTERS[randomIndex]);
    }
    return letters;
  }, []);

  const showMessage = (text: string, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const canFormWord = useCallback((word: string) => {
    const letters = [...currentLetters];
    const wordChars = word.split('');

    for (const char of wordChars) {
      const index = letters.indexOf(char);
      if (index === -1) {
        return false;
      }
      letters.splice(index, 1);
    }
    return true;
  }, [currentLetters]);

  const calculateScore = (word: string) => {
    const len = word.length;
    if (len === 3) return 1;
    if (len === 4) return 2;
    if (len === 5) return 3;
    if (len === 6) return 4;
    if (len >= 7) return 6;
    return 0;
  };

  const handleSubmit = useCallback(() => {
    const rawWord = inputValue.trim().toUpperCase();
    setInputValue('');

    if (rawWord.length < MIN_WORD_LENGTH) {
      showMessage(
        `Word must be at least ${MIN_WORD_LENGTH} letters long.`,
        'error'
      );
      return;
    }

    if (!canFormWord(rawWord)) {
      showMessage('The word uses letters not available in the scramble!', 'error');
      return;
    }

    if (foundWords.has(rawWord)) {
      showMessage('Word already found!', 'info');
      return;
    }

    if (!VALID_WORDS.has(rawWord)) {
      showMessage('Not a valid word in our dictionary.', 'error');
      return;
    }

    const newFoundWords = new Set(foundWords);
    newFoundWords.add(rawWord);
    setFoundWords(newFoundWords);

    const points = calculateScore(rawWord);
    setScore(score + points);

    showMessage(`+${points} points! Word added: ${rawWord}`, 'success');
  }, [inputValue, canFormWord, foundWords, score]);

  const initGame = useCallback(() => {
    setCurrentLetters(generateLetters());
    setFoundWords(new Set());
    setScore(0);
    setInputValue('');
    showMessage('New scramble generated! Good luck!', 'info');
    inputRef.current?.focus();
  }, [generateLetters]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const sortedWords = Array.from(foundWords).sort();

  const getMessageColor = () => {
    if (!message) return '';
    switch (message.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  return (
    <>
      <style jsx global>{`
        .letter-tile {
          width: 3.5rem; height: 3.5rem; line-height: 3.5rem; font-size: 1.5rem;
        }
        @media (min-width: 640px) {
          .letter-tile {
            width: 4rem; height: 4rem; line-height: 4rem; font-size: 1.75rem;
          }
        }
        #found-words::-webkit-scrollbar { width: 6px; }
        #found-words::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 3px; }
      `}</style>
      <div className="w-full max-w-4xl bg-card shadow-2xl rounded-xl p-4 sm:p-8 transition-all duration-300 mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2 text-center">
          Word Scramble Challenge
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Create as many words as you can using only the letters below.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center bg-primary/10 p-4 rounded-lg mb-6 gap-4">
          <div className="text-xl font-semibold text-primary">
            Score:{' '}
            <span id="score" className="text-2xl font-extrabold ml-1">
              {score}
            </span>
          </div>
          <Button
            onClick={initGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-150 transform hover:scale-105 w-full sm:w-auto"
          >
            New Scramble
          </Button>
        </div>

        <div
          id="letter-display"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
        >
          {currentLetters.map((letter, i) => (
            <div
              key={i}
              className="letter-tile font-bold bg-yellow-300 text-yellow-900 rounded-lg flex items-center justify-center border-b-4 border-yellow-500 shadow-md transition-transform hover:translate-y-[-2px]"
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type your word here..."
            className="flex-grow p-4 border-2 border-primary/50 rounded-xl text-lg sm:text-xl font-medium focus:outline-none focus:border-primary transition duration-150 uppercase"
            maxLength={10}
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition duration-150 transform hover:scale-105"
          >
            Submit Word
          </Button>
        </div>

        <div
          className={`h-8 text-center text-base sm:text-lg font-semibold mb-6 ${getMessageColor()}`}
        >
          {message?.text}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-muted/50 p-4 rounded-lg border border-border">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
              Words Found (<span>{foundWords.size}</span>)
            </h2>
            <div
              id="found-words"
              className="h-48 sm:h-64 overflow-y-auto p-2 bg-background rounded border border-dashed border-border"
            >
              {foundWords.size === 0 ? (
                <p className="text-muted-foreground italic text-center pt-2">
                  No words submitted yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sortedWords.map((word) => (
                    <span
                      key={word}
                      className="inline-block bg-primary/10 text-primary-foreground/80 text-xs sm:text-sm font-medium px-2 py-1 rounded-full shadow-sm"
                    >
                      {word} ({word.length})
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-1 bg-muted/50 p-4 rounded-lg border border-border">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
              Scoring
            </h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-sm sm:text-base">
              <li>3 letters: 1 point</li>
              <li>4 letters: 2 points</li>
              <li>5 letters: 3 points</li>
              <li>6 letters: 4 points</li>
              <li>7+ letters: 6 points</li>
            </ul>
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
              Words must be 3 letters or longer.
            </p>
          