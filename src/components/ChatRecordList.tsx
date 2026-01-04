import React from 'react';
import { ChatRecord } from '../types';
import { MessageSquare, Clock } from 'lucide-react';

interface ChatRecordListProps {
  records: ChatRecord[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string) => void;
}

const ChatRecordList: React.FC<ChatRecordListProps> = ({
  records,
  selectedRecordId,
  onSelectRecord,
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return '今天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  if (records.length === 0) {
    return (
      <div className="chat-record-list empty">
        <div className="empty-state">
          <MessageSquare size={48} />
          <p>该分类下暂无聊天记录</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-record-list">
      {records.map((record) => (
        <div
          key={record.id}
          className={`chat-record-item ${selectedRecordId === record.id ? 'selected' : ''}`}
          onClick={() => onSelectRecord(record.id)}
        >
          <div className="record-header">
            <MessageSquare size={16} className="record-icon" />
            <span className="record-title">{record.title}</span>
          </div>
          <div className="record-preview">
            {record.messages[0]?.content.substring(0, 60)}
            {record.messages[0]?.content.length > 60 ? '...' : ''}
          </div>
          <div className="record-footer">
            <Clock size={12} />
            <span className="record-time">{formatDate(record.updatedAt)}</span>
            <span className="record-count">{record.messages.length} 条消息</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRecordList;

