import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { quests } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const questRoutes: { [key: string]: string | undefined } = {
  'quest-1': '/quests/the-lost-treasure-of-numera',
  'quest-2': '/quests/the-whispering-woods-of-wordcraft',
  'quest-3': undefined,
  'quest-4': '/quests/the-starfall-isles',
};

export default function QuestsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">
          Interactive Story Quests
        </h1>
        <p className="text-muted-foreground">
          An adventure awaits in every story. Choose your quest!
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {quests.map((quest) => {
          const placeholder = PlaceHolderImages.find(
            (p) => p.id === quest.image_id
          );
          const questRoute = questRoutes[quest.id];

          return (
            <Card
              key={quest.id}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="relative h-48 w-full">
                {placeholder && (
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    data-ai-hint={placeholder.imageHint}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle>{quest.title}</CardTitle>
                  <Badge variant="secondary" className='shrink-0'>{quest.category}</Badge>
                </div>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild disabled={!questRoute}>
                  <Link href={questRoute || '#'}>
                    Start Quest <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}