import React, { useState } from 'react';
import { Category } from '../types';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';

interface CategoryTreeProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

interface TreeNodeProps {
  category: Category;
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  category,
  selectedCategoryId,
  onSelectCategory,
  level,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategoryId === category.id;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelectCategory(category.id);
  };

  return (
    <div>
      <div
        className={`tree-node ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <span className="tree-toggle">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        ) : (
          <span className="tree-toggle-placeholder" />
        )}
        {isExpanded || !hasChildren ? (
          <FolderOpen size={16} className="tree-icon" />
        ) : (
          <Folder size={16} className="tree-icon" />
        )}
        <span className="tree-label">{category.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="tree-children">
          {category.children!.map((child) => (
            <TreeNode
              key={child.id}
              category={child}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={onSelectCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="category-tree">
      <div className="tree-header">
        <h3>分类目录</h3>
        <button
          className="btn-add-category"
          title="添加分类"
          onClick={() => {
            // TODO: 实现添加分类功能
          }}
        >
          +
        </button>
      </div>
      <div className="tree-content">
        <div
          className={`tree-node ${selectedCategoryId === null ? 'selected' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <FolderOpen size={16} className="tree-icon" />
          <span className="tree-label">全部</span>
        </div>
        {categories.map((category) => (
          <TreeNode
            key={category.id}
            category={category}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={onSelectCategory}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTree;

