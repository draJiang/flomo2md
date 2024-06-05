import React from 'react';
import Link from 'next/link';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {

    switch (text) {
        case "迁移":
            return (
                <Link className=' no-underline' href={`/faq/tag/${text}`}>
                    <span className="w-fit h-fit bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {text}
                    </span>
                </Link>
            );
            break;
        case "使用":
            return (
                <Link className=' no-underline' href={`/faq/tag/${text}`}>
                    <span className="w-fit h-fit bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        {text}
                    </span>
                </Link>
            );
            break;

        default:
            return (
                <Link  className=' no-underline'href={`/faq/tag/${text}`}>
                    <span className="w-fit h-fit bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        {text}
                    </span>
                </Link>
            )
            break;
    }


}

export default Tag;