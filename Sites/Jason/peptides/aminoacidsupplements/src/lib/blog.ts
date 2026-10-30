import fs from 'fs';
import path from 'path';
import { BlogPostArticle } from '@/types';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getAllBlogPosts(): BlogPostArticle[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIR);
  const posts: BlogPostArticle[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith('.json')) {
      const filePath = path.join(POSTS_DIR, fileName);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const postData = JSON.parse(fileContents) as BlogPostArticle;
        posts.push(postData);
      } catch (err) {
        console.error(`Error reading blog post ${fileName}:`, err);
      }
    }
  }

  // Sort descending by ISO date
  return posts.sort((a, b) => {
    return new Date(b.isoDate || b.publishedDate).getTime() - new Date(a.isoDate || a.publishedDate).getTime();
  });
}

export function getBlogPostBySlug(slug: string): BlogPostArticle | null {
  const cleanSlug = slug.replace(/\/$/, '');
  const filePath = path.join(POSTS_DIR, `${cleanSlug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents) as BlogPostArticle;
  } catch (err) {
    console.error(`Error reading blog post with slug ${slug}:`, err);
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''));
}
