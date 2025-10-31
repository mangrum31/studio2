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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

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
    return null;
  }

  return (
    <SidebarProvider>
      {!isMobile ? (
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
                        (item.href !== '/' && pathname.startsWith(item.href))
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
      ) : null}
      <SidebarInset>
        {isMobile && (
          <header className="flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="h-10 w-10 p-0">
                <Link href="/">
                  <Rocket className="h-7 w-7 text-primary" />
                </Link>
              </Button>
              <h2 className="text-xl font-semibold font-headline text-primary">
                EduPlay
              </h2>
            </div>
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </MenubarTrigger>
                <MenubarContent>
                  {navItems.map((item) => (
                    <Link href={item.href} passHref key={item.href}>
                      <MenubarItem
                        className={`flex items-center gap-2 ${
                          pathname === item.href ||
                          (item.href !== '/' && pathname.startsWith(item.href))
                            ? 'bg-accent'
                            : ''
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </MenubarItem>
                    </Link>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </header>
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
