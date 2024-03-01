import fs from "fs";
import path from "path";
import prettier from "prettier";
import sanitizeHtml from "sanitize-html";

async function formatHtml(html: string) {
  return await prettier.format(html, {
    parser: "html",
    endOfLine: "lf",
    printWidth: 150,
    __embeddedInHtml: true,
  });
}

/**
 * Expect two HTMLs to be identical, disregarding formatting differences
 */
async function compareHTML(actual: string, expected: string) {
  // Use prettier to avoid formatting discrepancies
  return (await formatHtml(actual)) === (await formatHtml(expected));
}

function readFile(...paths: string[]): string {
  return fs.readFileSync(path.join(...paths)).toString();
}

function fileExists(...paths: string[]): boolean {
  return fs.existsSync(path.join(...paths));
}

function readFileIfExists(...paths: string[]): string | null {
  if (!fileExists(...paths)) {
    return null;
  } else {
    return readFile(...paths);
  }
}

export { compareHTML, formatHtml, readFile, fileExists, readFileIfExists };
