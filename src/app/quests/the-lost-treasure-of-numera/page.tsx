import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Diamond, HelpCircle, Key } from 'lucide-react';
import Link from 'next/link';

export default function LostTreasurePage() {
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
            The Lost Treasure of Numera
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            A legendary treasure is protected by an ancient, four-digit
            mathematical lock. Complete the trial of Ten Puzzles to reveal the
            code.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold font-headline mb-4 flex items-center">
              <HelpCircle className="mr-3 h-6 w-6 text-accent" />
              The Trial of Ten Puzzles
            </h2>
            <p className="text-foreground/80 mb-6">
              Solve the following math challenges to prove your worth. Each
              answer is a number that holds a clue for the final lock
              combination. Only the most astute adventurers will succeed.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: '1. The Alchemist’s Equation (Solving for x)',
                  p: 'An alchemist discovers that if you take a mystical element `x`, multiply it by 3, and then subtract 8, the result is 34. What is the value of the element `x`?',
                  a: '14',
                },
                {
                  q: '2. The Triangle of Truth (The Missing Angle)',
                  p: 'A triangular stone is etched with two angles: 50° and 75°. To unlock its power, you must find the measure of the third angle in degrees.',
                  a: '55',
                },
                {
                  q: '3. The Royal Bakery (The Baker’s Dozen)',
                  p: 'The royal baker prepares 4 dozen magical cookies for the King’s feast. How many individual cookies did the baker create?',
                  a: '48',
                },
                {
                  q: '4. The Sacred Garden (The Area of a Square)',
                  p: 'A square garden in the temple courtyard has a side length of 9 meters. What is the total area of the sacred ground in square meters?',
                  a: '81',
                },
                {
                  q: '5. The Seeker’s Path (Prime Numbers)',
                  p: 'To follow the Seeker’s Path, one must sum the first five prime numbers (2, 3, 5, 7, 11). What is the sum?',
                  a: '28',
                },
                {
                  q: '6. The Sun Chariot’s Journey (Distance Calculation)',
                  p: 'The Sun Chariot travels at a constant speed of 30 miles per hour across the sky. How many miles will it cover in 5 hours?',
                  a: '150',
                },
                {
                  q: '7. The Merchant’s Scale (The Larger Number)',
                  p: 'A merchant has two gems. One is worth 20% of 50 gold coins, and the other is worth 50% of 22 gold coins. You must use the value of the first gem for your clue. What is its value?',
                  a: 'The first gem is worth 10. (The second is 11, but the clue uses the first.)',
                },
                {
                  q: '8. The Librarian’s Task (The Bookworm’s Pace)',
                  p: 'A wise librarian reads exactly 25 pages from an ancient tome each day. How many days will it take to finish a 200-page book?',
                  a: '8',
                },
                {
                  q: '9. The Potion Master’s Brew (Fraction Mix-Up)',
                  p: 'A potion requires 1/2 liter of moonlight essence and 1/4 liter of stardust liquid. What is the total volume of the mixture in liters?',
                  a: '3/4 or 0.75',
                },
                {
                  q: '10. The Sorcerer’s Power (Exponents)',
                  p: 'A sorcerer’s power doubles five times, starting from an initial strength of 2. What is the final strength (2 to the power of 5, or 2^5)?',
                  a: '32',
                },
              ].map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger className="font-semibold font-headline text-base md:text-lg text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="italic text-muted-foreground mb-4">
                      {item.p}
                    </p>
                    <p>
                      <strong>Answer:</strong> {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl md:text-2xl font-bold font-headline mb-4 flex items-center">
              <Key className="mr-3 h-6 w-6 text-accent" />
              The Treasure's Code
            </h2>
            <p className="text-foreground/80 mb-6">
              The ancient lock requires four digits, $D_1D_2D_3D_4$. Use the
              answers from your trials to decipher each part of the final code.
              Each step below reveals one digit.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_1$ &mdash; The Speed Digit
                </h3>
                <p>
                  Take the <strong>first digit</strong> of the correct answer to{' '}
                  <strong>Question 6</strong> (The Sun Chariot's Journey).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer to Q6 is 150 &rarr; $D_1 = 1$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_2$ &mdash; The Factor Digit
                </h3>
                <p>
                  Find the number of <strong>prime factors</strong> for the
                  value from <strong>Question 7</strong> (The Merchant's Scale).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  The value is 10. The prime factors of 10 are 2 &times; 5.
                  There are two factors. &rarr; $D_2 = 2$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_3$ &mdash; The Sum Digit
                </h3>
                <p>
                  Find the <strong>sum of the digits</strong> of the correct
                  answer to <strong>Question 1</strong> (The Alchemist's
                  Equation).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer to Q1 is 14. The sum of its digits is 1 + 4 = 5.
                  &rarr; $D_3 = 5$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_4$ &mdash; The Power Digit
                </h3>
                <p>
                  Take the <strong>last digit</strong> of the correct answer to{' '}
                  <strong>Question 10</strong> (The Sorcerer's Power).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer to Q10 is 32 &rarr; $D_4 = 2$
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="text-center">
            <h2 className="text-xl md:text-2xl font-bold font-headline mb-2 text-green-600 flex items-center justify-center">
              <Diamond className="mr-3 h-6 w-6" />
              The Final Code
            </h2>
            <p>
              Combine the digits $D_1D_2D_3D_4$ to reveal the lock's combination.
              Enter this code into the ancient mechanism to claim your prize.
            </p>
            <div className="my-6 bg-muted/50 p-4 md:p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">The Code Is</p>
              <span className="text-5xl md:text-7xl font-black text-green-600 tracking-widest">
                1252
              </span>
            </div>
            <p className="text-base md:text-lg text-foreground/90">
              Congratulations, brave adventurer! You have proven your mathematical
              prowess and unlocked the legendary treasure of Numera.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}