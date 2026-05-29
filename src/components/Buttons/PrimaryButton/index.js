import './PrimaryButton.css';

export default function PrimaryButton({ children, className = '', as: As = 'button', ...props }) {
  return (
    <As className={`primary-btn${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </As>
  );
}
