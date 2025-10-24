// components/DockerfileDisplay.tsx

import { Button } from "@/components/ui/button";
// <-- Updated imports to include Github and Loader2
import { Copy, RotateCcw, Check, Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DockerfileDisplayProps {
  dockerfile: string;
  onReset: () => void;
  repoInfo: { name: string; url: string } | null;
  onPushToRepo: () => void; // <-- New prop
  isPushing: boolean; // <-- New prop
}

export const DockerfileDisplay = ({
  dockerfile,
  onReset,
  repoInfo,
  onPushToRepo, // <-- New prop
  isPushing, // <-- New prop
}: DockerfileDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dockerfile);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Dockerfile copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Generated Dockerfile</h2>
          {repoInfo && (
            <p className="text-muted-foreground mt-1">
              For:{" "}
              <a
                href={repoInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {repoInfo.name}
              </a>
            </p>
          )}
        </div>

        {/* <-- Updated: Wrapper for buttons --> */}
        <div className="flex gap-2">
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Repository
          </Button>

          {/* <-- NEW: Push to Repo Button --> */}
          <Button onClick={onPushToRepo} disabled={isPushing}>
            {isPushing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            {isPushing ? "Pushing..." : "Push to Repository"}
          </Button>
        </div>
      </div>

      {/* Dockerfile Display */}
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <div className="flex items-center justify-between px-6 py-3 bg-muted border-b border-border">
          <span className="text-sm font-mono font-semibold">Dockerfile</span>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="h-8"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
        <div className="p-6 bg-[hsl(var(--code-background))] overflow-x-auto">
          <pre className="text-sm font-mono leading-relaxed text-foreground whitespace-pre-wrap">
            {dockerfile}
          </pre>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-6 rounded-lg bg-card border border-border">
        <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
        <ol className="space-y-3 text-sm text-muted-foreground">
          {/* <-- Updated Step 1 --> */}
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              1
            </span>
            <span>
              <strong>Push to Repository</strong> using the button above, or
              manually copy the file to your repository root.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              2
            </span>
            <span>
              Once the file is in your repo, build the image:{" "}
              <code className="px-2 py-1 rounded bg-muted font-mono text-xs">
                docker build -t my-app .
              </code>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              3
            </span>
            <span>
              Run the container:{" "}
              <code className="px-2 py-1 rounded bg-muted font-mono text-xs">
                docker run -p 3000:3000 my-app
              </code>
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};
