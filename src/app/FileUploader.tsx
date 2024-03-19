'use client'
import Image from 'next/image';
import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import htmlToMarkdown from '@wcj/html-to-markdown';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import fileImg from './fileImg.png'

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const hiddenFileInput = useRef<HTMLInputElement>(null);


    // 文件选择处理器
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]
        console.log(file);

        if (file) {

            // setSelectedFile(file)
            handleFileRead(file)

        }

        // 每次处理完文件之后，都清空 input 的值
        event.target.value = "";
    }

    // 从 html 中提取 memo
    const parseMemos = (htmlString: string) => {
        // 创建一个 DOM Parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // 选择所有的 '.memo' 元素
        const memos = doc.querySelectorAll('.memo');

        // 创建一个数组，存储转换后的 memo 对象
        const memoArr = Array.from(memos).map(memo => {
            // 捕获各自的孩子元素并获取其内容
            const time = (memo.querySelector('.time') as HTMLElement)?.innerText;
            const content = (memo.querySelector('.content') as HTMLElement)?.innerHTML;
            const files = (memo.querySelector('.files') as HTMLElement)?.innerHTML;

            // 返回单个笔记的 HTML，其中包含 memo 元素的各个子元素的内容
            // return {
            //     time,
            //     content,
            //     files,
            // };

            return `
            ${content}
            ${time}
            ${files}
            `


        });

        return memoArr;
    }


    // html 转为 md 格式
    const html2md = async (htmlString: string) => {

        const markdownStr = await htmlToMarkdown({ html: htmlString });
        return markdownStr
    }

    // 下载笔记
    const createZipFileFromMarkdownStrings = async (strings: Array<string>, filename: string) => {
        const zip = new JSZip();

        // 遍历每一个字符串
        strings.forEach((str, i) => {
            const title = str.split('\n')[0]
            // 在 zip 文件中添加一个新的 md 文件
            const newStr = str.replace('\\', '')
            zip.file(`${i + 1}.md`, newStr);
        });

        // 生成 zip 文件并保存到用户设备
        const content = await zip.generateAsync({ type: 'blob' });
        FileSaver.saveAs(content, filename);
    }

    // 从文件读取 html 字符串
    const handleFileRead = (selectedFile: File) => {

        if (!selectedFile) return;
        const reader = new FileReader();
        reader.onload = async function (event) {
            const result = event.target?.result;
            if (typeof result === 'string') {

                const htmlStrList = parseMemos(result);

                const mdPromises = htmlStrList.map((memo: string) => html2md(memo));
                const mdList = await Promise.all(mdPromises);

                createZipFileFromMarkdownStrings(mdList, 'flomo2md')
            }
        };
        reader.readAsText(selectedFile);
    }

    // 点击上传文件
    const handleClick = () => {
        hiddenFileInput.current!.click();
    };

    return (
        <div className="space-y-4 flex h-screen flex-col items-center">
            <div className='grow'>

                <div className='py-20 px-8 flex flex-col items-center'>
                    <div className="mx-auto max-w-7xl lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
                            <h1 className="text-4xl font-bold tracking-tight dark:text-gray-300 text-gray-900 sm:text-6xl">
                                flomo 导出 Markdown
                            </h1>
                            {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                            pulvinar et feugiat blandit at. In mi viverra elit nunc.
                        </p> */}
                        </div>
                    </div>
                    <div className='pt-10'>
                        <input
                            ref={hiddenFileInput}
                            type="file"
                            accept=".html"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleClick}
                            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            上传 HTML 文件
                        </button>

                    </div>
                </div>

                <div className='flex flex-col px-8'>
                    <h3 className='mt-2 font-bold tracking-tight text-gray-900 dark:text-gray-400'>使用说明</h3>
                    <ol className="flex flex-col mt-2 text-sm text-gray-500 leading-7">
                        <li>
                            <p className="">
                                1️⃣ 在 <a className='hover:text-indigo-700 text-indigo-600' href='https://v.flomoapp.com/mine?source=account'>flomo</a> 中导出笔记的 HTML 文件。
                            </p>
                        </li>
                        <li>
                            <p className="">
                                2️⃣ 上传 HTML 文件即可获得所有笔记的 md 格式压缩包。<br />
                                💡如果你需要上传到 Heptabase 中，可以将所有 md 文件和 flomo 导出的 <code className=''>file</code> 文件夹放在同一个目录下，<br /> 然后将它们一起打包成 <code className='py-0.5 px-1 bg-gray-800 text-white rounded-md text-sm font-mono'>zip</code> 格式，解压后的结构如下：
                                <Image className='max-h-60 w-fit my-2 rounded-sm' src={fileImg} alt='文件夹结构示意图' />
                                最后在 Heptabase 中选择<strong>「导入 Obsidian」</strong>完成导入。
                            </p>
                        </li>
                    </ol>
                </div>

            </div>

            <footer className="">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        {/* <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://notes.dabing.one" className="hover:underline">Jiang</a>. All Rights Reserved.
                        </span> */}
                        <div className="flex mt-4 sm:justify-center items-center sm:mt-0">
                            {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a> */}
                            {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                </svg>
                                <span className="sr-only">Discord community</span>
                            </a> */}
                            <a href="https://twitter.com/arui_kisi" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a href="https://github.com/draJiang/flomo2md" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">GitHub account</span>
                            </a>

                            <span className='border-r-2 h-4 border-gray-300 dark:border-gray-700 ms-5'></span>

                            <a href="https://jiang.lemonsqueezy.com/checkout/buy/ad4c8d9a-ece8-471f-9706-cb01408ed625" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <span className="">请我喝杯咖啡☕</span>
                            </a>
                            {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Dribbble account</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </footer>



        </div >
    )
}

export default FileUploader;
