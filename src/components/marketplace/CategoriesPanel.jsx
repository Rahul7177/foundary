import { useState, useMemo, useCallback } from 'react';
import { marketplaceCategories } from '../../data/marketplaceData';

const TABS = [
  { key: 'business', label: 'Business.Ai' },
  { key: 'operations', label: 'Operations.Ai' },
  { key: 'sdlc', label: 'SDLC.Ai' },
  { key: 'data', label: 'Data.Ai' },
];

function CategoryColumn({ category }) {
  return (
    <div className="category-col">
      <img
        className="category-hero"
        src={category.image}
        alt={category.title}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <div className="category-title">{category.title}</div>
      <ul className="category-list">
        {category.items.map((item, idx) => {
          if (typeof item === 'object' && item.subheader) {
            return (
              <li key={idx} style={{ color: '#e6001f', fontWeight: 600, marginTop: idx > 0 ? 8 : 0, fontSize: '0.82rem', letterSpacing: '0.04em' }}>
                {item.subheader}
              </li>
            );
          }
          return <li key={idx}>{typeof item === 'string' ? item : ''}</li>;
        })}
      </ul>
    </div>
  );
}

export default function CategoriesPanel({ activeTab: externalTab, onTabChange, onSubCategoryClick }) {
  const [internalTab, setInternalTab] = useState('business');
  const activeTab = externalTab ?? internalTab;

  const handleTabClick = useCallback(
    (key) => {
      if (onTabChange) onTabChange(key);
      else setInternalTab(key);
    },
    [onTabChange]
  );

  const columns = useMemo(
    () => marketplaceCategories[activeTab] || [],
    [activeTab]
  );

  const handleItemClick = useCallback(
    (item) => {
      if (onSubCategoryClick) onSubCategoryClick(item);
    },
    [onSubCategoryClick]
  );

  return (
    <div className="categories-section">
      <div className="categories-header">
        <span className="categories-label">Agent Marketplace</span>
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`category-columns${activeTab === 'data' ? ' data-tab' : ''}`}>
        {columns.map((col, idx) => (
          <CategoryColumn key={idx} category={col} />
        ))}
      </div>
    </div>
  );
}
