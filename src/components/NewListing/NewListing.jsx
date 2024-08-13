import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as listService from '../../services/listSever';
import './NewListing.css';

const NewListing = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [message, setMessage] = useState('');

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = await listService.create(formData);
      console.log(newItem);
      navigate('/'); // Redirect to home or another page after successful creation
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Create New Listing</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className="form_container">
        <div className="form_group">
          <label htmlFor="title" className="form_label">
            Title:
          </label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="description" className="form_label">
            Description:
          </label>
          <textarea
            autoComplete="off"
            id="description"
            value={formData.description}
            name="description"
            onChange={handleChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="price" className="form_label">
            Price:
          </label>
          <input
            type="number"
            autoComplete="off"
            id="price"
            value={formData.price}
            name="price"
            onChange={handleChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="category" className="form_label">
            Category:
          </label>
          <select
            autoComplete="off"
            id="category"
            value={formData.category}
            name="category"
            onChange={handleChange}
            className="form_select"
          >
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
            <option value="Food">Food</option>
          </select>
        </div>
        <div className="form_group">
          <button type="submit" className="form_button">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewListing;