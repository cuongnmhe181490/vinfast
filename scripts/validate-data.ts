import fs from "node:fs";
import path from "node:path";
import { carCollectionSchema } from "../src/data/schemas/car.schema";
import { validateGovernance } from "../src/lib/validation";

const carsDir = path.join(process.cwd(), "src", "data", "cars");
const reportPath = path.join(process.cwd(), "docs", "data-validation-report.md");

const files = fs
  .readdirSync(carsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

const rawCars = files.map((file) => {
  const fullPath = path.join(carsDir, file);
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as unknown;
});

const parsed = carCollectionSchema.safeParse(rawCars);

if (!fs.existsSync(path.dirname(reportPath))) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
}

if (!parsed.success) {
  const report = [
    "# Data Validation Report",
    "",
    `Generated at: ${new Date().toISOString()}`,
    "",
    "## Status",
    "",
    "FAILED - schema validation errors found.",
    "",
    "```json",
    JSON.stringify(parsed.error.format(), null, 2),
    "```",
    "",
  ].join("\n");
  fs.writeFileSync(reportPath, `\uFEFF${report}`, "utf8");
  process.exit(1);
}

const issues = validateGovernance(parsed.data);
const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warning");

const lines = [
  "# Data Validation Report",
  "",
  `Generated at: ${new Date().toISOString()}`,
  "",
  "## Status",
  "",
  errors.length ? "FAILED - blocking errors found." : "PASSED - no blocking errors found.",
  "",
  "## Summary",
  "",
  `- Files checked: ${files.length}`,
  `- Records checked: ${parsed.data.length}`,
  `- Errors: ${errors.length}`,
  `- Warnings: ${warnings.length}`,
  "",
  "## Warnings",
  "",
  warnings.length
    ? warnings.map((issue) => `- ${issue.modelId} / ${issue.field}: ${issue.message}`).join("\n")
    : "- None",
  "",
  "## Errors",
  "",
  errors.length
    ? errors.map((issue) => `- ${issue.modelId} / ${issue.field}: ${issue.message}`).join("\n")
    : "- None",
  "",
  "## Governance Notes",
  "",
  "- Missing optional specs must render as: Đang cập nhật từ nguồn chính thức.",
  "- Confidence score under 0.6 blocks use as primary technical data.",
  "- Official VinFast sources remain preferred over third-party media.",
  "",
];

fs.writeFileSync(reportPath, `\uFEFF${lines.join("\n")}`, "utf8");

if (errors.length) {
  process.exit(1);
}
