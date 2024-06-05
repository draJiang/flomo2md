import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../lib/api";
// import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import Tag from "@/app/ui/Tag";

export default async function Post({ params }: Params) {
    const post = getPostBySlug(params.slug, "_faqs");

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || "");

    return (
        <main className="prose dark:prose-invert px-4 mt-4 md:pt-10 w-full max-w-2xl" style={{ backgroundColor: 'unset' }}>
            <h1 className=" mb-2">{post.title}</h1>
            <Tag text={post.tag} />
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
    const post = getPostBySlug(params.slug, "_faqs");

    if (!post) {
        return notFound();
    }

    const title = `${post.title}`;
    const description = `${post.excerpt}`;

    return {
        title,
        description,
        openGraph: {
            title,
            //   images: [post.ogImage.url],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts("_faqs");

    return posts.map((post) => ({
        slug: post.slug,
    }));
}