import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const loadEnvFile = (fileName) => {
  const filePath = join(rootDir, fileName);
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
};

loadEnvFile(".env");
loadEnvFile(".env.local");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !anonKey) {
  console.error("Eksik: VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY (.env)");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, anonKey);
const admin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

const tables = [
  { name: "products", phase: "A" },
  { name: "campaigns", phase: "B" },
  { name: "blog_posts", phase: "B" },
  { name: "admin_allowlist", phase: "B", serviceOnly: true }
];

let failed = false;

for (const table of tables) {
  const client = table.serviceOnly && admin ? admin : supabase;
  const { error, count } = await client
    .from(table.name)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(`[Faz ${table.phase}] ${table.name}: ${error.message}`);
    if (error.message.includes("does not exist")) {
      console.error(
        `  -> Supabase SQL Editor'de supabase/full-setup.sql calistirin.`
      );
    }
    failed = true;
  } else {
    console.log(`[Faz ${table.phase}] ${table.name}: OK (${count ?? 0} kayit)`);
  }
}

if (!serviceRoleKey) {
  console.warn("\nNot: SUPABASE_SERVICE_ROLE_KEY yok; admin_allowlist dogrulanmadi.");
  console.warn("Seed icin: npm run seed:products && npm run seed:content");
}

process.exit(failed ? 1 : 0);
