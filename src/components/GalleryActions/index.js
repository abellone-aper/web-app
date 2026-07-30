import './GalleryActions.css';
import FavButton from '../Buttons/FavButton';

export default function GalleryActions({ favActive, onFavToggle, onShare }) {
  return (
    <div className="gallery-actions">
      <FavButton className="gallery-actions__fav" active={favActive} onToggle={onFavToggle} />
      <button type="button" className="gallery-actions__share" aria-label="Compartir" onClick={onShare}>
        <i className="ph ph-share-network"></i>
      </button>
    </div>
  );
}
