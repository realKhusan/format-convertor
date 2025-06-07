import yaml from "js-yaml"
import Papa from "papaparse"

type SupportedFormat = "json" | "javascript" | "typescript" | "csv" | "yaml"

/**
 * Converts data from one format to another
 * @param input The input string to convert
 * @param inputFormat The format of the input string
 * @param outputFormat The desired output format
 * @returns The converted string in the desired format
 */
export function convertFormat(input: string, inputFormat: SupportedFormat, outputFormat: SupportedFormat): string {
  // Parse the input to a JavaScript object
  let data: any

  try {
    switch (inputFormat) {
      case "json":
        data = JSON.parse(input)
        break
      case "javascript":
        // Remove variable declarations and semicolons
        const jsCode = input.replace(/const|let|var|\s*=\s*|;/g, "")
        // Use Function constructor to evaluate the JavaScript object
        data = new Function(`return ${jsCode}`)()
        break
      case "typescript":
        // For TypeScript, we'll try to extract values from interface/type
        // This is a simplified approach and won't work for all TS definitions
        const tsCode = input
          .replace(/interface|type|\s*=\s*|;|:|\{|\}/g, " ")
          .replace(/string/g, '"string"')
          .replace(/number/g, "0")
          .replace(/boolean/g, "false")
          .replace(/any/g, "null")
        try {
          data = JSON.parse(`{${tsCode}}`)
        } catch (e) {
          throw new Error("Could not parse TypeScript interface. Please provide a simple interface.")
        }
        break
      case "csv":
        const csvResult = Papa.parse(input, { header: true })
        data = csvResult.data
        break
      case "yaml":
        data = yaml.load(input)
        break
      default:
        throw new Error(`Unsupported input format: ${inputFormat}`)
    }
  } catch (error) {
    throw new Error(`Error parsing ${inputFormat}: ${error instanceof Error ? error.message : String(error)}`)
  }

  // Convert the JavaScript object to the output format
  try {
    switch (outputFormat) {
      case "json":
        return JSON.stringify(data, null, 2)
      case "javascript":
        return `const data = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, "$1:")};`
      case "typescript":
        return generateTypeScriptInterface(data)
      case "csv":
        return Papa.unparse(Array.isArray(data) ? data : [data])
      case "yaml":
        return yaml.dump(data)
      default:
        throw new Error(`Unsupported output format: ${outputFormat}`)
    }
  } catch (error) {
    throw new Error(`Error converting to ${outputFormat}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Generates a TypeScript interface from a JavaScript object
 * @param data The JavaScript object
 * @param interfaceName The name of the interface
 * @returns A TypeScript interface definition
 */
function generateTypeScriptInterface(data: any, interfaceName = "Root"): string {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return `interface ${interfaceName} {}\n\ntype ${interfaceName}Array = ${interfaceName}[];`
    }

    // Use the first item as a sample for the array type
    const sampleItem = data[0]
    const itemInterface = generateTypeScriptInterface(sampleItem, `${interfaceName}Item`)
    return `${itemInterface}\n\ntype ${interfaceName} = ${interfaceName}Item[];`
  }

  if (typeof data !== "object" || data === null) {
    return `type ${interfaceName} = ${typeof data};`
  }

  let result = `interface ${interfaceName} {\n`

  for (const [key, value] of Object.entries(data)) {
    const propertyType = getTypeScriptType(value, `${interfaceName}${capitalizeFirstLetter(key)}`)
    result += `  ${key}: ${propertyType};\n`
  }

  result += "}"
  return result
}

/**
 * Gets the TypeScript type for a value
 * @param value The value to get the type for
 * @param nestedInterfaceName The name for nested interfaces
 * @returns The TypeScript type as a string
 */
function getTypeScriptType(value: any, nestedInterfaceName: string): string {
  if (value === null) return "null"
  if (Array.isArray(value)) {
    if (value.length === 0) return "any[]"
    const itemType = getTypeScriptType(value[0], `${nestedInterfaceName}Item`)
    return `${itemType}[]`
  }
  if (typeof value === "object") {
    // For nested objects, we could recursively generate interfaces
    // But for simplicity, we'll just use 'object' type
    return "object"
  }
  return typeof value
}

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns The capitalized string
 */
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
