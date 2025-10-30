'use client';

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BUTTON_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
];
const NOTES = ['C4', 'E4', 'G4', 'C5'] as const;
const FLASH_TIME = 150; // ms for visual flash

export default function RhythmMasterPage() {
  const [round, setRound] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    'Press Start to begin!'
  );
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isPlayingPattern, setIsPlayingPattern] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const synthRef = useRef<Tone.Synth | null>(null);

  async function initializeAudio() {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    if (!synthRef.current) {
      synthRef.current = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.2, release: 0.5 },
      }).toDestination();
    }
    return true;
  }

  function flashButton(index: number) {
    if (!synthRef.current) return;
    const note = NOTES[index];
    synthRef.current.triggerAttackRelease(note, '8n');

    setActiveButton(index);
    setTimeout(() => {
      setActiveButton(null);
    }, FLASH_TIME);
  }

  function playPattern(currentSequence: number[]) {
    setIsPlayingPattern(true);
    let time = Tone.now();
    currentSequence.forEach((stepIndex, i) => {
      Tone.Transport.scheduleOnce(() => {
        flashButton(stepIndex);
      }, time + i * 0.5);
    });

    Tone.Transport.scheduleOnce(() => {
      setIsPlayingPattern(false);
      setIsPlayerTurn(true);
      setStatusMessage('Your turn! Repeat the pattern.');
    }, time + currentSequence.length * 0.5 + 0.1);

    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }
  }

  function nextRound(currentSequence: number[]) {
    setPlayerSequence([]);
    setIsPlayerTurn(false);
    const newStep = Math.floor(Math.random() * 4);
    const newSequence = [...currentSequence, newStep];
    setSequence(newSequence);
    setRound((r) => r + 1);
    setStatusMessage(`Round ${round + 1}: Computer is playing...`);
    playPattern(newSequence);
  }

  async function startGame() {
    const audioReady = await initializeAudio();
    if (audioReady) {
      setIsGameRunning(true);
      setSequence([]);
      setRound(0);
      nextRound([]);
    }
  }

  function gameOver() {
    setStatusMessage(`Game Over! You reached Round ${round}.`);
    setIsGameRunning(false);
    setIsPlayerTurn(false);
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease('A2', '1n');
    }
  }

  function handlePlayerClick(index: number) {
    if (!isPlayerTurn || isPlayingPattern) return;

    flashButton(index);
    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    const currentMoveIndex = newPlayerSequence.length - 1;
    if (newPlayerSequence[currentMoveIndex] !== sequence[currentMoveIndex]) {
      gameOver();
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setIsPlayerTurn(false);
      setStatusMessage('Excellent! Getting harder...');
      setTimeout(() => nextRound(sequence), 1500);
    }
  }

  useEffect(() => {
    return () => {
      Tone.Transport.cancel();
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop();
      }
      synthRef.current?.dispose();
    };
  }, []);

  return (
    <div className="w-full max-w-lg bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-10 text-center transition-all duration-300 border-4 border-gray-700 mx-auto">
      <h1 className="text-4xl font-extrabold text-white mb-2">Rhythm Master</h1>
      <p
        className={cn(
          'text-lg mb-6',
          statusMessage.includes('Game Over')
            ? 'text-red-400'
            : 'text-gray-400'
        )}
      >
        {statusMessage}
      </p>

      <div className="flex justify-around items-center mb-8">
        <div className="text-center">
          <span className="text-xl font-medium text-gray-400">Round:</span>
          <span className="text-4xl font-black text-indigo-400 block">
            {round}
          </span>
        </div>
        <Button
          onClick={startGame}
          disabled={isGameRunning}
          className="py-3 h-auto px-8 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-full shadow-lg transition duration-200 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isGameRunning
            ? 'In Progress'
            : round > 0
            ? 'Play Again'
            : 'Start Game'}
        </Button>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 max-w-sm aspect-square mx-auto">
        {BUTTON_COLORS.map((color, index) => (
          <button
            key={index}
            onClick={() => handlePlayerClick(index)}
            disabled={!isPlayerTurn || isPlayingPattern}
            className={cn(
              'w-full h-full rounded-xl cursor-pointer transition-all duration-100 ease-out shadow-md opacity-75',
              color,
              {
                'hover:opacity-100 hover:scale-105 hover:shadow-lg':
                  isPlayerTurn,
                'opacity-100 scale-105 brightness-125':
                  activeButton === index,
              }
            )}
          />
        ))}
      </div>
    </div>
  );
}
