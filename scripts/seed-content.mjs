import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
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

const { staticCampaignDefinitions, staticBlogPosts } = await import(
  new URL("../src/data/campaigns.js", import.meta.url).href
);

const { campaignDefinitionToRow, blogPostToRow } = await import(
  new URL("../src/lib/contentTransforms.js", import.meta.url).href
);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Eksik: VITE_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY (.env içinde) gerekli."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const campaignRows = staticCampaignDefinitions.map((campaign, index) =>
  campaignDefinitionToRow({ ...campaign, sortOrder: index })
);

const { error: campaignError } = await supabase
  .from("campaigns")
  .upsert(campaignRows, { onConflict: "slug" });

if (campaignError) {
  console.error("Kampanya seed hatası:", campaignError.message);
  process.exit(1);
}

const blogRows = staticBlogPosts.map((post, index) =>
  blogPostToRow({ ...post, sortOrder: index })
);

const { error: blogError } = await supabase
  .from("blog_posts")
  .upsert(blogRows, { onConflict: "slug" });

if (blogError) {
  console.error("Blog seed hatası:", blogError.message);
  process.exit(1);
}

console.log(
  `Seed tamam: ${campaignRows.length} kampanya, ${blogRows.length} blog yazısı.`
);
