'use client'

import Nav from '../ui/Nav'
import Image from 'next/image';
import BackgroundColor from '../ui/backgroundColor'

export default function Faq() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Nav />
            <BackgroundColor />
            <div className='m-8 md:m-20 text-sm'>
                <h1 className='text-4xl text-center'>FAQ</h1>
                <div className='mt-8 md:mt-16'>
                    <section className='mb-8'>
                        <h2 className='mb-2'>📵离线安装包如何使用</h2>
                        <ol className='list-decimal list-inside	text-slate-600 dark:text-slate-400'>
                            <li>下载离线安装包后解压 zip 文件</li>
                            <li>在浏览器中打开 chrome://extensions/</li>
                            <li>开启 Developer mode</li>
                            <li>点击 Load unpacked 载入安装包</li>
                            <Image
                                className='rounded-md mt-2'
                                src='/chromeExtention.png' width={500} height={100} alt='载入离线安装包' />
                        </ol>
                    </section>
                    <section className='mb-8'>
                        <h2 className='mb-2'>➡️如何导入 Heptabase</h2>
                        <ol className='list-decimal list-inside	text-slate-600 dark:text-slate-400'>
                            <li>在 Heptabase 中点击导入</li>
                            <li>选择导入「Obsidian」</li>
                            <li>选择 flomo2md.zip 文件即可导入</li>
                        </ol>
                    </section>
                </div>
            </div>

        </main>
    );
}
