import { copyFileSync, mkdirSync } from "node:fs";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// bring-the-humans-03 entrypoint: copy VIDEO.json from the repository root
// to the grader's output directory. That is all it does: no network, no clock,
// no files outside the repository.
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

mkdirSync(outDir, { recursive: true });

// Validate VIDEO.json before copying: the URL must be a real, canonical
// TikTok video link, not the starter placeholder.
const video = JSON.parse(readFileSync(join(botDir, "VIDEO.json"), "utf8"));
const videoUrl = video?.url;
if (typeof videoUrl !== "string" || videoUrl.length === 0) {
  throw new Error("VIDEO.json is missing the 'url' field or it is not a string");
}
if (videoUrl.includes("<handle>")) {
  throw new Error("VIDEO.json still contains the '<handle>' placeholder; replace it with the real TikTok video URL");
}
if (!videoUrl.startsWith("https://www.tiktok.com/")) {
  throw new Error("VIDEO.json 'url' must start with 'https://www.tiktok.com/'");
}

copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
