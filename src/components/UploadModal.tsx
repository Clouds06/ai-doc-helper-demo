import { useState } from 'react';
import { X, Upload, File } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // 处理文件上传逻辑
  };

  const supportedFormats = {
    '文档类': ['PDF', 'DOCX', 'DOC', 'PPTX', 'XLSX', 'TXT', 'MD', 'RTF', 'ODT', 'EPUB', 'HTML', 'HTM', 'TEX'],
    '代码类': ['PY', 'JAVA', 'JS', 'TS', 'CPP', 'C', 'GO', 'RB', 'PHP', 'SWIFT', 'SQL', 'CSS', 'SCSS', 'LESS', 'SH', 'BAT'],
    '数据/配置': ['JSON', 'XML', 'YAML', 'YML', 'CSV', 'LOG', 'CONF', 'INI', 'PROPERTIES']
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        {/* 弹窗头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">上传文档</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6">
          {/* 上传区域 */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Upload className={`w-8 h-8 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="text-gray-900 mb-1">拖拽文件至此处，或点击选择文件</p>
                <p className="text-gray-500 text-sm">支持批量上传</p>
              </div>
              <input
                type="file"
                multiple
                accept=".txt,.md,.doc,.docx,.pdf,.pptx,.xlsx,.rtf,.odt,.epub,.html,.htm,.tex,.json,.xml,.yaml,.yml,.csv,.log,.conf,.ini,.properties,.sql,.bat,.sh,.c,.cpp,.py,.java,.js,.ts,.swift,.go,.rb,.php,.css,.scss,.less"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                选择文件
              </label>
            </div>
          </div>

          {/* 支持的文件类型 */}
          <div className="mt-6">
            <h4 className="text-gray-700 mb-4">支持的文件类型（40+ 格式）</h4>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>文档类：</strong>PDF, DOCX, DOC, PPTX, XLSX, TXT, MD, RTF, ODT, EPUB, HTML, HTM, TEX
              </p>
              <p>
                <strong>代码类：</strong>PY, JAVA, JS, TS, CPP, C, GO, RB, PHP, SWIFT, SQL, CSS, SCSS, LESS, SH, BAT
              </p>
              <p>
                <strong>数据/配置类：</strong>JSON, XML, YAML, YML, CSV, LOG, CONF, INI, PROPERTIES
              </p>
            </div>
          </div>

          {/* 文件大小限制说明 */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>提示：</strong>单个文件大小不超过 100 MB，建议上传结构化文档以获得更好的检索效果。
            </p>
          </div>
        </div>

        {/* 弹窗底部按钮 */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            开始上传
          </button>
        </div>
      </div>
    </div>
  );
}