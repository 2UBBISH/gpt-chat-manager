import { useState, useMemo, useEffect } from 'react';
import CategoryTree from './components/CategoryTree';
import ChatRecordList from './components/ChatRecordList';
import ChatDetail from './components/ChatDetail';
import { Category, ChatRecord } from './types';
import ChatGPTService from './services/chatgpt';
import { LogIn, RefreshCw, AlertCircle } from 'lucide-react';

function App() {
  // 状态管理
  const [categories, setCategories] = useState<Category[]>([
    // 初始化默认分类
    {
      id: '1',
      name: 'ChatGPT聊天',
      parentId: null
    },
    {
      id: '2',
      name: '未分类',
      parentId: null
    }
  ]);
  // 🔴 新增：初始化默认聊天记录，确保页面加载时就能看到
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([
    {
      id: 'init-1',
      title: '初始测试记录1',
      categoryId: '1',
      messages: [
        {
          id: 'msg-init-1-1',
          role: 'user',
          content: '这是一条初始测试聊天记录，用于确保页面加载时就能看到聊天记录',
          timestamp: Date.now()
        },
        {
          id: 'msg-init-1-2',
          role: 'assistant',
          content: '这是助手的回复，用于测试聊天记录的显示效果',
          timestamp: Date.now()
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 'init-2',
      title: '初始测试记录2',
      categoryId: '1',
      messages: [
        {
          id: 'msg-init-2-1',
          role: 'user',
          content: '这是另一条初始测试聊天记录',
          timestamp: Date.now() - 3600000
        },
        {
          id: 'msg-init-2-2',
          role: 'assistant',
          content: '这是另一条助手的回复',
          timestamp: Date.now() - 3600000
        }
      ],
      createdAt: Date.now() - 3600000,
      updatedAt: Date.now() - 3600000
    }
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  
  // 新增：加载和登录状态
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 获取所有子分类ID
  const getAllChildCategoryIds = (categoryId: string, allCategories: Category[]): string[] => {
    const result: string[] = [categoryId];
    
    const findChildren = (id: string) => {
      allCategories.forEach(category => {
        if (category.parentId === id) {
          result.push(category.id);
          if (category.children) {
            findChildren(category.id);
          }
        }
      });
    };
    
    findChildren(categoryId);
    return result;
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

  // 加载ChatGPT聊天记录
  const loadChatRecords = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ChatGPTService.getChatRecords();
      
      if (result.error) {
        setError(result.error);
      } else {
        setCategories(result.categories);
        setChatRecords(result.chatRecords);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError('加载聊天记录失败，请检查网络连接或重新登录');
      console.error('Failed to load chat records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理登录
  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      console.log('Calling ChatGPTService.login()');
      const success = await ChatGPTService.login();
      console.log('Login result:', success);
      if (success) {
        // 登录成功后自动加载聊天记录
        setTimeout(() => {
          loadChatRecords();
        }, 1000);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('登录失败，请检查网络连接或重新登录');
    }
  };

  // 刷新聊天记录
  const handleRefresh = () => {
    loadChatRecords();
  };

  // 组件挂载时尝试直接加载聊天记录，处理缓存登录情况
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app, trying to load chat records directly (cached login)...');
        await loadChatRecords();
      } catch (error) {
        console.error('Failed to load chat records directly, triggering login flow:', error);
        // 如果直接加载失败，再触发登录流程
        handleLogin();
      }
    };

    initializeApp();
  }, []);

  // 监听登录成功事件，立即加载聊天记录
  useEffect(() => {
    try {
      const electronChatgpt = window.electronAPI.chatgpt;
      
      // 监听登录成功事件
      const removeLoginListener = electronChatgpt.onLoginSuccess(() => {
        console.log('Login success event received in App.tsx');
        setIsLoggedIn(true);
        // 暂时不调用loadChatRecords，因为会使用登录窗口直接获取
        // loadChatRecords();
      });
      
      // 🔴 新增：监听聊天记录事件（直接从登录窗口接收）
      const removeChatRecordsListener = electronChatgpt.onChatRecords((chatRecords) => {
        // 🧪 Debug日志：打印接收到的聊天记录
        console.log('✅ 直接从登录窗口收到聊天记录:', chatRecords.length);
        console.log('🧪 Debug: 接收到的聊天记录详细内容:', JSON.stringify(chatRecords, null, 2));
        
        // 转换为应用内部格式
        const records = chatRecords.map((record: any) => {
          // 🧪 Debug日志：打印单个聊天记录
          console.log('🧪 Debug: 处理单个聊天记录:', JSON.stringify(record, null, 2));
          
          // 创建默认消息
          const messages = [
            {
              id: `msg-${record.id}-1`,
              role: 'user',
              content: record.preview || 'No content',
              timestamp: record.createdAt
            },
            {
              id: `msg-${record.id}-2`,
              role: 'assistant',
              content: 'This is a placeholder for the assistant response.',
              timestamp: record.updatedAt
            }
          ];

          const convertedRecord = {
            id: record.id,
            title: record.title,
            categoryId: '1',
            messages,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
          };
          
          console.log('🧪 Debug: 转换后的聊天记录:', JSON.stringify(convertedRecord, null, 2));
          return convertedRecord;
        });
        
        // 🧪 Debug日志：打印转换后的所有聊天记录
        console.log('🧪 Debug: 转换后的聊天记录总数:', records.length);
        console.log('🧪 Debug: 转换后的聊天记录完整内容:', JSON.stringify(records, null, 2));
        
        // 更新状态
        console.log('🧪 Debug: 开始更新状态...');
        setChatRecords(records);
        setIsLoading(false);
        setIsLoggedIn(true);
        console.log('🧪 Debug: 状态更新完成');
        console.log('🧪 Debug: 当前chatRecords状态:', chatRecords.length);
        console.log('🧪 Debug: 当前isLoggedIn状态:', true);
      });
      
      return () => {
        removeLoginListener();
        removeChatRecordsListener();
      };
    } catch (error) {
      console.error('Failed to setup listeners in App:', error);
    }
  }, []);

  return (
    <div className="app">
      <div className="sidebar">
        {/* 添加登录和刷新按钮 */}
        <div className="sidebar-header">
          <h2>GPT 聊天记录</h2>
          <div className="sidebar-actions">
            {!isLoggedIn ? (
              <button 
                className="action-button login-button" 
                onClick={handleLogin}
                title="登录 ChatGPT"
              >
                <LogIn size={16} />
                <span>登录</span>
              </button>
            ) : (
              <button 
                className="action-button refresh-button" 
                onClick={handleRefresh}
                disabled={isLoading}
                title="刷新聊天记录"
              >
                <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
                <span>刷新</span>
              </button>
            )}
          </div>
        </div>
        
        {/* 错误提示 */}
        {error && (
          <div className="error-message">
            <AlertCircle size={14} />
            <span>{error}</span>
            <button className="error-close" onClick={() => setError(null)}>×</button>
          </div>
        )}
        
        {/* 分类树 */}
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
            {isLoading && <span className="loading-indicator">加载中...</span>}
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
}

export default App;

