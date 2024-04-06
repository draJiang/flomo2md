import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../lib/api";
// import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
// import Alert from "@/app/_components/alert";
// import Container from "@/app/_components/container";
// import Header from "@/app/_components/header";
// import { PostBody } from "@/app/_components/post-body";
// import { PostHeader } from "@/app/_components/post-header";

// import 'github-markdown-css'

export default async function Post({ params }: Params) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || "");

    return (
        <main className="prose dark:prose-invert px-4 md:pt-10 w-full max-w-2xl" style={{ backgroundColor: 'unset' }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </main >
    );
}

type Params = {
    params: {
        slug: string;
    };
};

export function generateMetadata({ params }: Params): Metadata {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const title = `${post.title}`;

    return {
        title,
        openGraph: {
            title,
            //   images: [post.ogImage.url],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}