import { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';

const emptyForm = { name: '', description: '' };

function Categories() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const loadCategories = async () => {
        const res = await getCategories();
        setCategories(res.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCategory(editingId, form);
            } else {
                await createCategory(form);
            }
            setForm(emptyForm);
            setEditingId(null);
            loadCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Could not save category');
        }
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setForm({ name: category.name, description: category.description || '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category? Products using it will need reassignment.')) return;
        await deleteCategory(id);
        loadCategories();
    };

    return (
        <div className="categories-page">
            <h1>Categories</h1>

            {error && <p className="error-banner">{error}</p>}

            <form className="product-form" onSubmit={handleSubmit}>
                <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
                <div className="form-row">
                    <input
                        type="text"
                        name="name"
                        placeholder="Category Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description (optional)"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {editingId ? 'Update Category' : 'Add Category'}
                    </button>
                    {editingId && (
                        <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{c.description || '—'}</td>
                                <td className="actions">
                                    <button className="btn-edit" onClick={() => handleEdit(c)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Categories;
