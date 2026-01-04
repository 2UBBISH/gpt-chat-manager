export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children?: Category[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatRecord {
  id: string;
  title: string;
  categoryId: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

