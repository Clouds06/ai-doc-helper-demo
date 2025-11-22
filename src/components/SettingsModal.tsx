import { useState } from 'react';
import { X, Play, CheckCircle, XCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'evaluation'>('settings');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [systemPrompt, setSystemPrompt] = useState('你是一个专业的文档知识库助手，请基于提供的上下文信息准确回答用户问题。');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(false);

  const promptTemplates = [
    { label: '专业助手', value: '你是一个专业的文档知识库助手，请基于提供的上下文信息准确回答用户问题。' },
    { label: '友好助手', value: '你是一个友好、耐心的AI助手，请用简洁易懂的语言回答用户的问题，确保回答基于文档内容。' }
  ];

  const testCases = [
    { id: '1', question: 'RAG系统的核心组件有哪些？', status: 'pending' as const },
    { id: '2', question: '向量数据库使用的是什么方案？', status: 'pending' as const },
    { id: '3', question: '文档分块的大小控制在多少token？', status: 'pending' as const },
    { id: '4', question: '系统支持哪些文档格式？', status: 'pending' as const },
    { id: '5', question: '检索模块的Top-K值一般设置为多少？', status: 'pending' as const },
    { id: '6', question: '生成模块支持哪些大语言模型？', status: 'pending' as const },
    { id: '7', question: 'Embedding模型的选择标准是什么？', status: 'pending' as const },
    { id: '8', question: '如何优化检索的准确性？', status: 'pending' as const }
  ];

  const [testResults, setTestResults] = useState(testCases);

  const handleEvaluation = () => {
    setIsEvaluating(true);
    setEvaluationComplete(false);

    // 模拟评测过程
    testResults.forEach((test, index) => {
      setTimeout(() => {
        setTestResults(prev =>
          prev.map(t =>
            t.id === test.id
              ? { ...t, status: Math.random() > 0.2 ? 'success' : 'failed' }
              : t
          )
        );

        if (index === testResults.length - 1) {
          setIsEvaluating(false);
          setEvaluationComplete(true);
        }
      }, (index + 1) * 500);
    });
  };

  const successCount = testResults.filter(t => t.status === 'success').length;
  const failedCount = testResults.filter(t => t.status === 'failed').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 弹窗头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">模型设置</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab切换 */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            参数设置
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'evaluation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            一键评测
          </button>
        </div>

        {/* Tab内容 */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'settings' ? (
            <div className="space-y-6">
              {/* Temperature滑块 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-700">Temperature</label>
                  <span className="text-blue-600">{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-gray-500 text-sm mt-1">
                  控制输出的随机性，值越大输出越随机
                </p>
              </div>

              {/* Top P滑块 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-700">Top P</label>
                  <span className="text-blue-600">{topP.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={topP}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-gray-500 text-sm mt-1">
                  核采样参数，控制输出多样性
                </p>
              </div>

              {/* 预设模板下拉 */}
              <div>
                <label className="text-gray-700 mb-2 block">预设模板</label>
                <select
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">选择预设模板...</option>
                  {promptTemplates.map((template, index) => (
                    <option key={index} value={template.value}>
                      {template.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 系统提示词输入框 */}
              <div>
                <label className="text-gray-700 mb-2 block">系统提示词</label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="输入系统提示词..."
                />
                <p className="text-gray-500 text-sm mt-1">
                  定义AI助手的角色和回答风格
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 评测说明 */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>评测说明：</strong>
                  将使用预设的测试样例对当前RAG系统进行自动化评测，检验检索准确性和回答质量。
                </p>
              </div>

              {/* 测试样例列表 */}
              <div>
                <h4 className="text-gray-700 mb-3">测试样例 ({testResults.length})</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {testResults.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="text-gray-700 text-sm flex-1">{test.question}</span>
                      <div className="ml-3">
                        {test.status === 'success' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {test.status === 'failed' && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        {test.status === 'pending' && (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 执行评测按钮 */}
              <button
                onClick={handleEvaluation}
                disabled={isEvaluating}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Play className="w-5 h-5" />
                {isEvaluating ? '评测中...' : '执行评测'}
              </button>

              {/* 评测结果指标 */}
              {evaluationComplete && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-gray-700 mb-4">评测结果</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-600 text-sm mb-1">样例数</div>
                      <div className="text-gray-900">{testResults.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-600 text-sm mb-1">准确率</div>
                      <div className="text-blue-600">
                        {((successCount / testResults.length) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-600 text-sm mb-1">相关性</div>
                      <div className="text-green-600">
                        {(Math.random() * 0.15 + 0.85).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-600 text-sm mb-1">响应时间</div>
                      <div className="text-purple-600">
                        {(Math.random() * 500 + 800).toFixed(0)} ms
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 弹窗底部按钮 */}
        {activeTab === 'settings' && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              保存
            </button>
          </div>
        )}
      </div>
    </div>
  );
}