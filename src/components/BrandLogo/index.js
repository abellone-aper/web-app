import './BrandLogo.css';
import { useBrand } from '../../brands/BrandContext';

export default function BrandLogo({ className = '' }) {
  const brand = useBrand();

  if (brand.logoUrl) {
    return <img src={brand.logoUrl} alt={brand.storeName} className={className} />;
  }

  return <span className={`brand-text-logo ${className}`}>{brand.storeName}</span>;
}
