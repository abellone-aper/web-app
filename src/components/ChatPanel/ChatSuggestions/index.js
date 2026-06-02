import './ChatSuggestions.css';
import { useState } from 'react';

function IconFlechaDerecha() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4.5L16.5 12L9 19.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ChatSuggestions({ label = 'Sugerencias', subtitle, items, onChipClick, animated = false, disabledLabels = [] }) {
  const [clicked, setClicked] = useState(new Set());

  const chips = items.map(item =>
    typeof item === 'string' ? { label: item } : item
  );

  function handleClick(chip) {
    setClicked(prev => new Set([...prev, chip.label]));
    if (chip.onClick) chip.onClick();
    else onChipClick?.(chip.label);
  }

  return (
    <div className={`chat-suggestions${animated ? ' chat-msg-enter' : ''}`}>
      <div className="chat-suggestions-header">
        <img src="/icons/sugerencias.svg" alt="" className="chat-suggestions-icon" />
        <div className="chat-suggestions-header-text">
          <span className="chat-suggestions-title">{label}</span>
          {subtitle && <span className="chat-suggestions-subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="chat-suggestions-list">
        {chips.map(chip => {
          const isDisabled = clicked.has(chip.label) || disabledLabels.includes(chip.label);
          return (
            <button
              key={chip.label}
              className={`chat-suggestion-chip${isDisabled ? ' chat-suggestion-chip--disabled' : ''}`}
              onClick={isDisabled ? undefined : () => handleClick(chip)}
              disabled={isDisabled}
            >
              <span>{chip.label}</span>
              <span className="chat-suggestion-chip-arrow"><IconFlechaDerecha /></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
