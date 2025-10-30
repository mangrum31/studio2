import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { games } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { DifficultyAdjuster } from './_components/difficulty-adjuster';
import { CalculatorIcon } from '@/components/icons/calculator-icon';
import { SpellCheckIcon } from '@/components/icons/spellcheck-icon';
import { ShapesIcon } from '@/components/icons/shapes-icon';
import { MusicIcon } from '@/components/icons/music-icon';
import Link from 'next/link';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'Equation Expedition': CalculatorIcon,
  'Word Weavers': SpellCheckIcon,
  'Pattern Detectives': ShapesIcon,
  'Rhythm Master': MusicIcon,
};

const gameRoutes: { [key: string]: string } = {
  'Word Weavers': '/games/word-weavers',
};

export default function GamesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Skill-Based Games</h1>
        <p className="text-muted-foreground">
          Sharpen your mind with these fun challenges!
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => {
          const Icon = iconMap[game.title];
          const gameRoute = gameRoutes[game.title];

          const PlayButton = () => (
            <Button asChild>
              <Link href={gameRoute}>
                <Play className="mr-2 h-4 w-4" /> Play Now
              </Link>
            </Button>
          );

          const DisabledButton = () => (
            <Button disabled>
              <Play className="mr-2 h-4 w-4" /> Play Now
            </Button>
          );

          return (
            <Card
              key={game.id}
              className="flex flex-col text-center items-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <CardHeader className="items-center">
                <div className="p-4 bg-muted rounded-full">
                  {Icon && <Icon className="w-10 h-10" />}
                </div>
                <CardTitle>{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{game.description}</CardDescription>
              </CardContent>
              <div className="p-4">
                {gameRoute ? <PlayButton /> : <DisabledButton />}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="pt-8">
        <DifficultyAdjuster />
      </div>
    </div>
  );
}
