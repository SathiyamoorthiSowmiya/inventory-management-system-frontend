import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';

const emptyForm = { name: '', category: '', quantity: '', price: '', lowStockThreshold: '10', description: '' };

function ProductForm({ onSubmit, editingProduct, onCancel }) {
    const [form, setForm] = useState(emptyForm);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        if (editingProduct) {
            setForm({
                name: editingProduct.name,
                category: editingProduct.category?._id || editingProduct.category,
                quantity: editingProduct.quantity,
                price: editingProduct.price,
                lowStockThreshold: editingProduct.lowStockThreshold ?? 10,
                description: editingProduct.description || '',
            });
        } else {
            setForm(emptyForm);
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            quantity: Number(form.quantity),
            price: Number(form.price),
            lowStockThreshold: Number(form.lowStockThreshold),
        });
        setForm(emptyForm);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

            <div className="form-row">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-row">
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    min="0"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price (₹)"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
                <input
                    type="number"
                    name="lowStockThreshold"
                    placeholder="Low Stock Alert At"
                    value={form.lowStockThreshold}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <textarea
                name="description"
                placeholder="Description (optional)"
                value={form.description}
                onChange={handleChange}
                rows="3"
            />

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                {editingProduct && (
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default ProductForm;
