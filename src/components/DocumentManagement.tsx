import { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { UploadModal } from './UploadModal';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadTime: string;
  status: '完成' | '失败';
}

export function DocumentManagement() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: '产品需求文档 v2.3.pdf',
      size: '2.4 MB',
      uploadTime: '2025-11-22 10:30',
      status: '完成'
    },
    {
      id: '2',
      name: '技术架构设计.docx',
      size: '1.8 MB',
      uploadTime: '2025-11-22 09:15',
      status: '完成'
    },
    {
      id: '3',
      name: 'API接口文档.md',
      size: '156 KB',
      uploadTime: '2025-11-21 16:45',
      status: '完成'
    },
    {
      id: '4',
      name: '用户手册.pdf',
      size: '3.2 MB',
      uploadTime: '2025-11-21 14:20',
      status: '完成'
    },
    {
      id: '5',
      name: '数据字典.txt',
      size: '89 KB',
      uploadTime: '2025-11-20 11:00',
      status: '失败'
    },
    {
      id: '6',
      name: '系统配置文件.json',
      size: '45 KB',
      uploadTime: '2025-11-20 10:15',
      status: '完成'
    },
    {
      id: '7',
      name: '项目代码示例.py',
      size: '234 KB',
      uploadTime: '2025-11-19 16:30',
      status: '完成'
    },
    {
      id: '8',
      name: '数据分析报告.xlsx',
      size: '1.2 MB',
      uploadTime: '2025-11-19 14:00',
      status: '完成'
    }
  ]);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="h-full bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 搜索框和上传按钮 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索文档名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            上传文档
          </button>
        </div>

        {/* 文档列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-gray-700">文档名称</th>
                <th className="text-left px-6 py-4 text-gray-700">大小</th>
                <th className="text-left px-6 py-4 text-gray-700">上传时间</th>
                <th className="text-left px-6 py-4 text-gray-700">状态</th>
                <th className="text-left px-6 py-4 text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{doc.name}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.uploadTime}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        doc.status === '完成'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除文档"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? '未找到匹配的文档' : '暂无文档，请上传文档'}
            </div>
          )}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-6">
            <p className="text-gray-600 text-sm">
              显示 {startIndex + 1} - {Math.min(endIndex, filteredDocuments.length)} 条，共 {filteredDocuments.length} 条
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="px-4 py-2 text-gray-700">
                第 {currentPage} / {totalPages} 页
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 上传弹窗 */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}