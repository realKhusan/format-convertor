/**
 * Converts between JSON and JavaScript object formats
 * @param input The input string to convert
 * @param isJsonToJs true for JSON to JS, false for JS to JSON
 * @returns The converted string
 */
export function convertFormat(input: string, isJsonToJs: boolean): string {
  if (!input.trim()) {
    throw new Error("Please enter some data to convert");
  }

  try {
    if (isJsonToJs) {
      // JSON to JavaScript
      const data = JSON.parse(input);
      return `const data = ${JSON.stringify(data, null, 2).replace(
        /"([^"]+)":/g,
        "$1:"
      )};`;
    } else {
      // JavaScript to JSON
      // Remove variable declarations and semicolons
      let jsCode = input.trim();

      // Remove common JS patterns
      jsCode = jsCode.replace(/^(const|let|var)\s+\w+\s*=\s*/, "");
      jsCode = jsCode.replace(/;$/, "");

      // Try to evaluate the JavaScript object
      const data = new Function(`return ${jsCode}`)();
      return JSON.stringify(data, null, 2);
    }
  } catch (error) {
    const format = isJsonToJs ? "JSON" : "JavaScript";
    throw new Error(
      `Invalid ${format} format: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
