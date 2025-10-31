import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, BookOpen, Key, Puzzle } from 'lucide-react';
import Link from 'next/link';

export default function StarfallIslesPage() {
  return (
    <div className="space-y-8">
      <header>
        <Button asChild variant="outline">
          <Link href="/quests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Quests
          </Link>
        </Button>
      </header>
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/30 p-4 md:p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold font-headline text-primary">
            The Starfall Isles: A Hero's Guide
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            A complete walkthrough for navigating the legendary Labyrinth of
            Whispers.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold font-headline mb-3 flex items-center">
              <BookOpen className="mr-3 h-6 w-6 text-accent" />
              The Legend Begins
            </h2>
            <p className="text-foreground/80">
              Welcome, adventurer, to the Starfall Isles—a land of floating
              islands, ancient ruins, and starlit skies. At the heart of the
              isles lies the greatest challenge of all: the Labyrinth of
              Whispers. Built by an ancient civilization to protect its most
              profound secrets, the labyrinth is a series of interconnected
              chambers, each guarded by a clever puzzle. Only by solving them
              in order can one uncover the final Escape Code. This guide holds
              the key.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl md:text-2xl font-bold font-headline mb-4 flex items-center">
              <Puzzle className="mr-3 h-6 w-6 text-accent" />
              The Path Through the Chambers
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-background rounded-lg border">
                <h3 className="text-lg md:text-xl font-semibold font-headline mb-2 flex items-center">
                  <Key className="mr-2 h-5 w-5 text-primary/80" />
                  Chamber 1: The Initial Riddle
                </h3>
                <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
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
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="text-lg md:text-xl font-semibold font-headline mb-2 flex items-center">
                  <Key className="mr-2 h-5 w-5 text-primary/80" />
                  Chamber 2: The Logic Lock
                </h3>
                <p className="mb-3">
                  This chamber requires you to perform a series of calculations
                  based on the key from the previous room.
                </p>
                <ul className="list-decimal list-inside space-y-2 pl-4 border-l-2 border-dashed border-border py-2">
                  <li>
                    Start with your first key: <strong>3</strong>
                  </li>
                  <li>
                    Multiply it by the number of days in a fortnight (14 days):{' '}
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      3 x 14 = 42
                    </span>
                  </li>
                  <li>
                    Subtract the number of months that have exactly 30 days
                    (4):{' '}
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      42 - 4 = 38
                    </span>
                  </li>
                  <li>
                    Reduce to a single digit via Theosophical Reduction (digit
                    summing):{' '}
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      3 + 8 = 11
                    </span>
                    , then{' '}
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      1 + 1 = 2
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>Second Key:</strong> The final single digit is{' '}
                  <span className="font-bold text-primary text-xl">2</span>.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl md:text-2xl font-bold font-headline mb-2 text-green-600 flex items-center justify-center">
              🏆 The Labyrinth's Escape Code
            </h2>
            <p className="text-center">
              By successfully navigating the chambers and solving their trials,
              you have revealed the final numeric code required to unlock the
              labyrinth's center and claim your victory.
            </p>
            <div className="text-center my-6 bg-muted/50 p-4 md:p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">The Final Code Is</p>
              <span className="text-6xl md:text-7xl font-black text-green-600 tracking-widest">
                2
              </span>
            </div>
            <p className="text-center">
              As for the treasure within, it is not gold nor jewels, but a
              single, seven-letter word whispered by the ancients:
              <strong className="text-accent-foreground font-bold text-lg"> MYSTERY</strong>. The true reward is the journey and the wisdom gained.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
