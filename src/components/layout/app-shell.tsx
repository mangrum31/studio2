'use client';

import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Menu,
  Palette,
  Rocket,
  Swords,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
  {
    href: '/quests',
    label: 'Story Quests',
    icon: <Swords size={20} />,
  },
  { href: '/games', label: 'Skill Games', icon: <BookOpen size={20} /> },
  { href: '/learning-path', label: 'My Path', icon: <BrainCircuit size={20} /> },
  { href: '/creative', label: 'Creative Mode', icon: <Palette size={20} /> },
];

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Rocket className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const brandName = "EduPlay";

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-primary font-headline flex">
              {brandName.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-wave"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-base font-medium transition-colors hover:text-primary',
                  pathname.startsWith(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px]">
              <div className="p-4">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <Rocket className="h-7 w-7 text-primary" />
                  <h1 className="text-xl font-bold text-primary font-headline">
                    EduPlay
                  </h1>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md p-3 text-lg font-medium transition-colors hover:bg-muted',
                          pathname.startsWith(item.href)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground'
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 sm:py-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
};
