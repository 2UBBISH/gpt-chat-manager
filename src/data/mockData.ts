import { Category, ChatRecord } from '../types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: '工作相关',
    parentId: null,
    children: [
      {
        id: '1-1',
        name: '项目A',
        parentId: '1',
        children: [
          { id: '1-1-1', name: '前端开发', parentId: '1-1' },
          { id: '1-1-2', name: '后端开发', parentId: '1-1' },
        ],
      },
      { id: '1-2', name: '项目B', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: '学习笔记',
    parentId: null,
    children: [
      { id: '2-1', name: 'React', parentId: '2' },
      { id: '2-2', name: 'TypeScript', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: '日常生活',
    parentId: null,
  },
];

export const mockChatRecords: ChatRecord[] = [
  {
    id: 'r1',
    title: '如何优化 React 性能',
    categoryId: '2-1',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '请问如何优化 React 应用的性能？',
        timestamp: Date.now() - 86400000 * 2,
      },
      {
        id: 'm2',
        role: 'assistant',
        content: '优化 React 性能可以从以下几个方面入手：\n1. 使用 React.memo 避免不必要的重渲染\n2. 使用 useMemo 和 useCallback 缓存计算结果和函数\n3. 代码分割（Code Splitting）\n4. 虚拟列表处理大量数据\n5. 优化状态管理，避免深层嵌套',
        timestamp: Date.now() - 86400000 * 2 + 1000,
      },
      {
        id: 'm3',
        role: 'user',
        content: '能详细说说 React.memo 的使用场景吗？',
        timestamp: Date.now() - 86400000 * 2 + 2000,
      },
      {
        id: 'm4',
        role: 'assistant',
        content: 'React.memo 是一个高阶组件，用于函数组件的性能优化。它的使用场景包括：\n- 组件接收的 props 经常不变\n- 父组件频繁重渲染但子组件 props 未变化\n- 列表渲染中的子组件\n\n需要注意的是，React.memo 只进行浅比较，如果 props 包含对象或数组，可能需要自定义比较函数。',
        timestamp: Date.now() - 86400000 * 2 + 3000,
      },
    ],
  },
  {
    id: 'r2',
    title: 'TypeScript 类型系统深入',
    categoryId: '2-2',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    messages: [
      {
        id: 'm5',
        role: 'user',
        content: 'TypeScript 的泛型有什么实际应用场景？',
        timestamp: Date.now() - 86400000,
      },
      {
        id: 'm6',
        role: 'assistant',
        content: 'TypeScript 泛型的应用场景非常广泛：\n1. 函数复用：编写可重用的函数，处理不同类型的数据\n2. 接口和类型定义：创建灵活的接口\n3. 类：创建可复用的类\n4. 工具类型：如 Partial、Pick、Omit 等\n5. 约束和条件类型：创建更精确的类型系统',
        timestamp: Date.now() - 86400000 + 1000,
      },
    ],
  },
  {
    id: 'r3',
    title: '项目A的前端架构讨论',
    categoryId: '1-1-1',
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000,
    messages: [
      {
        id: 'm7',
        role: 'user',
        content: '我们需要为一个新项目选择技术栈，有什么建议吗？',
        timestamp: Date.now() - 3600000,
      },
      {
        id: 'm8',
        role: 'assistant',
        content: '对于现代前端项目，我建议考虑：\n- 框架：React、Vue 3 或 Angular（根据团队熟悉度选择）\n- 状态管理：Redux、Zustand 或 Context API\n- 构建工具：Vite 或 Webpack 5\n- 类型系统：TypeScript\n- UI 库：根据设计需求选择 Ant Design、Material-UI 等',
        timestamp: Date.now() - 3600000 + 1000,
      },
    ],
  },
];

