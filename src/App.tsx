import React, { useState, useMemo } from 'react';
import CategoryTree from './components/CategoryTree';
import ChatRecordList from './components/ChatRecordList';
import ChatDetail from './components/ChatDetail';
import { Category, ChatRecord } from './types';
import { mockCategories, mockChatRecords } from './data/mockData';

const App: React.FC = () => {
  const [categories] = useState<Category[]>(mockCategories);
  const [chatRecords] = useState<ChatRecord[]>(mockChatRecords);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // 获取所有子分类ID（包括自身）
  const getAllChildCategoryIds = (categoryId: string, cats: Category[]): string[] => {
    const ids: string[] = [categoryId];
    const findChildren = (parentId: string, categories: Category[]) => {
      categories.forEach((cat) => {
        if (cat.parentId === parentId) {
          ids.push(cat.id);
          if (cat.children) {
            findChildren(cat.id, cat.children);
          }
        }
      });
    };
    findChildren(categoryId, cats);
    return ids;
  };

  // 根据选中的分类过滤聊天记录
  const filteredRecords = useMemo(() => {
    if (selectedCategoryId === null) {
      return chatRecords;
    }
    const categoryIds = getAllChildCategoryIds(selectedCategoryId, categories);
    return chatRecords.filter((record) => categoryIds.includes(record.categoryId));
  }, [selectedCategoryId, chatRecords, categories]);

  // 获取当前选中的聊天记录
  const selectedRecord = useMemo(() => {
    return chatRecords.find((r) => r.id === selectedRecordId) || null;
  }, [selectedRecordId, chatRecords]);

  return (
    <div className="app">
      <div className="sidebar">
        <CategoryTree
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => {
            setSelectedCategoryId(id);
            setSelectedRecordId(null); // 切换分类时清空选中的记录
          }}
        />
      </div>
      <div className="main-content">
        <div className="chat-list-panel">
          <div className="panel-header">
            <h3>
              {selectedCategoryId === null
                ? '全部聊天记录'
                : `分类聊天记录 (${filteredRecords.length})`}
            </h3>
          </div>
          <ChatRecordList
            records={filteredRecords}
            selectedRecordId={selectedRecordId}
            onSelectRecord={setSelectedRecordId}
          />
        </div>
        <div className="chat-detail-panel">
          <ChatDetail record={selectedRecord} />
        </div>
      </div>
    </div>
  );
};

export default App;

