import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import wordsData from '../data/words.json';

export default function CategoryModal() {
  const { isCategoryModalOpen, setIsCategoryModalOpen, selectedCategory, setSelectedCategory, t } = useApp();

  const categories = useMemo(() => {
    return [...new Set(wordsData.map(w => w.category).filter(Boolean))].sort();
  }, []);

  const totalCount = wordsData.length;

  if (!isCategoryModalOpen) return null;

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setIsCategoryModalOpen(false);
  };

  return (
    <div
      id="categoryModal"
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catModalTitle"
      onClick={(e) => {
        if (e.target.id === 'categoryModal') setIsCategoryModalOpen(false);
      }}
    >
      <div className="modal-box modal-box-large">
        <div className="modal-header">
          <h2 id="catModalTitle">{t('categories')}</h2>
          <button
            id="categoryCloseBtn"
            className="modal-close-btn"
            title={t('closeBtn')}
            aria-label={t('closeBtn')}
            onClick={() => setIsCategoryModalOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div id="categoryFilterGrid" className="category-filter-grid">
            <button
              className={`category-choice-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleSelect('all')}
            >
              <div className="cat-choice-left">
                <span className="cat-choice-icon">📚</span>
                <span className="cat-choice-name">{t('allCategories')}</span>
              </div>
              <span className="cat-choice-count">{totalCount}</span>
            </button>

            {categories.map((cat) => {
              const count = wordsData.filter(w => w.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`category-choice-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleSelect(cat)}
                >
                  <div className="cat-choice-left">
                    <span className="cat-choice-icon">📁</span>
                    <span className="cat-choice-name">{cat}</span>
                  </div>
                  <span className="cat-choice-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
