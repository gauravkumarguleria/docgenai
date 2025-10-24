import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Github } from "lucide-react";

interface GitHubInputProps {
  onGenerate: (dockerfile: string) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  setRepoInfo: (info: { name: string; url: string }) => void;
}

export const GitHubInput = ({
  onGenerate,
  isGenerating,
  setIsGenerating,
  setRepoInfo,
}: GitHubInputProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [token, setToken] = useState("");

  const handleGenerate = async () => {
    if (!repoUrl.trim()) {
      alert("⚠️ Please enter a GitHub repository URL.");
      return;
    }

    if (!token.trim()) {
      alert("⚠️ Please enter your GitHub Personal Access Token.");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/docker/generate`,
        {
          repoUrl,
          token,
        }
      );

      const data = response.data;
      if (data.error) throw new Error(data.error);

      setRepoInfo({ name: data.repoName || "Repository", url: repoUrl });
      onGenerate(data.dockerfile);
      console.log("✅ Dockerfile generated successfully!");
    } catch (error: any) {
      console.error("❌ Error generating Dockerfile:", error);
      alert(
        error.message ||
          "Failed to generate Dockerfile. Please check your inputs and backend."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Generate Dockerfile from GitHub Repo
        </h1>
      </div>

      {/* Repository URL Input */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="repo-url" className="text-base text-gray-200">
          GitHub Repository URL
        </Label>
        <div className="relative">
          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="repo-url"
            placeholder="https://github.com/username/repository"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={isGenerating}
            className="pl-10 h-12 bg-gray-800 border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 rounded-xl transition-all"
          />
        </div>
        <p className="text-sm text-gray-400">
          Example:{" "}
          <span className="text-blue-400">
            https://github.com/gauravkumarguleria/Portfolio
          </span>
        </p>
      </div>

      {/* Token Input */}
      <div className="space-y-2 mb-8">
        <Label htmlFor="token" className="text-base text-gray-200">
          GitHub Personal Access Token
        </Label>
        <Input
          id="token"
          type="password"
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          disabled={isGenerating}
          className="h-12 bg-gray-800 border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500 rounded-xl transition-all"
        />
        <p className="text-sm text-gray-400">
          Required for private repositories.{" "}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Create a token
          </a>
        </p>
        <p className="text-sm text-gray-400">
          Example:{" "}
          <span className="text-blue-400">
            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
          </span>
        </p>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Repository...
          </>
        ) : (
          "Generate Dockerfile"
        )}
      </Button>

      {/* Footer note */}
      <p className="mt-6 text-xs text-gray-500 text-center">
        This tool automatically inspects your repo and builds a production-ready
        Dockerfile.
      </p>
    </div>
  );
};
