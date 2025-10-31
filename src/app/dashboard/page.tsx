'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { progressData, progressChartConfig } from '@/lib/data';
import { CheckCircle, Star, Trophy } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">
          Your Adventure So Far
        </h1>
        <p className="text-muted-foreground">Keep up the great work, explorer!</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center aspect-square">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quests Completed</CardTitle>
            <Trophy className="h-5 w-5" color="hsl(var(--chart-4))" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center aspect-square">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
            <Star className="h-5 w-5" color="hsl(var(--chart-4))" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New 'Vocabulary' skill</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center aspect-square">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Playtime</CardTitle>
            <CheckCircle className="h-5 w-5" color="hsl(var(--chart-2))" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 hours</div>
            <p className="text-xs text-muted-foreground">
              Most time spent on 'Math' games
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={progressChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart data={progressData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="math" fill="var(--color-math)" radius={4} />
                <Bar
                  dataKey="vocabulary"
                  fill="var(--color-vocabulary)"
                  radius={4}
                />
                <Bar
                  dataKey="problemSolving"
                  fill="var(--color-problemSolving)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
