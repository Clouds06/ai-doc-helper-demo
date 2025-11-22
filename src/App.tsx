import { useState } from 'react';
import { Home } from './components/Home';
import { DocumentManagement } from './components/DocumentManagement';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'documents' | 'chat'>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* 左侧产品名 - 可点击返回首页 */}
          <button 
            onClick={() => setCurrentTab('home')}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            RAG 文档知识库
          </button>
          
          {/* 右侧切换按钮 */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentTab('documents')}
              className={`px-6 py-2 rounded-md transition-all ${
                currentTab === 'documents'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              文档管理
            </button>
            <button
              onClick={() => setCurrentTab('chat')}
              className={`px-6 py-2 rounded-md transition-all ${
                currentTab === 'chat'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              对话问答
            </button>
          </div>
        </div>
      </header>

      {/* 功能区 */}
      <main className="h-[calc(100vh-73px)]">
        {currentTab === 'home' ? (
          <Home onNavigate={setCurrentTab} />
        ) : currentTab === 'documents' ? (
          <DocumentManagement />
        ) : (
          <ChatInterface />
        )}
      </main>
    </div>
  );
}