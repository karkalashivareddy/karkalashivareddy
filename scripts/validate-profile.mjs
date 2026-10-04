import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = resolve(root, 'README.md');
const readme = readFileSync(readmePath, 'utf8');
const failures = [];
const pass = (label) => console.log(`PASS ${label}`);
const fail = (label) => failures.push(label);

const requiredUrls = [
  'https://github.com/karkalashivareddy',
  'https://www.linkedin.com/in/shiva-reddy-karkala-1a66b4397/',
  'https://codolio.com/profile/2520030105',
  'mailto:karkalashivareddy@gmail.com',
  'https://portfolio-shiva-c677.vercel.app',
  'https://github.com/karkalashivareddy/Command-Argument-Passing-System',
  'https://github.com/karkalashivareddy/forgesense-industrial-intelligence',
  'https://github.com/karkalashivareddy/KLH_CSE_2026-27_DSA-3_S3_T17_Loginsight-Analyzer',
];
for (const url of requiredUrls) {
  if (!readme.includes(url)) fail(`missing required destination: ${url}`);
}
if (failures.length === 0) pass(`all ${requiredUrls.length} required destinations present`);

const assetPaths = new Set();
for (const match of readme.matchAll(/(?:src|\]\()="?(assets\/[^\s"\)]+)|!\[[^\]]*\]\((assets\/[^\)]+)\)/g)) {
  const relativePath = match[1] ?? match[2];
  if (relativePath) assetPaths.add(relativePath);
}
if (assetPaths.size === 0) fail('no local profile assets referenced');
for (const relativePath of assetPaths) {
  const assetPath = resolve(root, relativePath);
  if (!assetPath.startsWith(`${root}/`) && !assetPath.startsWith(`${root}\\`)) {
    fail(`asset reference escapes repository: ${relativePath}`);
    continue;
  }
  if (!existsSync(assetPath)) {
    fail(`missing local asset: ${relativePath}`);
    continue;
  }
  const svg = readFileSync(assetPath, 'utf8');
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((item) => item[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (!svg.includes('<svg') || !svg.includes('</svg>')) fail(`invalid SVG wrapper: ${relativePath}`);
  if (/<script\b|<foreignObject\b|<(?:animate|set)\b|(?:href|xlink:href)=["']https?:\/\/|url\(https?:\/\//i.test(svg)) {
    fail(`unsafe or external SVG content: ${relativePath}`);
  }
  if (duplicateIds.length) fail(`duplicate SVG ids in ${relativePath}: ${[...new Set(duplicateIds)].join(', ')}`);
}
if (assetPaths.size && failures.length === 0) pass(`all ${assetPaths.size} referenced SVG assets exist and are self-contained`);

const headings = [...readme.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => match[1].trim().toLowerCase());
const repeatedHeadings = headings.filter((heading, index) => headings.indexOf(heading) !== index);
if (repeatedHeadings.length) fail(`duplicate headings: ${[...new Set(repeatedHeadings)].join(', ')}`);
else pass('Markdown headings are unique');

const declaredAnchors = new Set([...readme.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const localAnchors = [...readme.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const anchor of localAnchors) {
  if (!declaredAnchors.has(anchor)) fail(`navigation points to missing anchor: #${anchor}`);
}
if (localAnchors.length && failures.length === 0) pass(`all ${localAnchors.length} navigation anchors resolve`);

const markdownLinks = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
for (const destination of markdownLinks) {
  if (!/^(?:https:\/\/|mailto:|assets\/)/.test(destination)) {
    fail(`unexpected Markdown link destination: ${destination}`);
  }
}
if (failures.length === 0) pass(`all ${markdownLinks.length} Markdown links use expected destinations`);

const bytes = statSync(readmePath).size;
if (bytes > 16_000) fail(`README is ${bytes} bytes; target limit is 16000`);
else pass(`README size is ${bytes} bytes`);

const forbiddenClaims = /\b(?:10x engineer|guru|ninja|coding samurai|tech wizard|full stack beast|future ceo|ai guru)\b/i;
if (forbiddenClaims.test(readme)) fail('forbidden inflated identity language found');
else pass('no forbidden inflated identity claims');

const fakeMetricClaims = /\b(?:\d+\s*(?:users?|customers?|stars?|tests?|problems?|contest rating)|\d+(?:\.\d+)?%\s*(?:coverage|accuracy))\b/i;
if (fakeMetricClaims.test(readme)) fail('unverified numeric engineering metric found');
else pass('no numeric project metrics that need verification');

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
];
if (secretPatterns.some((pattern) => pattern.test(readme))) fail('possible credential pattern found in README');
else pass('no common credential patterns found');

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Profile validation complete. External URL reachability requires a network check.');
}
