import { ProjectAssistant } from './_components/project-assistant';

export default function CreativePage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4 md:px-0">
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Project Assistant <span className="text-primary">AI</span>
        </h1>
        <p className="text-muted-foreground mt-1 text-base md:text-lg">
          Manage your projects and instantly generate plans and status reports.
        </p>
      </header>
      <ProjectAssistant />
    </div>
  );
}
