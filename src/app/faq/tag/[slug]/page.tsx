// 'use client'

import Image from 'next/image';
import type { Metadata } from "next";
import { getAllPosts } from "@/app/lib/api"
import Link from 'next/link';
import Tag from '@/app/ui/Tag';
import PostList from '@/app/ui/PostList'

export const metadata: Metadata = {
    title: "常见问题-flomo2md",
    description: "了解产品使用过程中可能存在的问题和解决方案",
};

export default function FaqTag({ params }: Params) {
    const tagName = decodeURIComponent(params.slug)
    const posts = getAllPosts("_faqs").filter(faq => faq.tag === tagName)
    console.log(tagName);
    console.log(posts);

    return (
        <main className='p-4 mt-2 md:mt-14 w-full max-w-2xl'>
            <h1 className='text-xl font-medium mb-10'>
                # {tagName}
            </h1>
            <PostList href='faq' posts={posts} showTag={true} />
        </main>

    );
}

type Params = {
    params: {
        slug: string;
    };
};