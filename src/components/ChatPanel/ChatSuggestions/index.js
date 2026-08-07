import './ChatSuggestions.css';
import { useState } from 'react';

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
        <i className="ph-fill ph-sparkle chat-suggestions-icon"></i>
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
              <span className="chat-suggestion-chip-arrow"><i className="ph ph-caret-right"></i></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
