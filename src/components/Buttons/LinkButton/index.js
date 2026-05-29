import './LinkButton.css';

export default function LinkButton({ children, className = '', as: As = 'button', ...props }) {
  return (
    <As className={`link-btn${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </As>
  );
}
