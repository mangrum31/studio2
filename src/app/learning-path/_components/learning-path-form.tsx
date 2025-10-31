'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizeLearningPath } from '@/ai/flows/personalized-learning-paths';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';

const formSchema = z.object({
  childName: z.string().min(2, 'Name must be at least 2 characters.'),
  gradeLevel: z.coerce.number().min(1, 'Grade must be 1 or greater.'),
  strengths: z
    .string()
    .min(10, 'Please describe their strengths in a bit more detail.'),
  weaknesses: z
    .string()
    .min(10, 'Please describe their weaknesses in a bit more detail.'),
  learningGoals: z.string().min(10, 'Please describe their learning goals.'),
});

type FormValues = z.infer<typeof formSchema>;

export function LearningPathForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: '',
      gradeLevel: 1,
      strengths: '',
      weaknesses: '',
      learningGoals: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await personalizeLearningPath(values);
      setResult(response.personalizedPath);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate learning path. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Child's Information</CardTitle>
              <CardDescription>
                Fill out the form below to get a personalized plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="childName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alex" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Level</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="strengths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strengths</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., great at mental math, loves reading..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weaknesses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas for Improvement</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., struggles with fractions, finds writing challenging..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., improve multiplication skills, write a short story..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Path
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {result && (
        <Card className="mt-8 shadow-inner bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <Sparkles className="h-5 w-5 text-primary" />
              Your Personalized Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-none text-foreground whitespace-pre-wrap font-body">
              {result}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}