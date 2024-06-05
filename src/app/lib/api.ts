import { Post } from "@/interfaces/post";
import { log } from "console";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// 存放 posts 的目录
// const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(directory: string) {
  const postsDirectory = join(process.cwd(), directory);
  console.log('postsDirectory');
  console.log(postsDirectory);
  
  return fs.readdirSync(postsDirectory);
}

// 获取 md 文件的名称以及属性
export function getPostBySlug(slug: string, directory: string) {
  
  
  const realSlug = slug.replace(/\.md$/, "");
  const postsDirectory = join(process.cwd(), directory);
  console.log('postsDirectory:');
  console.log(postsDirectory);
  console.log(realSlug);
  console.log(slug);
  
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(directory: string): Post[] {
  // 获取所有文字的 sulg
  const slugs = getPostSlugs(directory);
  console.log('slugs:');
  console.log(slugs);
  
  // 通过 sulg 获取文章内容
  const posts = slugs
    .map((slug) => getPostBySlug(slug, directory))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
