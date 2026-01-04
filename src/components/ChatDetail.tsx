import React from 'react';
import { ChatRecord } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatDetailProps {
  record: ChatRecord | null;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ record }) => {
  if (!record) {
    return (
      <div className="chat-detail empty">
        <div className="empty-state">
          <Bot size={64} />
          <p>选择一条聊天记录查看详情</p>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chat-detail">
      <div className="detail-header">
        <h2>{record.title}</h2>
        <div className="detail-meta">
          <span>共 {record.messages.length} 条消息</span>
          <span>更新时间：{formatTime(record.updatedAt)}</span>
        </div>
      </div>
      <div className="messages-container">
        {record.messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${message.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="message-avatar">
              {message.role === 'user' ? (
                <User size={20} />
              ) : (
                <Bot size={20} />
              )}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-role">
                  {message.role === 'user' ? '用户' : 'Assistant'}
                </span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
              <div className="message-text">{message.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDetail;

