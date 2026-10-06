import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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
  'https://github.com/karkalashivareddy/Command-Argument-Passing-System',
  'https://github.com/karkalashivareddy/forgesense-industrial-intelligence',
  'https://github.com/karkalashivareddy/KLH_CSE_2026-27_DSA-3_S3_T17_Loginsight-Analyzer',
  'https://github.com/karkalashivareddy/DataBase-System-and-Distributed-Backend-Development',
  'https://github.com/karkalashivareddy/portfolio',
  'https://leetcode.com/u/KarkalaShivaReddy/',
  'https://www.codechef.com/users/shivareddy_27',
  'https://codeforces.com/profile/shiva_reddy_27',
  'https://www.geeksforgeeks.org/user/shiva0327/',
  'https://www.hackerrank.com/profile/karkalashivareddy',
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
const svgPaths = [];
function collectSvgPaths(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) collectSvgPaths(fullPath);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) {
      svgPaths.push(fullPath.slice(root.length + 1).replaceAll('\\', '/'));
    }
  }
}
const assetsRoot = resolve(root, 'assets');
if (existsSync(assetsRoot)) collectSvgPaths(assetsRoot);
for (const path of svgPaths) {
  if (!assetPaths.has(path)) fail(`unreferenced SVG asset: ${path}`);
}
if (svgPaths.some((path) => !assetPaths.has(path))) fail('every SVG must be referenced by the README');
let totalAssetBytes = 0;
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
  const assetBytes = statSync(assetPath).size;
  totalAssetBytes += assetBytes;
  if (assetBytes > 64 * 1024) fail(`SVG exceeds 64 KiB: ${relativePath} (${assetBytes} bytes)`);
  const svg = readFileSync(assetPath, 'utf8');
  const svgRoot = svg.match(/<svg\b([^>]*)>/i)?.[1] ?? '';
  const viewBoxText = svgRoot.match(/\bviewBox="([^"]+)"/i)?.[1];
  const viewBox = viewBoxText?.trim().split(/[\s,]+/).map(Number);
  if (!viewBox || viewBox.length !== 4 || viewBox.some((value) => !Number.isFinite(value)) || viewBox[2] <= 0 || viewBox[3] <= 0) {
    fail(`missing or invalid positive viewBox: ${relativePath}`);
  }
  for (const dimension of ['width', 'height']) {
    const value = svgRoot.match(new RegExp(`\\b${dimension}="([^"]+)"`, 'i'))?.[1];
    if (value && (!/^\d+(?:\.\d+)?(?:px)?$/.test(value) || Number.parseFloat(value) <= 0)) {
      fail(`invalid SVG ${dimension}: ${relativePath}`);
    }
  }
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((item) => item[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (!svg.includes('<svg') || !svg.includes('</svg>')) fail(`invalid SVG wrapper: ${relativePath}`);
  if (!/<title\b[^>]*>/.test(svg) || !/<desc\b[^>]*>/.test(svg)) fail(`SVG needs accessible title and description: ${relativePath}`);
  if (/<script\b|<foreignObject\b|<(?:animate|set)\b|(?:href|xlink:href)=["']https?:\/\/|url\(https?:\/\//i.test(svg)) {
    fail(`unsafe or external SVG content: ${relativePath}`);
  }
  if (duplicateIds.length) fail(`duplicate SVG ids in ${relativePath}: ${[...new Set(duplicateIds)].join(', ')}`);
  const declaredIds = new Set(ids);
  for (const match of svg.matchAll(/url\(#([^)]+)\)|(?:href|xlink:href)="#([^"]+)"/g)) {
    const id = match[1] ?? match[2];
    if (!declaredIds.has(id)) fail(`broken local SVG reference #${id} in ${relativePath}`);
  }
}
if (totalAssetBytes > 256 * 1024) fail(`SVG asset set exceeds 256 KiB: ${totalAssetBytes} bytes`);
if (svgPaths.length && failures.length === 0) pass(`all ${svgPaths.length} SVG assets exist, have valid dimensions, and total ${totalAssetBytes} bytes`);

const headings = [...readme.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => match[1].trim().toLowerCase());
const repeatedHeadings = headings.filter((heading, index) => headings.indexOf(heading) !== index);
if (repeatedHeadings.length) fail(`duplicate headings: ${[...new Set(repeatedHeadings)].join(', ')}`);
else pass('Markdown headings are unique');

const declaredAnchors = new Set([...readme.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
if (declaredAnchors.size !== [...readme.matchAll(/\bid="([^"]+)"/g)].length) fail('duplicate HTML anchor ids found');
const localAnchors = [...readme.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const anchor of localAnchors) {
  if (!declaredAnchors.has(anchor)) fail(`navigation points to missing anchor: #${anchor}`);
}
if (localAnchors.length && failures.length === 0) pass(`all ${localAnchors.length} navigation anchors resolve`);

const htmlTagStack = [];
const htmlTags = [...readme.matchAll(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi)];
for (const [tagMarkup, rawName] of htmlTags) {
  const name = rawName.toLowerCase();
  if (!['a', 'p', 'img'].includes(name)) {
    fail(`unsupported raw HTML tag: <${name}>`);
    continue;
  }
  if (name === 'img') {
    if (!/\balt="[^"]*"/.test(tagMarkup) || !/\bsrc="[^"]+"/.test(tagMarkup)) fail('image tag needs alt and src attributes');
    continue;
  }
  if (tagMarkup.startsWith('</')) {
    const openTag = htmlTagStack.pop();
    if (openTag !== name) fail(`mismatched HTML closing tag: </${name}>`);
  } else {
    htmlTagStack.push(name);
  }
}
if (htmlTagStack.length) fail(`unclosed HTML tags: ${htmlTagStack.join(', ')}`);
else if (htmlTags.length) pass(`all ${htmlTags.length} raw HTML tags are balanced; images have alt text`);

const fenceCount = [...readme.matchAll(/^```/gm)].length;
if (fenceCount % 2 !== 0) fail('unclosed Markdown fenced block');
else pass('Markdown fenced blocks are balanced');

const markdownLinks = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
for (const destination of markdownLinks) {
  if (/\s/.test(destination) || !/^(?:https:\/\/|mailto:|assets\/)/.test(destination)) {
    fail(`unexpected Markdown link destination: ${destination}`);
  }
}
if (failures.length === 0) pass(`all ${markdownLinks.length} Markdown links use expected destinations`);
const destinationCounts = new Map();
for (const destination of [
  ...[...readme.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]),
  ...markdownLinks,
]) destinationCounts.set(destination, (destinationCounts.get(destination) ?? 0) + 1);
const repeatedDestinations = [...destinationCounts].filter(([, count]) => count > 1);
if (repeatedDestinations.length) {
  console.log(`INFO repeated link destinations (${repeatedDestinations.length}); reviewed as navigation/contact/source repeats`);
} else {
  pass('no repeated link destinations');
}

const bytes = statSync(readmePath).size;
if (bytes > 16_000) fail(`README is ${bytes} bytes; target limit is 16000`);
else pass(`README size is ${bytes} bytes`);

const forbiddenClaims = /\b(?:10x engineer|guru|ninja|coding samurai|tech wizard|full stack beast|future ceo|ai guru)\b/i;
if (forbiddenClaims.test(readme)) fail('forbidden inflated identity language found');
else pass('no forbidden inflated identity claims');

// Adoption and reach claims are the ones that cannot be reproduced by running
// code, so they stay blocked: users, customers, stars, problem counts, contest
// ratings, and any coverage or accuracy percentage.
//
// Test counts are deliberately NOT in this list. Every one published in this
// README was produced by running that repository's own suite, and each is
// re-checked by that repository's CI on every push, so quoting it is a
// reproducible fact rather than a boast. This regex exists to stop invented
// numbers, not verified ones.
const fakeMetricClaims = /\b(?:\d+\s*(?:users?|customers?|stars?|problems?|contest rating)|\d+(?:\.\d+)?%\s*(?:coverage|accuracy))\b/i;
if (fakeMetricClaims.test(readme)) fail('unverified adoption or accuracy metric found');
else pass('no unverified adoption, rating, or accuracy claims');

// A percentage of any kind is still worth a human look, so surface one.
const percentageClaims = [...readme.matchAll(/\b\d+(?:\.\d+)?\s*%/g)].map((m) => m[0]);
if (percentageClaims.length) console.log(`INFO percentages present (${percentageClaims.join(', ')}); each must be traceable to a measurement`);
else pass('no percentage claims to verify');

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
];
if (secretPatterns.some((pattern) => pattern.test(readme))) fail('possible credential pattern found in README');
else pass('no common credential patterns found');

if (/backend\s+is\s+planned,?\s+not\s+implemented/i.test(readme)) fail('stale PharmaStock claim says backend is not implemented');
else pass('no stale PharmaStock backend claim');

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Profile validation complete. External URL reachability requires a network check.');
}
