// 'use client'

import type { Metadata } from "next";
import { getAllPosts } from "../lib/api"
import Link from 'next/link';
import Tag from '../ui/Tag';
import PostList from '@/app/ui/PostList'

export const metadata: Metadata = {
    title: "常见问题-flomo2md",
    description: "了解产品使用过程中可能存在的问题和解决方案",
};

export default function Faq() {

    const posts = getAllPosts("_faqs")

    return (
        <main className='p-4 mt-2 md:mt-14 w-full max-w-2xl'>
            <PostList href='faq' posts={posts} showTag={true} />
        </main>

    );
}




// // 'use client'

// import Image from 'next/image';
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "常见问题-flomo2md",
//     description: "了解产品使用过程中可能存在的问题和解决方案",
// };

// export default function Faq() {
//     return (
// <div className='prose dark:prose-invert p-4'>
//     <div>
//         <section>
//             <h2>🔒我的笔记安全吗？</h2>
//             <p>
//                 我们不会通过任何方式读取、分析你的笔记，插件的代码已在 <a href='https://github.com/draJiang/flomo2md-extention'>GitHub 开源</a> 。</p>
//         </section>

//         <section>
//             <h2>📵离线安装包如何使用？</h2>
//             <ol>
//                 <li>下载离线安装包后解压 zip 文件</li>
//                 <li>在浏览器中打开 chrome://extensions/</li>
//                 <li>开启 Developer mode</li>
//                 <li>点击 Load unpacked 载入安装包</li>
//                 <Image
//                     src='/chromeExtention.png' width={500} height={100} alt='载入离线安装包' />
//             </ol>
//         </section>

//         <section>
//             <h2>💵支持微信/支付宝付款吗？</h2>
//             <p>如果需要，可以<a  target='_blank' href='mailto:jzlong666@gmail.com?subject=flomo2md：'>联系邮箱</a>获取收款码、产品激活码</p>
//         </section>

//         <section>
//             <h2>🔍标题匹配的规则是什么？</h2>
//             <p>当开启「自动识别笔记标题作为文件名」时，将优先匹配 `# ` 符号开头的行（一级标题），若没有则默认取第 1 行文字作为标题（会自动剔除 Tag）。</p>
//         </section>

//         <section>
//             <h2>➡️如何导入 Heptabase？</h2>
//             <ol>
//                 <li>在 Heptabase 中点击导入</li>
//                 <li>选择导入「Obsidian」</li>
//                 <li>选择 flomo2md.zip 文件即可导入</li>
//             </ol>
//         </section>

//         <section>
//             <h2>📙复制笔记到剪切板时为什么不完整</h2>
//             <p>由于系统限制，单次最多只能复制 5000 字左右，若出现复制不完整的情况请尝试在 flomo 中筛选保留部分笔记后再进行复制。</p>
//         </section>
//     </div>
// </div>

//     );
// }
