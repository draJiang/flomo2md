'use client'

import Link from 'next/link';
export default function BlogItem({
    title,
    summary,
    time,
}: {
    title: string;
    summary: string;
    time: string;
}) {
    return (
        <Link href={'/blogs/read'}>
            <div className='max-w-2xl mb-6 md:mb-8'>
                <h1 className="text-lg mb-2">{title}</h1>
                <p className='leading-8 text-gray-700 dark:text-gray-300'>{summary}</p>
                <time className='text-gray-600 dark:text-gray-400'>{time}</time>
            </div>
        </Link>
    );
}
