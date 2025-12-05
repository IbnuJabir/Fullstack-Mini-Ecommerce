import { useState, type FormEvent } from 'react';
import './Shoes.css';

interface AddShoeFormProps {
  onAddShoe: (data: { name: string; brand: string }) => Promise<void>;
}

export const AddShoeForm = ({ onAddShoe }: AddShoeFormProps) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !brand.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await onAddShoe({ name: name.trim(), brand: brand.trim() });
      setName('');
      setBrand('');
    } catch (err: any) {
      setError(err.message || 'Failed to add shoe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-shoe-form">
      <h3>Add New Shoe</h3>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Shoe name (e.g., Air Jordan 1)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="shoe-input"
          />
          <input
            type="text"
            placeholder="Brand (e.g., Nike)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={loading}
            className="shoe-input"
          />
          <button type="submit" disabled={loading} className="add-btn">
            {loading ? 'Adding...' : 'Add Shoe'}
          </button>
        </div>
      </form>
    </div>
  );
};
