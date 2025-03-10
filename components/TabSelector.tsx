// components/TabSelector.tsx
import { TabType } from '@/types';

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <div className="tabs">
      <button
        className={`tab-btn ${activeTab === 'excel-to-json' ? 'active' : ''}`}
        onClick={() => onTabChange('excel-to-json')}
      >
        <i className="fas fa-file-excel"></i> Excel to JSON
      </button>
      <button
        className={`tab-btn ${activeTab === 'json-to-excel' ? 'active' : ''}`}
        onClick={() => onTabChange('json-to-excel')}
      >
        <i className="fas fa-file-code"></i> JSON to Excel
      </button>
    </div>
  );
};

export default TabSelector;