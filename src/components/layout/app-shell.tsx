'use client';

import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Palette,
  Rocket,
  Swords,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <BarChart3 /> },
  { href: '/quests', label: 'Story Quests', icon: <Swords /> },
  { href: '/games', label: 'Skill Games', icon: <BookOpen /> },
  { href: '/learning-path', label: 'My Path', icon: <BrainCircuit /> },
  { href: '/creative', label: 'Creative Mode', icon: <Palette /> },
];

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null; // Don't render until mobile status is determined
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="h-10 w-10 p-0">
              <Link href="/">
                <Rocket className="h-7 w-7 text-primary" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-primary font-headline group-data-[collapsible=icon]:hidden">
              EduPlay
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={
                      pathname === item.href ||
                      (item.href !== '/' &&
                        item.href !== '/dashboard' &&
                        pathname.startsWith(item.href))
                    }
                    tooltip={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-sm sticky top-0 z-30 md:hidden">
          <SidebarTrigger className="h-9 w-9" />
          <div className="flex items-center gap-2">
            <Rocket className="h-7 w-7 text-primary" />
            <h2 className="text-xl font-semibold font-headline text-primary">
              EduPlay Adventures
            </h2>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
