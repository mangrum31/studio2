import { BrainCircuit } from 'lucide-react';
import { LearningPathForm } from './_components/learning-path-form';

export default function LearningPathPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center">
        <div className="inline-block p-4 bg-muted rounded-full mb-4">
          <BrainCircuit className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">
          Personalized Learning Path
        </h1>
        <p className="text-muted-foreground mt-2">
          Let our AI craft a unique learning journey for your child based on
          their needs and goals.
        </p>
      </header>
      <LearningPathForm />
    </div>
  );
}
