
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
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-3xl font-bold font-headline text-primary">
            The Lost Treasure of Numera
          </CardTitle>
          <CardDescription className="text-lg">
            A legendary treasure is protected by an ancient, four-digit
            mathematical lock. Complete the trial of Ten Puzzles to reveal the
            code.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
              <HelpCircle className="mr-3 h-6 w-6 text-accent" />
              The Trial of Ten Puzzles
            </h2>
            <p className="text-foreground/80 mb-6">
              Solve the following math challenges to prove your worth. The
              answer to each puzzle is a clue for the final lock combination.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: '1. Solving for x',
                  p: 'If 3x - 8 = 34, what is the value of x?',
                  a: '14',
                },
                {
                  q: '2. The Missing Angle',
                  p: 'A triangle has two angles measuring 50° and 75°. What is the measure of the third angle in degrees?',
                  a: '55',
                },
                {
                  q: '3. The Bakers Dozen',
                  p: 'If a baker sells 4 dozen cookies, how many individual cookies did they sell?',
                  a: '48',
                },
                {
                  q: '4. The Area of a Square',
                  p: 'A square garden has a side length of 9 meters. What is its area in square meters?',
                  a: '81',
                },
                {
                  q: '5. The Prime Number Path',
                  p: 'What is the sum of the first five prime numbers (2, 3, 5, 7, 11)?',
                  a: '28',
                },
                {
                  q: '6. The Chariots Distance',
                  p: 'A chariot travels at a constant speed of 30 miles per hour. How many miles will it travel in 5 hours?',
                  a: '150',
                },
                {
                  q: '7. The Larger Number',
                  p: 'Which is larger: 20% of 50, or 50% of 22?',
                  a: 'The larger number is 11 (50% of 22). The digit to use is 10 (20% of 50)',
                },
                {
                  q: '8. The Bookworm’s Pace',
                  p: 'A scholar reads 25 pages every day. How many days will it take to finish a 200-page book?',
                  a: '8',
                },
                {
                  q: '9. The Fraction Mix-Up',
                  p: 'What is 1/2 + 1/4?',
                  a: '3/4 or 0.75',
                },
                {
                  q: '10. The Exponents Value',
                  p: 'What is the value of 2 to the power of 5 (2^5)?',
                  a: '32',
                },
              ].map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger className="font-semibold font-headline text-lg">
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
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
              <Key className="mr-3 h-6 w-6 text-accent" />
              The Treasure's Code
            </h2>
            <p className="text-foreground/80 mb-6">
              To unlock The Lost Treasure of Numera, use the correct answers from
              the puzzles above to calculate the four-digit code $D_1D_2D_3D_4$.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_1$ (The Speed Digit)
                </h3>
                <p>
                  Take the <strong>first digit</strong> of the correct answer to{' '}
                  <strong>Question 6</strong> (The Chariot's Distance).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer to Q6 is 150 &rarr; $D_1 = 1$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_2$ (The Factor Digit)
                </h3>
                <p>
                  Find the number of <strong>prime factors</strong> for the correct
                  answer to <strong>Question 7</strong> (The number 10).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Prime factors of 10 are 2 &times; 5 &rarr; $D_2 = 2$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_3$ (The Sum Digit)
                </h3>
                <p>
                  Find the <strong>sum of the digits</strong> of the correct
                  answer to <strong>Question 1</strong> (Solving for $x$).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer to Q1 is 14. Sum of digits 1 + 4 = 5 &rarr; $D_3 = 5$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_4$ (The Power Digit)
                </h3>
                <p>
                  Take the <strong>last digit</strong> of the correct answer to{' '}
                  <strong>Question 10</strong> (The Exponent's Value).
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer to Q10 is 32 &rarr; $D_4 = 2$
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="text-center">
            <h2 className="text-2xl font-bold font-headline mb-2 text-green-600 flex items-center justify-center">
              <Diamond className="mr-3 h-6 w-6" />
              The Final Code
            </h2>
            <p>
              Combine the digits $D_1D_2D_3D_4$ to reveal the lock's combination.
            </p>
            <div className="my-6 bg-muted/50 p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">The Code Is</p>
              <span className="text-7xl font-black text-green-600 tracking-widest">
                1252
              </span>
            </div>
            <p className="text-lg text-foreground/90">
              Congratulations, brave adventurer! You have proven your mathematical
              prowess and unlocked the legendary treasure of Numera.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
