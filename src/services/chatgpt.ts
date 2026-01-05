import { Category, ChatRecord, ChatMessage } from '../types';

// 添加electronAPI的类型声明
declare global {
  interface Window {
    electronAPI: {
      chatgpt: {
        login: () => Promise<{ success: boolean }>;
        getChatRecords: () => Promise<{ success: boolean; data?: any[]; error?: string }>;
        onLoginSuccess: (callback: () => void) => () => void;
      };
    };
  }
}

// 登录状态管理
let isLoggedIn = false;

// 从electronAPI获取ChatGPT服务
const getElectronChatgpt = () => {
  if (!window.electronAPI || !window.electronAPI.chatgpt) {
    throw new Error('Electron API not available');
  }
  return window.electronAPI.chatgpt;
};

// 监听登录成功事件
const setupLoginSuccessListener = () => {
  try {
    const electronChatgpt = getElectronChatgpt();
    electronChatgpt.onLoginSuccess(() => {
      isLoggedIn = true;
    });
  } catch (error) {
    console.error('Failed to setup login success listener:', error);
  }
};

// 初始化登录成功监听器
setupLoginSuccessListener();

/**
 * ChatGPT服务类
 */
export class ChatGPTService {
  /**
   * 触发ChatGPT登录
   */
  static async login(): Promise<boolean> {
    console.log('ChatGPTService.login() called');
    try {
      console.log('Getting electronChatgpt');
      const electronChatgpt = getElectronChatgpt();
      console.log('Calling electronChatgpt.login()');
      const result = await electronChatgpt.login();
      console.log('electronChatgpt.login() result:', result);
      return result.success;
    } catch (error) {
      console.error('ChatGPT login failed:', error);
      return false;
    }
  }

  /**
   * 获取登录状态
   */
  static getLoginStatus(): boolean {
    return isLoggedIn;
  }

  /**
   * 从ChatGPT获取聊天记录并转换为应用内部格式
   */
  static async getChatRecords(): Promise<{ 
    categories: Category[]; 
    chatRecords: ChatRecord[]; 
    error?: string;
  }> {
    try {
      // 调用electronAPI获取原始聊天记录
      const electronChatgpt = getElectronChatgpt();
      const result = await electronChatgpt.getChatRecords();
      
      if (!result.success || !result.data) {
        return {
          categories: [],
          chatRecords: [],
          error: result.error || 'Failed to get chat records'
        };
      }

      // 转换为应用内部格式
      const chatRecords = result.data.map((record: any): ChatRecord => {
        // 创建默认消息，实际应用中需要从ChatGPT获取完整对话
        const messages: ChatMessage[] = [
          {
            id: `msg-${record.id}-1`,
            role: 'user',
            content: record.preview || 'No content',
            timestamp: record.createdAt
          },
          {
            id: `msg-${record.id}-2`,
            role: 'assistant',
            content: 'This is a placeholder for the assistant response. In a real implementation, this would fetch the full conversation from ChatGPT.',
            timestamp: record.updatedAt
          }
        ];

        return {
          id: record.id,
          title: record.title,
          categoryId: '1', // 默认分类
          messages,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt
        };
      });

      // 创建默认分类（实际应用中可以根据ChatGPT的分类或自定义分类）
      const categories: Category[] = [
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
      ];

      return {
        categories,
        chatRecords
      };
    } catch (error) {
      console.error('Error getting chat records:', error);
      return {
        categories: [],
        chatRecords: [],
        error: String(error)
      };
    }
  }

  /**
   * 刷新聊天记录
   */
  static async refreshChatRecords(): Promise<{ 
    categories: Category[]; 
    chatRecords: ChatRecord[]; 
    error?: string;
  }> {
    return this.getChatRecords();
  }
}

export default ChatGPTService;
