'use client'
import Image from 'next/image';
import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import htmlToMarkdown from '@wcj/html-to-markdown';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

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
        <div className="grow flex flex-col items-center">
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
                                <Image width={640} height={240} className='max-h-60 w-fit my-2 rounded-sm' src='/fileImg.png' alt='文件夹结构示意图' />
                                最后在 Heptabase 中选择<strong>「导入 Obsidian」</strong>完成导入。
                            </p>
                        </li>
                    </ol>
                </div>

            </div>

        </div >
    )
}

export default FileUploader;
