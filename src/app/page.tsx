'use client'

import Image from 'next/image';
import { saveAs } from 'file-saver';

export default function Home() {
  return (
    
      <div className="mx-auto  mt-16 md:mt-28 px-4 max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            flomo 导出 Markdown
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            双链🔗 | 标签🏷️ | 图片 🌄
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              onClick={() => {
                window.open('https://chromewebstore.google.com/detail/flomo2md/aojbpdcicmaopbmecfjkogighcinoaba')
              }}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              在 Chrome 商店中安装
            </a>
            <a
              href="#"
              onClick={async () => {

                const response = await fetch('https://raw.githubusercontent.com/draJiang/flomo2md/main/src/app/flomo2mdExtention.zip');
                const blob = await response.blob();
                saveAs(blob, 'flomo2mdExtention.zip');

              }}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              下载离线安装包 <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className='flex flex-col justify-center items-center mt-8 p-4'>
            <Image className='h-fit' width={600} height={100} src='/flomo2md1.png' alt='导出文件导入 Obsidian 的效果' />
            <p className='text-xs mt-1 text-center	text-slate-500'>导入 Obsidian 的效果</p>
          </div>

        </div>
      </div>

  );
}
