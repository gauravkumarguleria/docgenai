"use client";

import { useEffect, useState } from "react";
import { DockerfileDisplay } from "@/components/DockerfileDisplay";
import { GitHubInput } from "@/components/GitHubInput";

const Index = () => {
  const [dockerfile, setDockerfile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPushing, setIsPushing] = useState(false); // <-- New state for push status
  const [repoInfo, setRepoInfo] = useState<{
    name: string;
    url: string;
  } | null>(null);

  /**
   * Handles pushing the generated Dockerfile to the repository.
   *
   * !! IMPORTANT !!
   * This is a placeholder. Pushing to a GitHub repo requires
   * authentication (like an OAuth token) and using the GitHub API.
   * This operation should be handled by a secure backend API route
   * to avoid exposing sensitive tokens on the client-side.
   */
  const handlePushToRepo = async () => {
    if (!dockerfile || !repoInfo) return;

    setIsPushing(true);
    console.log("Attempting to push to:", repoInfo.url);

    // ==================================================================
    // TODO: Implement your backend API call here.
    //
    // Example:
    // try {
    //   const response = await fetch("/api/push-to-github", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       repoUrl: repoInfo.url,
    //       fileContent: dockerfile,
    //       filePath: "Dockerfile",
    //       commitMessage: "feat: Add generated Dockerfile by DockGen AI",
    //       // You'll also need to send the user's auth token
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error("Failed to push to GitHub");
    //   }
    //
    //   const result = await response.json();
    //   alert("Successfully pushed Dockerfile to " + result.commitUrl);
    //
    // } catch (error) {
    //   console.error(error);
    //   alert("Error pushing file. See console for details.");
    // }
    // ==================================================================

    // Simulating API call delay for demonstration
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("GitHub Push (Simulation Complete)!\nYour real API logic goes here.");

    setIsPushing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold">DockGen AI</h1>
              <p className="text-sm text-muted-foreground">
                Intelligent Dockerfile Generation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {!dockerfile ? (
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Generate Production-Ready Dockerfiles
              </h2>
              <p className="text-lg text-muted-foreground">
                AI-powered analysis of your JavaScript repositories (React,
                Next.js, Vue, Angular)
              </p>
            </div>

            {/* Input Form */}
            <GitHubInput
              onGenerate={setDockerfile}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              setRepoInfo={setRepoInfo}
            />
          </div>
        ) : (
          <DockerfileDisplay
            dockerfile={dockerfile}
            repoInfo={repoInfo}
            onReset={() => {
              setDockerfile(null);
              setRepoInfo(null);
            }}
            onPushToRepo={handlePushToRepo} 
            isPushing={isPushing}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
