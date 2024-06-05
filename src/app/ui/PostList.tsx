'use client'
import { Post } from "@/interfaces/post";
import Link from 'next/link';
import Tag from '@/app/ui/Tag';

type Params = {
    posts: Post[];
    showTag?: boolean;
    showExcerpt?: boolean;
    showTime?: boolean;
    href: string;
};

const PostList: React.FC<Params> = ({
    posts = [],
    showTag = false,
    showExcerpt = false,
    showTime = false,
    href
}) => {

    return (
        <>
            <ul>
                {posts.map((post) => <div className='mb-10' key={post.slug}>
                    <li className='flex flex-col'>
                        <div className="flex flex-row flex-wrap gap-1 items-center" >
                            <Link href={`/${href}/${post.slug}`} className='flex flex-col'>
                                <h1 className='text-xl font-medium hover:underline underline-offset-4'>{post.title}</h1>
                            </Link>
                            {showTag && <Tag text={post.tag} />}
                        </div>
                        {showExcerpt && <p className='text-base leading-8 text-slate-700 dark:text-slate-300 mt-2'>{post.excerpt}</p>}
                        {showTime && <time className='text-base text-slate-400 dark:text-slate-400 mt-2'>{post.date}</time>}
                    </li>
                </div>)}
            </ul>
        </>
    );

}

export default PostList;