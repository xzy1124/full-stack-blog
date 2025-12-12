// 此页面展示一个用户操作指南，包括如何注册、登录、创建帖子、评论帖子等。
/**
 * 点击用户头像可以修改账户信息和退出登录
 * 左上角的ziyanlog是一个导航，用户点击可以返回到主页面，和home的效果一样
 * trending代表7天之内的文章，most popular代表访问次数最多的文章
 * Newest和Oldest是最新排列和最旧排列
 * 首页的All Posts是全部文章页面，进去之后用户可以搜索匹配文章的标题，过滤文章，也可以根据类别查找文章
 * All Posts标签旁边的都是文章类别，用户可以点击类别筛选文章
 * 点击文章的作者可以展示此作者所有的文章
 * 首页的箭头动画是发布文章的导航点击可以去写文章，选择封面，标题，类别，和内容，内容可以插入图片和视频
 * 首页的01，02，03，04展示的是管理员的特色文章，
 * 点击任意一个文章的标题可以进去评论，收藏，和删除（仅限作者和管理员）
 * 评论可以作者和管理员进行删除
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

const steps = [
    {
        title: '注册 & 登录',
        icon: '🔐',
        content: [
            '点击右上角「Sign up」→ 填写用户名、邮箱、密码 → 点击「Create Account」。',
            '注册成功后，点击「Sign in」输入相同邮箱/密码即可登录。',
            '登录后鼠标移到头像 → 可更新资料或退出。',
        ],
    },
    {
        title: '浏览文章',
        icon: '🏠',
        content: [
            '首页「All Posts」展示全部文章；上方类别标签可点选快速筛选。',
            '搜索框支持按标题模糊搜索；右侧可切换 Newest / Oldest 排序。',
            '「trending」= 7 天内发布；「most popular」= 访问量最高。',
            '点击文章卡片 → 进入详情页，可阅读、收藏、评论。',
        ],
    },
    {
        title: '发布文章',
        icon: '✍️',
        content: [
            '点右下角「箭头浮动按钮」→ 进入 Write 页。',
            '依次填写：标题、选择封面、选择类别、输入正文（支持插入图片/视频）。',
            '点击「Send」立即发布；发布后跳转至文章详情页。',
        ],
    },
    {
        title: '评论 & 管理',
        icon: '💬',
        content: [
            '在文章底部输入框撰写评论 → 点击「Send」发送；发送后输入框自动清空。',
            '仅「作者」与「管理员」可见评论右侧的 delete 按钮，点击即可删除。',
            '点击作者昵称 → 跳转到该作者的全部文章列表页。',
        ],
    },
    {
        title: '特色文章区块',
        icon: '⭐',
        content: [
            '首页 01 / 02 / 03 / 04 为管理员精选的特色文章，点击卡片直接阅读。',
        ],
    },
]

export default function About() {
    const [openIdx, setOpenIdx] = useState(null)

    const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? null : idx))

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 顶部导航 */}
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-indigo-600 hover:text-indigo-800"
                    >
                        ziyanlog
                    </Link>
                    <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        返回首页
                    </Link>
                </div>
            </header>

            {/* 主体 */}
            <main className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">用户操作指南</h1>
                <p className="text-gray-500 mb-8">跟随下方步骤，一分钟上手 ziyanlog 全部功能。</p>

                <div className="space-y-4">
                    {steps.map((step, idx) => (
                        <section
                            key={idx}
                            className="bg-white rounded-2xl shadow hover:shadow-md transition"
                        >
                            <button
                                onClick={() => toggle(idx)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-2xl">{step.icon}</span>
                                    <span className="font-semibold text-gray-800">{step.title}</span>
                                </span>
                                {openIdx === idx ? (
                                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {openIdx === idx && (
                                <div className="px-5 pb-5 text-gray-600 space-y-2">
                                    {step.content.map((line, i) => (
                                        <p key={i} className="flex items-start gap-2">
                                            <span className="text-indigo-500 mt-1">•</span>
                                            <span>{line}</span>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* 底部提示 */}
                <footer className="mt-12 text-center text-sm text-gray-400">
                    仍有疑问？联系管理员或在评论区留言，我们会第一时间回复。
                </footer>
            </main>
        </div>
    )
}