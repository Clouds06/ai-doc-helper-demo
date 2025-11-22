import { X, FileText } from 'lucide-react';

interface CitationPanelProps {
  onClose: () => void;
}

interface Citation {
  id: string;
  score: number;
  source: string;
  content: string;
}

export function CitationPanel({ onClose }: CitationPanelProps) {
  const citations: Citation[] = [
    {
      id: '1',
      score: 0.94,
      source: '技术架构设计.docx',
      content: '文档处理模块是RAG系统的第一个关键组件，负责将各种格式的文档转换为结构化的文本块。该模块支持PDF、DOCX、TXT、MD等多种文档格式，通过智能分块算法将长文档切分为语义完整的片段，每个片段大小通常控制在512-1024个token之间。'
    },
    {
      id: '2',
      score: 0.89,
      source: 'RAG系统设计文档.pdf',
      content: '向量数据库是存储和检索文档向量表示的核心基础设施。我们采用Milvus作为向量数据库方案，它提供了高性能的向量相似度检索能力，支持多种索引类型（如IVF、HNSW），能够在毫秒级别完成百万级向量的检索操作。'
    },
    {
      id: '3',
      score: 0.86,
      source: 'API接口文档.md',
      content: '检索模块负责根据用户查询进行语义检索。首先将用户问题通过Embedding模型转换为向量表示，然后在向量数据库中进行相似度检索，返回Top-K个最相关的文档片段。检索结果会按照相似度得分排序，通常K值设置为3-5之间。'
    },
    {
      id: '4',
      score: 0.82,
      source: '产品需求文档 v2.3.pdf',
      content: '生成模块整合检索到的上下文信息和用户问题，通过提示工程（Prompt Engineering）构建完整的输入，调用大语言模型生成最终答案。该模块支持多种LLM后端，包括GPT-4、Claude、通义千问等，并提供温度、top_p等参数调节生成的创造性和准确性。'
    }
  ];

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* 面板头部 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="text-gray-900">相关引用</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 引用列表 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {citations.map((citation, index) => (
            <div
              key={citation.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              {/* 排名和相似度 */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm">
                  {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">相似度:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {(citation.score * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* 来源文档 */}
              <div className="flex items-center gap-2 mb-3 text-gray-700">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{citation.source}</span>
              </div>

              {/* 命中内容 */}
              <div className="p-3 bg-white rounded border border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {citation.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <p className="text-gray-600 text-sm">
          共检索到 <strong className="text-blue-600">{citations.length}</strong> 条相关片段
        </p>
      </div>
    </div>
  );
}
