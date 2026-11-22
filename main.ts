import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// bring-the-humans-03 entrypoint: copy VIDEO.json from the repository root
// to the grader's output directory. That is all it does: no network, no clock,
// no files outside the repository.
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
