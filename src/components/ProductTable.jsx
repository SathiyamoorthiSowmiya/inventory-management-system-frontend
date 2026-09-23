function ProductTable({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return <p className="empty-state">No products yet. Add your first product above.</p>;
    }

    return (
        <div className="table-wrapper">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category?.name || '—'}</td>
                            <td className={
                                product.quantity === 0
                                    ? 'out-of-stock'
                                    : product.quantity <= product.lowStockThreshold
                                        ? 'low-stock'
                                        : ''
                            }>
                                {product.quantity}
                            </td>
                            <td>₹{product.price}</td>
                            <td>{product.description || '—'}</td>
                            <td className="actions">
                                <button className="btn-edit" onClick={() => onEdit(product)}>
                                    Edit
                                </button>
                                <button className="btn-delete" onClick={() => onDelete(product._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
