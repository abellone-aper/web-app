import './SecondaryButton.css';

export default function SecondaryButton({ children, className = '', as: As = 'button', ...props }) {
  return (
    <As className={`secondary-btn${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </As>
  );
}
