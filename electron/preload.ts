import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  
  // ChatGPT相关方法
  chatgpt: {
    // 触发登录窗口
    login: async () => {
      return await ipcRenderer.invoke('chatgpt:login');
    },
    
    // 获取聊天记录
    getChatRecords: async () => {
      return await ipcRenderer.invoke('chatgpt:get-chat-records');
    },
    
    // 监听登录成功事件
    onLoginSuccess: (callback: () => void) => {
      ipcRenderer.on('chatgpt:login-success', callback);
      return () => ipcRenderer.removeListener('chatgpt:login-success', callback);
    },
    
    // 🔴 新增：监听聊天记录事件
    onChatRecords: (callback: (records: any[]) => void) => {
      // 创建包装函数，适配ipcRenderer事件签名
      const eventHandler = (_event: Electron.IpcRendererEvent, records: any[]) => {
        callback(records);
      };
      
      ipcRenderer.on('chatgpt:chat-records', eventHandler);
      // 移除监听器时必须使用相同的函数引用
      return () => ipcRenderer.removeListener('chatgpt:chat-records', eventHandler);
    },
  },
});

// 类型定义，方便渲染进程使用
declare global {
  interface Window {
    electronAPI: {
      platform: string;
      chatgpt: {
        login: () => Promise<{ success: boolean }>;
        getChatRecords: () => Promise<{ success: boolean; data?: any[]; error?: string }>;
        onLoginSuccess: (callback: () => void) => () => void;
        onChatRecords: (callback: (records: any[]) => void) => () => void;
      };
    };
  }
}

