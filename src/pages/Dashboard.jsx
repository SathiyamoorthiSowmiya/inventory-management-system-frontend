import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getDashboardStats } from '../api/dashboard';

const COLORS = ['#59B2F4', '#a855f7', '#ec4899', '#f7971e', '#4ade80', '#f87171'];

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        getDashboardStats().then((res) => setStats(res.data));
    }, []);

    if (!stats) return <p className="loading-state">Loading dashboard...</p>;

    const categoryData = Object.entries(stats.categoryBreakdown).map(([name, value]) => ({ name, value }));

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>

            <div className="stats">
                <div className="stat-card">
                    <span className="stat-value">{stats.totalProducts}</span>
                    <span className="stat-label">Total Products</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{stats.totalStockUnits}</span>
                    <span className="stat-label">Total Stock Units</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">₹{stats.totalValue.toFixed(2)}</span>
                    <span className="stat-label">Inventory Value</span>
                </div>
                <div className="stat-card stat-warning">
                    <span className="stat-value">{stats.lowStockCount}</span>
                    <span className="stat-label">Low Stock</span>
                </div>
                <div className="stat-card stat-danger">
                    <span className="stat-value">{stats.outOfStockCount}</span>
                    <span className="stat-label">Out of Stock</span>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart-card">
                    <h3>Stock by Category</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                                {categoryData.map((entry, index) => (
                                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Stock Units by Category</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#9aa3b8" fontSize={12} />
                            <YAxis stroke="#9aa3b8" fontSize={12} />
                            <Tooltip contentStyle={{ background: '#1e1e29', border: 'none' }} />
                            <Bar dataKey="value" fill="#59B2F4" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {stats.lowStockProducts.length > 0 && (
                <div className="alert-panel">
                    <h3>⚠️ Low Stock Alerts</h3>
                    <ul>
                        {stats.lowStockProducts.map((p) => (
                            <li key={p._id}>{p.name} — only {p.quantity} left (threshold: {p.lowStockThreshold})</li>
                        ))}
                    </ul>
                </div>
            )}

            {stats.outOfStockProducts.length > 0 && (
                <div className="alert-panel alert-panel-danger">
                    <h3>🚫 Out of Stock</h3>
                    <ul>
                        {stats.outOfStockProducts.map((p) => (
                            <li key={p._id}>{p.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="recent-transactions">
                <h3>Recent Stock Activity</h3>
                {stats.recentTransactions.length === 0 ? (
                    <p className="empty-state">No stock transactions yet.</p>
                ) : (
                    <ul>
                        {stats.recentTransactions.map((t) => (
                            <li key={t._id}>
                                <span className={`tx-badge tx-${t.type}`}>{t.type === 'in' ? '⬆ IN' : '⬇ OUT'}</span>
                                {t.product?.name} — {t.quantity} units by {t.user?.username}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
