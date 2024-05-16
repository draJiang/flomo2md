---
title: "文本相关度分析助力学习与笔记"
excerpt: 在笔记之间找到关联，发现新的洞见
date: "2022-02-16"
---

# 文本相关度分析助力学习与笔记

项目地址：<https://github.com/draJiang/flomo-linker>（flomo 获取笔记的方式已经失效，项目待更新，以下作为一种思路参考）

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/s%27s%27pai20220221000701.png)

文本相关度，顾名思义，就是可以对比两段文本的相关程度。

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/NfvAC220220220224554.jpg)

接下来分享一个案例，介绍文本相关度分析在学习、记笔记场景下的应用。

---

使用卡片笔记快 1 年，实践下来感受非常不错，帮助完成了许多启发和学习收获，但过程中也存在一些困难。

## S 情境

卡片笔记发挥作用的关键原则是建立卡片与卡片之间的链接（双向链接），新笔记（新知识）和旧笔记（已有知识）链接，**新知识加入已有的知识体系才算真正的理解并在未来有机会辅助实践**。

所以每次**新建笔记后，与已有笔记完成链接是一个重要的环节。**

目前的流程是靠大脑回忆是否存在相关的笔记，而人脑由于记忆力等原因，总是会存在缺漏。

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/%E6%96%87%E6%9C%AC%E7%9B%B8%E5%85%B3%E5%BA%A6%E5%88%86%E6%9E%90%E5%8A%A9%E5%8A%9B%E7%AC%94%E8%AE%B0%E4%B8%8E%E5%AD%A6%E4%B9%A0.00320220220232203.png)

## T 任务

受到[少数派文章](https://sspai.com/post/71093)的启发，思考能否利用文本相关度分析做一个工具，在新建笔记之后自动推荐一些相关笔记辅助链接的建立，由于在用 flomo 践行卡片笔记法，所以要基于 flomo 搭建工具。

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/%E6%96%87%E6%9C%AC%E7%9B%B8%E5%85%B3%E5%BA%A6%E5%88%86%E6%9E%90%E5%8A%A9%E5%8A%9B%E7%AC%94%E8%AE%B0%E4%B8%8E%E5%AD%A6%E4%B9%A0.00420220220232233.png)

## A 行动

前端部分，利用 React 框架和蚂蚁组件快速完成了交互界面的搭建；为了防止意外造成笔记数据的丢失（写到一半浏览器奔溃）异常，本地做了实时的数据存储，让笔记记录更有安全感。

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/%E6%96%87%E6%9C%AC%E7%9B%B8%E5%85%B3%E5%BA%A6%E5%88%86%E6%9E%90%E5%8A%A9%E5%8A%9B%E7%AC%94%E8%AE%B0%E4%B8%8E%E5%AD%A6%E4%B9%A0.00520220220232302.png)

后端部分，由于 flomo 没有开放的 get api 所以通过爬虫获取所有笔记数据，再用 Python 的 gensim 插件构建基础数据用于后续的相关度分析。

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/%E6%96%87%E6%9C%AC%E7%9B%B8%E5%85%B3%E5%BA%A6%E5%88%86%E6%9E%90%E5%8A%A9%E5%8A%9B%E7%AC%94%E8%AE%B0%E4%B8%8E%E5%AD%A6%E4%B9%A0.00620220220232310.png)

gensim 的功能可以简单理解为输入两句话，它将分析相关度，并以一个 0～1 的小数显示，越接近 1 相关度越大

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220221122525.jpg)

## R 结果

完成了一个简单的卡片笔记关联工具，在输入框输入笔记后下方将显示可能存在关联的笔记，帮助用户完成线索的链接和思维的发散。日常已经在使用，的确可以帮助笔记之间完成链接。

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/nfzojy20220220223345.png)

关于工具的忧虑，和以下网友的相同：

![](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/zmyOuz20220220232743.jpg)

担心依赖机器算法推荐，更难去主动做一些复习和整理。不过先用着吧 😄