#!/usr/bin/env node
// Parse the ITE Genocide CD XML → emit F# content modules.
// Emits WitnessesContent.fs, TimelineContent.fs, PhotobookContent.fs
// with placeholder empty lists where data isn't yet ingested.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const CD = "C:/Users/gareg/OneDrive/Desktop/ITE GENOCIDE/genocide";
const OUT = "C:/Users/gareg/OneDrive/Desktop/armenian-genocide-1915-1923/src/Pages";

const R2 = "https://pub-08eca9699d664ab7b8f0d1fa87b15515.r2.dev/genocide";

function unescapeXml(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r?\n{3,}/g, "\n\n")
    .trim();
}

function escFs(s) {
  return (s || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, "\\\"")
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n");
}

// ── Witnesses ──────────────────────────────────────────────
function buildWitnesses() {
  const engXml = readFileSync(join(CD, "data/eyewitnesses/eyewitnesses_eng.xml"), "utf8");
  const itemRe = /<eyewitnesses_eng>\s*<country>(\d+)<\/country>\s*<title>([\s\S]*?)<\/title>\s*<description>([\s\S]*?)<\/description>\s*<\/eyewitnesses_eng>/g;
  const items = [];
  let m;
  while ((m = itemRe.exec(engXml)) !== null) {
    const country = m[1] === "1" ? "Armenian" : "Foreign";
    const title = unescapeXml(m[2]);
    const description = unescapeXml(m[3]);
    items.push({ country, title, description });
  }
  console.log(`[witnesses] parsed ${items.length} testimonies`);

  let out = `module Pages.WitnessesContent

// Auto-generated from ITE Genocide CD eyewitnesses_eng.xml. Do not hand-edit.

type Testimony = { Country: string; Title: string; Body: string }

let testimonies : Testimony[] = [|
`;
  for (const t of items) {
    out += `  { Country = "${escFs(t.country)}"; Title = "${escFs(t.title)}"; Body = "${escFs(t.description)}" }\n`;
  }
  out += `|]\n`;
  writeFileSync(join(OUT, "WitnessesContent.fs"), out, "utf8");
  console.log(`[witnesses] wrote WitnessesContent.fs (${(out.length/1024).toFixed(1)} KB)`);
}

// ── Timeline ───────────────────────────────────────────────
function buildTimeline() {
  const engPath = join(CD, "data/timeline/timeline_eng.xml");
  const raw = readFileSync(engPath, "utf8");
  // Try to detect the item shape flexibly.
  const items = [];
  const itemRe = /<timeline_eng>([\s\S]*?)<\/timeline_eng>/g;
  let m;
  while ((m = itemRe.exec(raw)) !== null) {
    const block = m[1];
    const date  = /<date>([\s\S]*?)<\/date>/.exec(block)?.[1] ?? "";
    const title = /<title>([\s\S]*?)<\/title>/.exec(block)?.[1] ?? "";
    const desc  = /<description>([\s\S]*?)<\/description>/.exec(block)?.[1] ?? "";
    items.push({
      date:  unescapeXml(date),
      title: unescapeXml(title),
      body:  unescapeXml(desc),
    });
  }
  console.log(`[timeline] parsed ${items.length} entries`);

  let out = `module Pages.TimelineContent

type Entry = { Date: string; Title: string; Body: string }

let entries : Entry[] = [|
`;
  for (const it of items) {
    out += `  { Date = "${escFs(it.date)}"; Title = "${escFs(it.title)}"; Body = "${escFs(it.body)}" }\n`;
  }
  out += `|]\n`;
  writeFileSync(join(OUT, "TimelineContent.fs"), out, "utf8");
  console.log(`[timeline] wrote TimelineContent.fs`);
}

// ── Photobook ──────────────────────────────────────────────
function buildPhotobook() {
  const catRaw = readFileSync(join(CD, "data/photobook/category_eng.xml"), "utf8");
  const photosRaw = readFileSync(join(CD, "data/photobook/photos_eng.xml"), "utf8");

  // Categories are <photothemes> blocks with <id> + <theme>.
  const catRe = /<photothemes>([\s\S]*?)<\/photothemes>/g;
  const cats = new Map();
  let m;
  while ((m = catRe.exec(catRaw)) !== null) {
    const id    = /<id>([^<]+)<\/id>/.exec(m[1])?.[1]?.trim() ?? "";
    const theme = /<theme>([\s\S]*?)<\/theme>/.exec(m[1])?.[1]?.trim() ?? id;
    cats.set(id, unescapeXml(theme));
  }

  // Photos: <title>, <source>, <theme> (padded numeric), <picture> = filename.
  const photoRe = /<photos_eng>([\s\S]*?)<\/photos_eng>/g;
  const photos = [];
  while ((m = photoRe.exec(photosRaw)) !== null) {
    const block = m[1];
    const title    = /<title>([\s\S]*?)<\/title>/.exec(block)?.[1] ?? "";
    const source   = /<source>([\s\S]*?)<\/source>/.exec(block)?.[1] ?? "";
    const themeRaw = /<theme>([^<]*)<\/theme>/.exec(block)?.[1] ?? "";
    const filename = /<picture>([^<]+)<\/picture>/.exec(block)?.[1] ?? "";
    const themeId  = themeRaw.replace(/^0+/, "") || themeRaw;
    if (filename) {
      const caption = [title, source].filter(Boolean).map(unescapeXml).join(" ");
      photos.push({
        category: cats.get(themeId) || `Theme ${themeId}`,
        filename: basename(filename.trim()),
        caption,
      });
    }
  }
  console.log(`[photobook] parsed ${cats.size} categories, ${photos.length} photos`);

  let out = `module Pages.PhotobookContent

type Photo = { Category: string; Filename: string; Url: string; Caption: string }

// Emitted as an array (not a list) to avoid Fable AST stack overflow
// on very large literals.
let photos : Photo[] = [|
`;
  for (const p of photos) {
    const url = `${R2}/photos/normal/${p.filename}`;
    out += `  { Category = "${escFs(p.category)}"; Filename = "${escFs(p.filename)}"; Url = "${url}"; Caption = "${escFs(p.caption)}" }\n`;
  }
  out += `|]\n`;
  writeFileSync(join(OUT, "PhotobookContent.fs"), out, "utf8");
  console.log(`[photobook] wrote PhotobookContent.fs`);
}

buildWitnesses();
buildTimeline();
buildPhotobook();
console.log("Done.");
