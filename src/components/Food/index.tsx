import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface FoodProps {
  products: {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
  };
  handleEditProduct: (food: any) => void;
  handleDeleteProduct: (id: number) => void;
}
export function Food({ products, handleDelete, handleEditProduct }) {
  const [isAvailable, setIsAvaible] = useState(products.avaliable);
  async function toggleAvailable() {
    const food = products;
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: isAvailable,
    });
    setIsAvaible(!isAvailable);
  }
  function setEditingFood() {
    const food = products;
    handleEditProduct(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={products.image} alt={products.name} />
      </header>
      <section className="body">
        <h2>{products.name}</h2>
        <p>{products.description}</p>
        <p className="price">
          R$ <b>{products.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={this.setEditingFood}
            data-testid={`edit-food-${products.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(products.id)}
            data-testid={`remove-food-${products.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${products.id}`} className="switch">
            <input
              id={`available-switch-${products.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={this.toggleAvailable}
              data-testid={`change-status-food-${products.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
