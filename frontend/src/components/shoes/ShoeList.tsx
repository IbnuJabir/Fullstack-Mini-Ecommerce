import type { Shoe } from '../../types';
import { ShoeItem } from './ShoeItem';
import './Shoes.css';

interface ShoeListProps {
  shoes: Shoe[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => Promise<void>;
}

export const ShoeList = ({ shoes, loading, error, onDelete }: ShoeListProps) => {
  if (loading) {
    return (
      <div className="shoes-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading shoes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shoes-container">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (shoes.length === 0) {
    return (
      <div className="shoes-container">
        <div className="empty-state">
          <h3>No shoes yet</h3>
          <p>Add your first shoe using the form above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shoes-container">
      <h3>My Shoe Collection ({shoes.length})</h3>
      <div className="shoes-grid">
        {shoes.map((shoe) => (
          <ShoeItem key={shoe.id} shoe={shoe} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};
