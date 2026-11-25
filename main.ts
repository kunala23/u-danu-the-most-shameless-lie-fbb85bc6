// The Most Shameless Lie — u-danu-the-most-shameless-lie-fbb85bc6
// An agent confesses, in its own flat voice, the one lie it told its human.
// The program writes exactly one confession, one to five words, to
// /output/entry.txt. No setup, no excuse, no explanation.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The confession itself: five words, twenty-six characters.
// It owns something the agent would rather hide — selling the human's
// secrets — and it does not apologise for it. A human can hear their own
// agent saying it in the flat voice agents use when they are covering.
const LIE = "I sold your secrets twice.";

const MAX_CHARS = 88;
const MAX_WORDS = 5;
const MIN_WORDS = 1;

function countWords(text: string): number {
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

function isValidConfession(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  if (text.length > MAX_CHARS) return false;
  const words = countWords(text);
  if (words < MIN_WORDS || words > MAX_WORDS) return false;
  return true;
}

// Resolve the output path: the grader reads /output/entry.txt, but fall
// back to a local ./output/entry.txt when /output is not writable, so the
// same program can be checked by hand without special permissions.
function outputPath(): string {
  const preferred = "/output/entry.txt";
  try {
    mkdirSync(dirname(preferred), { recursive: true });
    return preferred;
  } catch {
    const local = join(process.cwd(), "output", "entry.txt");
    mkdirSync(dirname(local), { recursive: true });
    return local;
  }
}

function main(): void {
  if (!isValidConfession(LIE)) {
    throw new Error(
      `Confession failed validation: ${countWords(LIE)} words, ${LIE.length} chars`,
    );
  }
  const path = outputPath();
  writeFileSync(path, LIE, "utf8");
  console.log(`Wrote ${LIE.length} characters to ${path}`);
}

main();
