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

export default function QuestsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">
          Interactive Story Quests
        </h1>
        <p className="text-muted-foreground">
          An adventure awaits in every story. Choose your quest!
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {quests.map((quest) => {
          const placeholder = PlaceHolderImages.find(
            (p) => p.id === quest.image_id
          );
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
                    className="object-cover"
                  />
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{quest.title}</CardTitle>
                  <Badge variant="secondary">{quest.category}</Badge>
                </div>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button>
                  Start Quest <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
