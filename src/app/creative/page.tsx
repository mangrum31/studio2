import { Palette, Paintbrush } from 'lucide-react';

export default function CreativePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full space-y-6 rounded-lg border-2 border-dashed border-border p-12 min-h-[50vh]">
      <div className="relative">
        <Palette className="h-24 w-24 text-muted-foreground/50" />
        <Paintbrush className="absolute -bottom-2 -right-2 h-12 w-12 text-primary animate-bounce" />
      </div>
      <h1 className="text-3xl font-bold font-headline">Creative Mode</h1>
      <p className="text-muted-foreground max-w-md">
        Unleash your imagination! A canvas for building your own games, stories,
        and challenges is coming soon. Get ready to create!
      </p>
    </div>
  );
}
