import * as fs from 'fs';
import * as path from 'path';

interface PostValidationResult {
  valid: boolean;
  slug: string;
  errors: string[];
  warnings: string[];
}

export function validatePostFile(filePath: string): PostValidationResult {
  const result: PostValidationResult = {
    valid: true,
    slug: path.basename(filePath, '.json'),
    errors: [],
    warnings: [],
  };

  if (!fs.existsSync(filePath)) {
    result.valid = false;
    result.errors.push(`File does not exist: ${filePath}`);
    return result;
  }

  let post: any;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    post = JSON.parse(raw);
  } catch (err: any) {
    result.valid = false;
    result.errors.push(`Invalid JSON format: ${err.message}`);
    return result;
  }

  // 1. Slug check
  if (!post.slug || post.slug !== result.slug) {
    result.errors.push(`Slug mismatch: file is "${result.slug}.json" but post.slug is "${post.slug}"`);
  }

  // 2. Meta Title check (<= 60 chars)
  const titleToCheck = post.metaTitle || post.title || '';
  if (!titleToCheck) {
    result.errors.push('Missing post title and metaTitle!');
  } else {
    // Check with brand suffix if not present
    let fullTitle = titleToCheck;
    if (!fullTitle.includes('AminoAcidSupplements')) {
      fullTitle = `${fullTitle} | AminoAcidSupplements`;
    }
    if (fullTitle.length > 60) {
      result.errors.push(`Title exceeds 60 characters (${fullTitle.length} chars): "${fullTitle}"`);
    } else if (titleToCheck.length < 15) {
      result.errors.push(`Title too short (${titleToCheck.length} chars): "${titleToCheck}"`);
    }
  }

  // 3. Meta Description check (<= 160 chars)
  const descToCheck = post.metaDescription || post.tldr || '';
  if (!descToCheck) {
    result.errors.push('Missing post metaDescription and tldr!');
  } else {
    if (descToCheck.length > 160) {
      result.errors.push(`Meta description exceeds 160 characters (${descToCheck.length} chars): "${descToCheck}"`);
    } else if (descToCheck.length < 50) {
      result.errors.push(`Meta description too short (${descToCheck.length} chars < 50): "${descToCheck}"`);
    }
  }

  // 4. Word count check (>= 1800 words)
  const wordCount = post.wordCount || 0;
  if (wordCount < 1800) {
    result.warnings.push(`Word count is below 1,800 words (${wordCount} words)`);
  }

  // 5. Minimum FAQs count (>= 5)
  const faqs = post.faqs || [];
  if (faqs.length < 5) {
    result.errors.push(`Minimum 5 FAQs required! Found only ${faqs.length}`);
  }

  // 6. Minimum References / Sources count (>= 3)
  const sources = post.sources || [];
  if (sources.length < 3) {
    result.errors.push(`Minimum 3 academic references required! Found only ${sources.length}`);
  }

  // 7. Hero Image check
  if (!post.heroImage || !post.heroImage.url) {
    result.errors.push('Missing heroImage.url!');
  } else {
    const imgRelPath = post.heroImage.url.replace(/^\//, '');
    const fullImgPath = path.join(__dirname, '..', 'public', imgRelPath);
    if (!fs.existsSync(fullImgPath)) {
      result.errors.push(`Hero image does not exist on disk: public/${imgRelPath}`);
    }
    if (!post.heroImage.alt || post.heroImage.alt.trim().length < 5) {
      result.errors.push('Missing or too short heroImage.alt tag!');
    }
  }

  // 8. Sections and Table of Contents check
  const sections = post.sections || [];
  if (sections.length < 3) {
    result.errors.push(`Article must have at least 3 main sections! Found ${sections.length}`);
  }

  const toc = post.tableOfContents || [];
  if (toc.length < 3) {
    result.errors.push(`Table of Contents must have at least 3 entries! Found ${toc.length}`);
  }

  if (result.errors.length > 0) {
    result.valid = false;
  }

  return result;
}

// CLI usage
if (require.main === module) {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.json'));

  console.log(`\n==========================================`);
  console.log(` POST VALIDATION AUDITOR (STRICT GUARDRAILS)`);
  console.log(`==========================================`);

  let totalErrors = 0;
  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const res = validatePostFile(fullPath);
    if (!res.valid) {
      console.log(`❌ [${res.slug}] FAILED VALIDATION:`);
      for (const err of res.errors) {
        console.log(`   - ERROR: ${err}`);
        totalErrors++;
      }
    } else {
      console.log(`✓ [${res.slug}] PASSED (All limits & thresholds satisfied)`);
    }
    for (const warn of res.warnings) {
      console.log(`   - WARNING: ${warn}`);
    }
  }

  console.log(`==========================================`);
  if (totalErrors === 0) {
    console.log(`🏆 ALL POSTS COMPLIANT WITH ZERO VALIDATION ERRORS!\n`);
    process.exit(0);
  } else {
    console.error(`💥 DETECTED ${totalErrors} CRITICAL POST VALIDATION ERRORS!\n`);
    process.exit(1);
  }
}
