import React from 'react'

const CategoryButton = ({ cat, activeCategory, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(cat.id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all active:scale-90 ${
      activeCategory === cat.id 
        ? `${cat.color} border-current ring-1 ring-current` 
        : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'
    }`}
  >
    {cat.icon} {cat.label}
  </button>
);

export default CategoryButton