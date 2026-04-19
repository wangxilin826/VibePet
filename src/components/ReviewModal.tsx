import React, { useState } from 'react';
import { Copy, X, CheckCircle, Check } from 'lucide-react';

interface ReviewModalProps {
  summary: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ summary, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAndClose = () => {
    navigator.clipboard.writeText(summary);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
        onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center text-white">
          <h2 className="font-bold flex items-center gap-2">
            <CheckCircle size={20} /> 每日复盘
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 mb-2">
            这是你今天的成就。已完成的任务已归档，未完成的任务已自动顺延至明天。
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-mono text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar">
            {summary}
          </div>

          <div className="mt-4 flex gap-3">
              <button
                onClick={handleCopy}
                className={`flex-1 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copied ? (
                    <><CheckCircle size={16} /> 已复制</>
                ) : (
                    <><Copy size={16} /> 复制</>
                )}
              </button>

              <button
                onClick={handleCopyAndClose}
                className="flex-[2] py-2.5 rounded-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
              >
                 <Check size={16} /> 复制并关闭
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
