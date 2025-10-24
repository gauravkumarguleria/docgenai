//-----------------------Detecting the tech stack -----------------------
export default function detectTechStack(contents, packageJson) {
  const files = contents.map((file) => file.name.toLowerCase());
  const dependencies = packageJson?.dependencies || {};
  const devDependencies = packageJson?.devDependencies || {};
  const allDeps = { ...dependencies, ...devDependencies };

  let framework = "unknown";
  let isBackend = false;

  if (allDeps["next"]) framework = "Next.js";
  else if (allDeps["react"]) framework = "React";
  else if (allDeps["vue"]) framework = "Vue.js";
  else if (allDeps["@angular/core"]) framework = "Angular";
  else if (allDeps["express"] || allDeps["fastify"] || allDeps["koa"]) {
    framework = "Node.js";
    isBackend = true;
  }

  let packageManager = "npm";
  if (files.includes("yarn.lock")) packageManager = "yarn";
  else if (files.includes("pnpm-lock.yaml")) packageManager = "pnpm";

  const buildCommand = packageJson?.scripts?.build || "npm run build";
  const startCommand = packageJson?.scripts?.start || "npm start";

  return {
    framework,
    isBackend,
    packageManager,
    buildCommand,
    startCommand,
    nodeVersion: "20",
    hasTypeScript: !!allDeps["typescript"],
  };
}
