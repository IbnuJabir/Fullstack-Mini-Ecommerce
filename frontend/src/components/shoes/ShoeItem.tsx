import { useState } from 'react';
import type { Shoe } from '../../types';
import './Shoes.css';

interface ShoeItemProps {
  shoe: Shoe;
  onDelete: (id: string) => Promise<void>;
}

export const ShoeItem = ({ shoe, onDelete }: ShoeItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(shoe.id);
    } catch (error) {
      console.error('Failed to delete shoe:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="shoe-item">
      <div className="shoe-info">
        <h4>{shoe.name}</h4>
        <p className="shoe-brand">{shoe.brand}</p>
        <p className="shoe-date">
          Added: {new Date(shoe.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="shoe-actions">
        {showConfirm ? (
          <div className="confirm-delete">
            <span>Delete?</span>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn-confirm"
            >
              {isDeleting ? 'Deleting...' : 'Yes'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="btn-cancel"
              disabled={isDeleting}
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="btn-delete"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
