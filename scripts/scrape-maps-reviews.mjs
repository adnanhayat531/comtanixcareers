import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outJson = path.join(__dirname, "google-reviews-scraped.json");

const PLACE_URL =
  "https://www.google.com/maps/place/Comtanix/@33.4977501,73.0704028,17z/data=!4m8!3m7!1s0x38df95f8d0000001:0x3b57baa0437d08ab!8m2!3d33.4977501!4d73.0704028!9m1!1b1!16s%2Fg%2F11fmqy91pv";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    viewport: { width: 1400, height: 900 },
  });

  await page.goto(PLACE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(5000);

  for (const sel of ['button:has-text("Accept all")', 'button:has-text("Accept")']) {
    const btn = page.locator(sel).first();
    if (await btn.count()) {
      try {
        await btn.click({ timeout: 1500 });
      } catch {
        /* */
      }
    }
  }

  // Ensure reviews tab
  const reviewsTab = page.locator('button:has-text("Reviews"), [role="tab"]:has-text("Reviews")').first();
  if (await reviewsTab.count()) {
    try {
      await reviewsTab.click({ timeout: 3000 });
    } catch {
      /* */
    }
  }
  await page.waitForTimeout(2000);

  // Expand "More" on reviews
  for (let i = 0; i < 8; i++) {
    const more = page.locator('button:has-text("More"), button:has-text("See more")');
    const n = await more.count();
    for (let j = 0; j < Math.min(n, 6); j++) {
      try {
        await more.nth(j).click({ timeout: 800 });
      } catch {
        /* */
      }
    }
    await page.mouse.wheel(0, 1400);
    await page.waitForTimeout(700);
  }

  const data = await page.evaluate(() => {
    const reviews = [];
    const seen = new Set();
    const cards = [...document.querySelectorAll("div[data-review-id]")];

    for (const card of cards) {
      const quote = (card.querySelector(".wiI7pd")?.innerText || "").trim();
      if (quote.length < 8 || seen.has(quote)) continue;

      const author = (card.querySelector(".d4r55")?.innerText || "").trim();
      if (!author) continue;

      const img = card.querySelector('img[src*="googleusercontent"]');
      let photoUrl = img?.src || null;
      if (photoUrl) {
        photoUrl = photoUrl.replace(/=w\d+-h\d+/, "=w120-h120");
      }

      const starsEl = card.querySelector('span[role="img"][aria-label*="star"]');
      const sm = (starsEl?.getAttribute("aria-label") || "").match(/(\d)/);
      const rating = sm ? Number(sm[1]) : 5;
      const dateLabel = (card.querySelector(".rsqaWe")?.innerText || "").trim();
      const authorUrl =
        card.querySelector('button[data-href*="contrib"]')?.getAttribute("data-href") ||
        card.querySelector('a[href*="/contrib/"]')?.href ||
        "";

      seen.add(quote);
      reviews.push({ author, photoUrl, rating, dateLabel, quote, authorUrl });
    }

    let score = 4.8;
    let count = 86;
    const body = document.body.innerText || "";
    const m = body.match(/(\d\.\d).{0,40}?(\d+)\s+reviews/i);
    if (m) {
      score = Number(m[1]);
      count = Number(m[2]);
    }
    return { url: location.href, score, count, reviews };
  });

  await browser.close();
  fs.writeFileSync(outJson, JSON.stringify(data, null, 2), "utf8");
  console.log("reviews", data.reviews.length, "count", data.count);
  console.log(data.reviews.map((r) => r.author).join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
