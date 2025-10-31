import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StarfallIslesPage() {
  return (
    <div className="space-y-8">
      <header>
        <Button asChild variant="outline">
          <Link href="/quests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quests
          </Link>
        </Button>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">
            The Labyrinth's Escape Code Solution
          </CardTitle>
          <CardDescription>
            Here is the step-by-step path through the chambers to find the final
            code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold font-headline mb-2">
              Chamber 1: The Initial Riddle
            </h2>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              I am an ocean without water, a forest without trees, and a city
              without buildings. What am I?
            </blockquote>
            <p>
              <strong>Answer:</strong> A <strong>Map</strong>.
            </p>
            <p>
              <strong>First Key:</strong> The number of letters in "Map" is{' '}
              <span className="font-bold text-primary text-xl">3</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-headline mb-2">
              Chamber 2: The Logic Lock
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Start with your first key: <strong>3</strong>
              </li>
              <li>
                Multiply it by the number of days in a fortnight (14 days):{' '}
                <span className="font-mono">3 x 14 = 42</span>
              </li>
              <li>
                Subtract the number of months that have exactly 30 days (4):{' '}
                <span className="font-mono">42 - 4 = 38</span>
              </li>
              <li>
                Reduce to a single digit via Theosophical Reduction (digit
                summing):{' '}
                <span className="font-mono">3 + 8 = 11</span>, then{' '}
                <span className="font-mono">1 + 1 = 2</span>
              </li>
            </ul>
            <p className="mt-4">
              <strong>Second Key:</strong> The final single digit is{' '}
              <span className="font-bold text-primary text-xl">2</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-headline mb-2">
              🏆 The Labyrinth's Escape Code
            </h2>
            <p>
              Based on the logic puzzle that reduced the numbers down to a
              single digit, the final numeric code to escape the center is:
            </p>
            <div className="text-center my-4">
              <span className="text-6xl font-black text-green-600">2</span>
            </div>
            <p>
              If you seek the word that represents the center, the most fitting
              7-letter word is <strong className="text-accent">MYSTERY</strong>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
