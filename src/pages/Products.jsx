import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';

function Products() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await getProducts();
            setProducts(res.data);
            setError('');
        } catch (err) {
            setError('Could not load products. Is the backend server running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct._id, formData);
            } else {
                await createProduct(formData);
            }
            setEditingProduct(null);
            loadProducts();
        } catch (err) {
            setError('Could not save the product. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            setError('Could not delete the product. Please try again.');
        }
    };

    return (
        <div className="products-page">
            <h1>Products</h1>

            {error && <p className="error-banner">{error}</p>}

            <ProductForm
                onSubmit={handleSubmit}
                editingProduct={editingProduct}
                onCancel={() => setEditingProduct(null)}
            />

            {loading ? (
                <p className="loading-state">Loading products...</p>
            ) : (
                <ProductTable
                    products={products}
                    onEdit={setEditingProduct}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Products;
