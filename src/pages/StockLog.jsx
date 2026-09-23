import { useEffect, useState } from 'react';
import { getStockTransactions, recordStockTransaction } from '../api/stock';
import { getProducts } from '../api/products';

const emptyForm = { productId: '', type: 'in', quantity: '', note: '' };

function StockLog() {
    const [transactions, setTransactions] = useState([]);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const loadData = async () => {
        const [txRes, prodRes] = await Promise.all([getStockTransactions(), getProducts()]);
        setTransactions(txRes.data);
        setProducts(prodRes.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await recordStockTransaction({ ...form, quantity: Number(form.quantity) });
            setForm(emptyForm);
            loadData();
        } catch (err) {
            setError(err.response?.data?.message || 'Could not record transaction');
        }
    };

    return (
        <div className="stock-page">
            <h1>Stock Log</h1>

            {error && <p className="error-banner">{error}</p>}

            <form className="product-form" onSubmit={handleSubmit}>
                <h2>Record Stock Movement</h2>
                <div className="form-row">
                    <select name="productId" value={form.productId} onChange={handleChange} required>
                        <option value="" disabled>Select Product</option>
                        {products.map((p) => (
                            <option key={p._id} value={p._id}>{p.name} (current: {p.quantity})</option>
                        ))}
                    </select>
                    <select name="type" value={form.type} onChange={handleChange}>
                        <option value="in">Stock In</option>
                        <option value="out">Stock Out</option>
                    </select>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <input
                    type="text"
                    name="note"
                    className="form-input-full"
                    placeholder="Note (optional, e.g. 'Restocked from supplier')"
                    value={form.note}
                    onChange={handleChange}
                />
                <button type="submit" className="btn-primary">Record Transaction</button>
            </form>

            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Note</th>
                            <th>By</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t._id}>
                                <td>
                                    <span className={`tx-badge tx-${t.type}`}>{t.type === 'in' ? '⬆ IN' : '⬇ OUT'}</span>
                                </td>
                                <td>{t.product?.name || '—'}</td>
                                <td>{t.quantity}</td>
                                <td>{t.note || '—'}</td>
                                <td>{t.user?.username || '—'}</td>
                                <td>{new Date(t.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockLog;
