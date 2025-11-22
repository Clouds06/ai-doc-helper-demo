import { useState } from 'react';
import { Send, ChevronLeft, ChevronRight, Plus, Settings, ThumbsUp, ThumbsDown } from 'lucide-react';
import { CitationPanel } from './CitationPanel';
import { SettingsModal } from './SettingsModal';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  highlights?: Array<{ text: string; startIndex: number; endIndex: number }>;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
}

export function ChatInterface() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCitationPanel, setShowCitationPanel] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedConversation, setSelectedConversation] = useState('1');

  const [conversations] = useState<Conversation[]>([
    { id: '1', title: 'RAG系统架构讨论', lastMessage: '关于向量数据库的选择...' },
    { id: '2', title: 'API文档查询', lastMessage: '如何调用文档检索接口？' },
    { id: '3', title: '产品需求咨询', lastMessage: '用户权限管理的具体要求' }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: '请介绍一下 RAG 系统的核心架构和关键组件'
    },
    {
      id: '2',
      role: 'assistant',
      content: '根据文档内容，RAG（检索增强生成）系统的核心架构主要包含以下关键组件：\n\n1. **文档处理模块**：负责文档的解析、分块和向量化，支持多种格式如PDF、DOCX、TXT等。\n\n2. **向量数据库**：存储文档切片的向量表示，常用的方案包括Milvus、Pinecone或Weaviate，支持高效的相似度检索。\n\n3. **检索模块**：基于用户查询进行语义检索，返回Top-K个最相关的文档片段，通常使用余弦相似度或欧氏距离进行度量。\n\n4. **生成模块**：将检索到的上下文与用户问题结合，通过大语言模型生成准确、相关的回答。\n\n整个系统的优势在于结合了检索的准确性和生成的灵活性，能够有效减少模型幻觉问题。',
      highlights: [
        { text: '文档处理模块', startIndex: 41, endIndex: 47 },
        { text: '向量数据库', startIndex: 95, endIndex: 100 },
        { text: '检索模块', startIndex: 154, endIndex: 158 },
        { text: '生成模块', startIndex: 219, endIndex: 223 }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '这是一个模拟的AI回复。在实际应用中，这里会调用后端API获取基于RAG的回答。'
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const renderMessageContent = (message: Message) => {
    if (message.role === 'user' || !message.highlights) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    const parts = [];
    let lastIndex = 0;

    const sortedHighlights = [...message.highlights].sort((a, b) => a.startIndex - b.startIndex);

    sortedHighlights.forEach((highlight, index) => {
      // 添加高亮前的文本
      if (highlight.startIndex > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {message.content.substring(lastIndex, highlight.startIndex)}
          </span>
        );
      }

      // 添加高亮文本
      parts.push(
        <span
          key={`highlight-${index}`}
          className="bg-blue-100 text-blue-800 px-1 rounded cursor-pointer hover:bg-blue-200 transition-colors"
          onClick={() => setShowCitationPanel(true)}
        >
          {highlight.text}
        </span>
      );

      lastIndex = highlight.endIndex;
    });

    // 添加剩余文本
    if (lastIndex < message.content.length) {
      parts.push(
        <span key="text-end">
          {message.content.substring(lastIndex)}
        </span>
      );
    }

    return <p className="whitespace-pre-wrap">{parts}</p>;
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* 左侧对话历史栏 */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          isSidebarCollapsed ? 'w-0' : 'w-80'
        }`}
      >
        {!isSidebarCollapsed && (
          <>
            <div className="p-4 border-b border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                新建对话
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-gray-700 mb-3">对话历史</h3>
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConversation === conv.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <p className="text-gray-900 mb-1">{conv.title}</p>
                    <p className="text-gray-500 text-sm truncate">{conv.lastMessage}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 中间对话主区域 */}
      <div className="flex-1 flex flex-col relative">
        {/* 顶部工具栏 */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            模型设置
          </button>
        </div>

        {/* 对话消息区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    {renderMessageContent(message)}
                  </div>
                </div>
                {/* AI回答的交互按钮 */}
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-2 ml-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 底部输入框 */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                发送
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧相关引用面板 */}
      {showCitationPanel && (
        <CitationPanel onClose={() => setShowCitationPanel(false)} />
      )}

      {/* 设置/评测弹窗 */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
}