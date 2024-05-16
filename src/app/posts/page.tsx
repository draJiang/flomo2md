// 'use client'

import Image from 'next/image';
import type { Metadata } from "next";
import { getAllPosts } from "../lib/api"
import Link from 'next/link';

export const metadata: Metadata = {
    title: "博客-flomo2md",
    description: "分享学习、笔记相关的思考与方法",
};

export default function Faq() {

    const posts = getAllPosts()

    return (
        <main className='p-4 mt-2 md:mt-14 w-full max-w-2xl'>
            {posts.map((post) => <div className='mb-10' key={post.slug}>
                <Link href={`posts/${post.slug}`} className='flex flex-col'>
                    <h1 className='text-xl font-medium'>{post.title}</h1>
                    <p className='text-base leading-8 text-slate-700 dark:text-slate-300 mt-2'>{post.excerpt}</p>
                    <time className='text-base text-slate-400 dark:text-slate-400 mt-2'>{post.date}</time>
                </Link>
            </div>)}
        </main>

    );
}
