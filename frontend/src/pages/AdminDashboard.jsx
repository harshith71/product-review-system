import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  getAdminStats, getAdminUsers, getProducts,
  deleteProduct, deleteUser, getReviews, deleteReview
} from '../services/api.js';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, u, p] = await Promise.all([getAdminStats(), getAdminUsers(), getProducts()]);
      setStats(s.data); setUsers(u.data); setProducts(p.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product and all its reviews?')) return;
    try { await deleteProduct(id); setProducts(prev => prev.filter(p => p.id !== id)); }
    catch { alert('Failed to delete product'); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try { await deleteUser(id); setUsers(prev => prev.filter(u => u.id !== id)); }
    catch { alert('Failed to delete user'); }
  };

  const TABS = ['overview', 'products', 'users'];

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">★ ReviewHub</div>
        <div className="admin-user-info">
          <div className="admin-avatar">{user?.username?.[0]?.toUpperCase()}</div>
          <div>
            <div className="admin-username">{user?.username}</div>
            <div className="admin-role-badge">Administrator</div>
          </div>
        </div>
        <nav className="admin-nav">
          {TABS.map(t => (
            <button key={t} className={`admin-nav-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'overview' ? '⊞' : t === 'products' ? '◈' : '◎'}&nbsp;&nbsp;
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <button className="admin-nav-btn" onClick={() => navigate('/')}>← Storefront</button>
        </nav>
        <button className="admin-logout" onClick={() => { logout(); navigate('/login'); }}>Sign out</button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">
            {tab === 'overview' ? 'Dashboard Overview' : tab === 'products' ? 'Product Management' : 'User Management'}
          </h1>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /> Loading…</div>
        ) : (
          <>
            {/* Overview */}
            {tab === 'overview' && stats && (
              <div className="admin-content fade-in">
                <div className="stat-grid">
                  {[
                    { label: 'Total Users', value: stats.totalUsers, icon: '◎', color: 'var(--accent)' },
                    { label: 'Total Products', value: stats.totalProducts, icon: '◈', color: 'var(--accent3)' },
                    { label: 'Total Reviews', value: stats.totalReviews, icon: '★', color: 'var(--star)' },
                  ].map(s => (
                    <div key={s.label} className="stat-card card">
                      <div className="stat-icon" style={{ color: s.color }}>{s.icon}</div>
                      <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="overview-hint card">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/add-product')}>+ Add Product</button>
                    <button className="btn btn-secondary" onClick={() => setTab('products')}>Manage Products</button>
                    <button className="btn btn-secondary" onClick={() => setTab('users')}>Manage Users</button>
                  </div>
                </div>
              </div>
            )}

            {/* Products */}
            {tab === 'products' && (
              <div className="admin-content fade-in">
                <div className="admin-toolbar">
                  <span className="admin-count">{products.length} products</span>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/add-product')}>+ Add Product</button>
                </div>
                <div className="admin-table-wrap card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th><th>Category</th><th>Price</th>
                        <th>Avg Rating</th><th>Reviews</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>
                            <div className="table-product">
                              {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="table-img" />}
                              <span>{p.name}</span>
                            </div>
                          </td>
                          <td><span className="badge">{p.category || '—'}</span></td>
                          <td className="td-price">${p.price?.toFixed(2) ?? '—'}</td>
                          <td>
                            <span className="td-rating">
                              ★ {p.averageRating > 0 ? p.averageRating.toFixed(1) : '—'}
                            </span>
                          </td>
                          <td>{p.totalReviews}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/products/${p.id}`)}>View</button>
                              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users */}
            {tab === 'users' && (
              <div className="admin-content fade-in">
                <div className="admin-toolbar">
                  <span className="admin-count">{users.length} users</span>
                </div>
                <div className="admin-table-wrap card">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">{u.username[0].toUpperCase()}</div>
                              {u.username}
                            </div>
                          </td>
                          <td className="td-muted">{u.email}</td>
                          <td>
                            <span className={`role-badge ${u.role === 'ROLE_ADMIN' ? 'role-admin' : 'role-user'}`}>
                              {u.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${u.enabled ? 'status-active' : 'status-disabled'}`}>
                              {u.enabled ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="td-muted">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                          <td>
                            {u.role !== 'ROLE_ADMIN' && (
                              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
