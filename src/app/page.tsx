import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <div className="max-w-2xl">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 animate-bounce">
          <Rocket className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground">
          Welcome to EduPlay Adventures!
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          Your interactive and fun learning journey starts here. Explore story
          quests, sharpen your skills with exciting games, and watch your
          knowledge grow!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">Start Your Adventure</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/games">Browse Games</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
