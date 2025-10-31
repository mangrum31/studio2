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
import { ArrowLeft, Key, BookHeart, TreeDeciduous } from 'lucide-react';
import Link from 'next/link';

export default function WhisperingWoodsPage() {
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
            The Whispering Woods of Wordcraft
          </CardTitle>
          <CardDescription className="text-lg">
            A curse of silence has fallen over the woods. Only by proving your
            mastery of vocabulary can you restore its voice.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
              <BookHeart className="mr-3 h-6 w-6 text-accent" />
              The Trial of Words
            </h2>
            <p className="text-foreground/80 mb-6">
              Embark on your linguistic adventure! This quiz will test your
              mastery of new vocabulary, which is the key to unlocking the true
              power of the Whispering Woods. Each correct answer holds a clue to
              the final incantation.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: '1. What word means "tending to avoid commitment by responding indirectly"?',
                  a: 'EVASIVE',
                },
                {
                  q: '2. If something is "fleeting," it is:',
                  a: 'Lasting for a very short time.',
                },
                {
                  q: '3. Which word is a synonym for "abundant" or "plentiful"?',
                  a: 'COPIOUS',
                },
                {
                  q: '4. A "resilient" person is able to:',
                  a: 'Withstand or recover quickly from difficult conditions.',
                },
                {
                  q: '5. What word describes something that is "proceeding in a gradual, subtle way, but with harmful effects"?',
                  a: 'INSIDIOUS',
                },
                {
                  q: '6. To "corroborate" a story means to:',
                  a: 'Confirm or give support to a statement or finding.',
                },
                {
                  q: '7. What word means "deceitfulness" or "double-dealing"?',
                  a: 'DUPLICITY',
                },
                {
                  q: '8. If a student is "diligent," they are:',
                  a: 'Showing care and conscientiousness in their work.',
                },
              ].map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger className="font-semibold font-headline text-lg text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-bold text-lg text-primary">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
              <Key className="mr-3 h-6 w-6 text-accent" />
              The Curse-Breaking Code
            </h2>
            <p className="text-foreground/80 mb-6">
              Solve the math challenges below using the correct answers from the
              quiz to reveal the four-digit code $D_1D_2D_3D_4$ that lifts the
              curse of silence.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_1$ &mdash; The Vowel Count
                </h3>
                <p>
                  Find the total{' '}
                  <strong>number of vowels (A, E, I, O, U)</strong> in the
                  correct word for <strong>Question 1</strong>.
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer is EVASIVE. Vowels: E, A, I, E &rarr; $D_1 = 4$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_2$ &mdash; The Letter Length
                </h3>
                <p>
                  Find the total <strong>number of letters</strong> in the
                  correct word for <strong>Question 3</strong>.
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer is COPIOUS. It has 7 letters. &rarr; $D_2 = 7$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_3$ &mdash; The D-Position
                </h3>
                <p>
                  Find the <strong>position of the letter 'D'</strong> (counting
                  from 1) in the correct word for <strong>Question 5</strong>.
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer is INSIDIOUS. 'D' is the 5th letter. &rarr; $D_3 = 5$
                </p>
              </div>

              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">
                  $D_4$ &mdash; The Distinct Count
                </h3>
                <p>
                  Find the total{' '}
                  <strong>number of distinct letters</strong> (counting each
                  letter only once) in the correct word for{' '}
                  <strong>Question 7</strong>.
                </p>
                <p className="font-mono text-primary text-lg mt-2">
                  Answer is DUPLICITY. Distinct letters: D,U,P,L,I,C,T,Y (8).
                  &rarr; $D_4 = 8$
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="text-center">
            <h2 className="text-2xl font-bold font-headline mb-2 text-green-600 flex items-center justify-center">
              <TreeDeciduous className="mr-3 h-6 w-6" />
              The Final Incantation
            </h2>
            <p>
              Whisper the code $D_1D_2D_3D_4$ to the ancient heart-tree to
              restore the voice of the woods.
            </p>
            <div className="my-6 bg-muted/50 p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">The Code Is</p>
              <span className="text-7xl font-black text-green-600 tracking-widest">
                4758
              </span>
            </div>
            <p className="text-lg text-foreground/90">
              The woods are alive with sound once more! Thank you for your help,
              Wordcrafter.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
