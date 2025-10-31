'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateStatusUpdate } from '@/ai/flows/project-status-update';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for projects - in a real app this would come from a database
const mockProjects = [
  { id: 1, description: 'Launch a new website for a client' },
  { id: 2, description: 'Develop a mobile app for ticket booking' },
  { id: 3, description: 'Plan the company offsite event' },
];

export function ProjectAssistant() {
  const [projects, setProjects] = useState(mockProjects);
  const [newProject, setNewProject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<{ title: string; content: string } | null>(null);
  const { toast } = useToast();

  const handleAddProject = () => {
    if (newProject.trim() === '') {
      toast({
        title: 'Error',
        description: 'Project description cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    setProjects([
      ...projects,
      { id: Date.now(), description: newProject.trim() },
    ]);
    setNewProject('');
  };

  const handleGenerateStatus = async () => {
    if (projects.length === 0) {
      toast({
        title: 'No Projects',
        description: 'Please add at least one project to generate a status update.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAiOutput(null);

    const projectSummaries = projects
      .map((p) => `Project: ${p.description}`)
      .join('\n');

    try {
      const result = await generateStatusUpdate({ projectSummaries });
      setAiOutput({
        title: '✨ Status Update Draft',
        content: result.statusUpdate,
      });
    } catch (error) {
      console.error('Failed to generate status update:', error);
      toast({
        title: 'AI Error',
        description: 'Could not generate the status update. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold">Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              id="project-input"
              placeholder="e.g., Launch a new website for a client"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
              className="flex-grow"
            />
            <Button
              onClick={handleAddProject}
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              Save Project Idea
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold">My Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-150 hover:bg-muted/50"
                >
                  <span className="text-foreground font-medium truncate">
                    {project.description}
                  </span>
                  <div className="flex space-x-2 w-full sm:w-auto sm:ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-sm w-full"
                      disabled
                    >
                      <span className="mr-1">✨</span> Plan It (soon)
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                No projects added yet.
              </p>
            )}
          </div>
          {projects.length > 0 && (
            <Button
              onClick={handleGenerateStatus}
              disabled={isLoading}
              className="w-full mt-6"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="mr-2">✨</span>
              )}
              {isLoading ? 'Generating...' : 'Generate Team Status Update'}
            </Button>
          )}
        </CardContent>
      </Card>

      {aiOutput && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold">{aiOutput.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg border border-border prose-sm max-w-none">
              <p>{aiOutput.content}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
