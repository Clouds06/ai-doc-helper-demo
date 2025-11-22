import { useState } from 'react';
import { Plus, FileText, MessageSquare, Upload, ArrowRight, Database, Sparkles } from 'lucide-react';
import { UploadModal } from './UploadModal';

interface HomeProps {
  onNavigate: (tab: 'home' | 'documents' | 'chat') => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // 模拟数据
  const documentCount = 5;
  const conversationCount = 3;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* 顶部区域 */}
        <div className="mb-12">
          <h1 className="text-blue-600 mb-3">知识助手</h1>
          <p className="text-gray-600 max-w-2xl">
            你的 AI 驱动知识库。上传文档，通过自然对话获取即时答案
          </p>
        </div>

        {/* 数据概览卡片 */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">{documentCount}</div>
                  <p className="text-gray-600">已上传文档</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('documents')}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 group"
            >
              查看所有文档
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">{conversationCount}</div>
                  <p className="text-gray-600">对话会话</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('chat')}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 group"
            >
              查看所有会话
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 快捷操作区 */}
        <div className="mb-12">
          <h3 className="text-gray-900 mb-6">快捷操作</h3>
          <div className="grid grid-cols-3 gap-6">
            {/* 上传文档卡片 */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Upload className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-gray-900 mb-2">上传文档</h4>
              <p className="text-gray-600 text-sm">支持文档、代码、数据等 40+ 种格式</p>
            </button>

            {/* 创建知识库卡片 */}
            <button
              onClick={() => onNavigate('documents')}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 transition-colors">
                <Database className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-gray-900 mb-2">管理文档</h4>
              <p className="text-gray-600 text-sm">构建新的 AI 驱动知识库</p>
            </button>

            {/* 开始对话卡片 */}
            <button
              onClick={() => onNavigate('chat')}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                <Sparkles className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-gray-900 mb-2">开始对话</h4>
              <p className="text-gray-600 text-sm">通过 AI 从知识库中获取即时答案</p>
            </button>
          </div>
        </div>

        {/* 如何使用板块 */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h3 className="text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">?</span>
            </span>
            如何使用
          </h3>
          <div className="space-y-6">
            {/* 步骤1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  1
                </div>
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">创建知识库</h4>
                <p className="text-gray-600">
                  开始构建你的知识库。上传文档并组织内容以创建 AI 驱动的知识中心，系统会自动分析和索引所有上传的文件。
                </p>
              </div>
            </div>

            {/* 步骤2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  2
                </div>
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">上传文档</h4>
                <p className="text-gray-600">
                  添加 PDF、Word、Markdown 或文本文件。系统支持多种文档格式，会自动处理和向量化文档内容，为智能检索做好准备。
                </p>
              </div>
            </div>

            {/* 步骤3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">开始对话</h4>
                <p className="text-gray-600">
                  通过自然语言提问，AI 会智能检索相关文档片段并生成准确回答。支持多轮对话，让知识获取更加高效便捷。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 上传弹窗 */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}