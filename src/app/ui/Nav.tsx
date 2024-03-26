'use client'

import Image from 'next/image';

export default function Nav() {
    return (
        <header className="w-full border-b border-stone-800/10 dark:border-stone-800/60">

            <div className='m-4 md:px-8 flex items-center'>
                <div className='grow'>
                    <a href='/'>
                        <Image className='rounded-md' src='/icon256.png' width={24} height={24} alt='flomo2md' />
                    </a>
                </div>
                <div>
                    <a href='/faq'>🙋🏼常见问题</a>
                </div>

            </div>

        </header>
    );
}
