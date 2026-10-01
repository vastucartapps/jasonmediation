#!/usr/bin/env node

/**
 * protect-email.js
 * Injects Cloudflare's <!--email_off--> and <!--/email_off--> comments
 * around email addresses in static HTML files to prevent Cloudflare edge regex
 * from replacing emails with 404 links to /cdn-cgi/l/email-protection.
 *
 * React 19 / Next.js 15 SSR strips HTML comments during export, so this post-build
 * step ensures the static files served to Cloudflare contain the official exclusion comments.
 */

const fs = require('fs');
const path = require('path');

const TARGETS = [
  {
    dir: path.resolve(__dirname, '../Sites/aldertonfamilymediation/out'),
    email: 'enquiries@aldertonfamilymediation.co.uk',
  },
  {
    dir: path.resolve(__dirname, '../Sites/cavendishfamilymediation/out'),
    email: 'enquiries@cavendishfamilymediation.co.uk',
  },
];

function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

function protectEmailsInHtml(content, email) {
  // We need to protect occurrences of the email in HTML body (outside <script> tags)
  // that are NOT already wrapped in <!--email_off-->
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const scripts = [];
  
  // Stash scripts with placeholders
  const placeholderContent = content.replace(scriptRegex, (match) => {
    scripts.push(match);
    return `___SCRIPT_PLACEHOLDER_${scripts.length - 1}___`;
  });

  const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rawEmailRegex = new RegExp(`(?<!<!--email_off-->)(${escapedEmail})(?!<!--/email_off-->)`, 'g');
  let protectedContent = placeholderContent.replace(rawEmailRegex, '<!--email_off-->$1<!--/email_off-->');

  // Restore scripts
  scripts.forEach((script, idx) => {
    protectedContent = protectedContent.replace(`___SCRIPT_PLACEHOLDER_${idx}___`, () => script);
  });

  return protectedContent;
}

function run() {
  console.log('[protect-email] Protecting email addresses from Cloudflare obfuscation...');
  let totalModified = 0;

  for (const target of TARGETS) {
    if (!fs.existsSync(target.dir)) {
      console.warn(`[protect-email] Directory not found: ${target.dir}`);
      continue;
    }

    const htmlFiles = getAllHtmlFiles(target.dir);
    for (const file of htmlFiles) {
      const original = fs.readFileSync(file, 'utf8');
      const updated = protectEmailsInHtml(original, target.email);
      if (updated !== original) {
        fs.writeFileSync(file, updated, 'utf8');
        totalModified++;
        console.log(`  Protected: ${path.relative(target.dir, file)}`);
      }
    }
  }

  console.log(`[protect-email] Successfully wrapped emails with <!--email_off--> in ${totalModified} files.\n`);
}

if (require.main === module) {
  run();
}
