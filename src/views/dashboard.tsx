/** @jsxImportSource hono/jsx */

import type { FC } from 'hono/jsx';
import { html } from 'hono/html';

// ─── Types ─────────────────────────────────────────────────────────────────
interface Customer {
  CustomerID: number;
  FirstName: string | null;
  LastName: string | null;
  Email: string | null;
  PhoneNumber: string | null;
  CreatedDate: string | null;
}
interface Product {
  ProductID: number;
  ProductName: string | null;
  Category: string | null;
  Price: number | null;
  StockQuantity: number | null;
}
interface Order {
  OrderID: number;
  CustomerID: number | null;
  ProductID: number | null;
  OrderDate: string | null;
  Quantity: number | null;
  TotalAmount: number | null;
}
interface DashboardProps {
  customers: Customer[];
  products: Product[];
  orders: Order[];
  queriedAt: string;
}

// ─── CSS ───────────────────────────────────────────────────────────────────
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

*{margin:0;padding:0;box-sizing:border-box}

body{
  font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
  background:#0a0e1a;color:#e2e8f0;min-height:100vh;
}
.page-bg{
  min-height:100vh;
  background:
    radial-gradient(ellipse at 20% 0%,rgba(59,130,246,.12) 0%,transparent 50%),
    radial-gradient(ellipse at 80% 100%,rgba(139,92,246,.10) 0%,transparent 50%),
    linear-gradient(180deg,#0a0e1a 0%,#111827 100%);
}

/* ── Header ── */
.header{padding:2.5rem 2rem 1.5rem;text-align:center;border-bottom:1px solid rgba(255,255,255,.06)}
.header-badge{
  display:inline-flex;align-items:center;gap:.5rem;padding:.35rem 1rem;
  border-radius:100px;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.25);
  color:#60a5fa;font-size:.75rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:1rem;
}
.header h1{font-size:2rem;font-weight:800;color:#f1f5f9;margin-bottom:.5rem}
.header p{color:#94a3b8;font-size:.95rem}
.timestamp{color:#64748b;font-size:.8rem;margin-top:.5rem}

/* ── Stats ── */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;padding:1.5rem 2rem;max-width:900px;margin:0 auto}
.stat-card{
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;
  padding:1.25rem;text-align:center;backdrop-filter:blur(12px);transition:transform .2s,border-color .2s;
}
.stat-card:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.15)}
.stat-number{font-size:2rem;font-weight:800;margin-bottom:.25rem}
.stat-number.blue{color:#60a5fa}.stat-number.purple{color:#a78bfa}.stat-number.pink{color:#f472b6}
.stat-label{color:#94a3b8;font-size:.8rem;font-weight:500;text-transform:uppercase;letter-spacing:.06em}

/* ── Section ── */
.section{padding:1rem 2rem 2rem;max-width:1200px;margin:0 auto}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;padding-bottom:.75rem;border-bottom:1px solid rgba(255,255,255,.06)}
.section-title{display:flex;align-items:center;gap:.6rem;font-size:1.15rem;font-weight:700}
.section-icon{font-size:1.25rem}

/* ── Buttons ── */
.btn{
  display:inline-flex;align-items:center;gap:.4rem;padding:.5rem 1rem;border-radius:10px;
  font-size:.8rem;font-weight:600;cursor:pointer;border:none;transition:all .2s;font-family:inherit;
}
.btn-add{background:rgba(52,211,153,.12);color:#34d399;border:1px solid rgba(52,211,153,.25)}
.btn-add:hover{background:rgba(52,211,153,.2);transform:translateY(-1px)}
.btn-edit{background:rgba(59,130,246,.1);color:#60a5fa;border:1px solid rgba(59,130,246,.2);padding:.35rem .7rem;font-size:.75rem}
.btn-edit:hover{background:rgba(59,130,246,.2)}
.btn-save{background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.2);padding:.35rem .7rem;font-size:.75rem}
.btn-save:hover{background:rgba(52,211,153,.2)}
.btn-cancel{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2);padding:.35rem .7rem;font-size:.75rem}
.btn-cancel:hover{background:rgba(239,68,68,.2)}

/* ── Table ── */
.table-wrap{
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;
  overflow:hidden;margin-bottom:2rem;backdrop-filter:blur(12px);
}
table{width:100%;border-collapse:collapse;font-size:.875rem}
thead{background:rgba(255,255,255,.05)}
th{padding:.85rem 1rem;text-align:left;font-weight:600;color:#94a3b8;font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid rgba(255,255,255,.06)}
td{padding:.75rem 1rem;border-bottom:1px solid rgba(255,255,255,.04);color:#cbd5e1}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(255,255,255,.02)}
.id-cell{font-weight:600;color:#60a5fa;font-family:'SF Mono','Fira Code',monospace;font-size:.8rem}
.email-cell{color:#a78bfa}
.price-cell{color:#4ade80;font-weight:600;font-family:'SF Mono','Fira Code',monospace}
.empty-state{padding:3rem;text-align:center;color:#64748b;font-size:.9rem}
.actions-cell{display:flex;gap:.4rem}

/* ── Editable cell ── */
.edit-input{
  background:rgba(255,255,255,.06);border:1px solid rgba(59,130,246,.4);border-radius:6px;
  color:#e2e8f0;padding:.35rem .5rem;font-size:.825rem;font-family:inherit;width:100%;
  outline:none;transition:border-color .2s;
}
.edit-input:focus{border-color:#60a5fa}

/* ── Modal ── */
.modal-overlay{
  display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);
  z-index:100;align-items:center;justify-content:center;
}
.modal-overlay.active{display:flex}
.modal{
  background:#1e293b;border:1px solid rgba(255,255,255,.1);border-radius:20px;
  padding:2rem;width:90%;max-width:500px;box-shadow:0 25px 50px rgba(0,0,0,.4);
}
.modal h2{font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;color:#f1f5f9}
.modal-field{margin-bottom:1rem}
.modal-field label{display:block;color:#94a3b8;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.4rem}
.modal-field input{
  width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;color:#e2e8f0;padding:.65rem .85rem;font-size:.875rem;font-family:inherit;outline:none;transition:border-color .2s;
}
.modal-field input:focus{border-color:#60a5fa}
.modal-actions{display:flex;gap:.75rem;justify-content:flex-end;margin-top:1.5rem}
.btn-modal-save{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;padding:.6rem 1.5rem;border-radius:10px;border:none;font-weight:600;font-size:.85rem;cursor:pointer;font-family:inherit;transition:opacity .2s}
.btn-modal-save:hover{opacity:.9}
.btn-modal-cancel{background:rgba(255,255,255,.06);color:#94a3b8;padding:.6rem 1.5rem;border-radius:10px;border:1px solid rgba(255,255,255,.08);font-weight:600;font-size:.85rem;cursor:pointer;font-family:inherit;transition:all .2s}
.btn-modal-cancel:hover{background:rgba(255,255,255,.1);color:#e2e8f0}

/* ── Toast ── */
.toast{
  position:fixed;bottom:2rem;right:2rem;padding:.85rem 1.5rem;border-radius:12px;
  font-size:.85rem;font-weight:600;z-index:200;transform:translateY(100px);opacity:0;
  transition:all .3s ease;
}
.toast.show{transform:translateY(0);opacity:1}
.toast.success{background:rgba(52,211,153,.15);color:#34d399;border:1px solid rgba(52,211,153,.3)}
.toast.error{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)}

/* ── Footer ── */
.footer{text-align:center;padding:2rem;color:#475569;font-size:.75rem;border-top:1px solid rgba(255,255,255,.04)}
`;

// ─── Client-side JS ────────────────────────────────────────────────────────
const clientScript = `
// ── Toast ──
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Modal ──
function openModal(table) {
  const overlay = document.getElementById('modal-' + table);
  overlay.classList.add('active');
  overlay.querySelector('input')?.focus();
}
function closeModal(table) {
  document.getElementById('modal-' + table).classList.remove('active');
  document.getElementById('modal-' + table).querySelectorAll('input').forEach(i => i.value = '');
}

// ── Add Row ──
async function addRow(table) {
  const overlay = document.getElementById('modal-' + table);
  const inputs = overlay.querySelectorAll('input[data-field]');
  const body = {};
  inputs.forEach(i => { body[i.dataset.field] = i.value || null; });

  try {
    const res = await fetch('/api/' + table, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Failed');
    showToast('Row added successfully!');
    closeModal(table);
    setTimeout(() => location.reload(), 600);
  } catch(e) {
    showToast('Error adding row: ' + e.message, 'error');
  }
}

// ── Inline Edit ──
function startEdit(table, id, row) {
  const tr = document.querySelector('[data-table="'+table+'"][data-id="'+id+'"]');
  if (!tr) return;
  const cells = tr.querySelectorAll('td[data-field]');
  cells.forEach(td => {
    const field = td.dataset.field;
    const val = td.dataset.value || '';
    td.innerHTML = '<input class="edit-input" data-field="'+field+'" value="'+val.replace(/"/g,'&quot;')+'" />';
  });
  const actionsCell = tr.querySelector('.actions-cell');
  actionsCell.innerHTML =
    '<button class="btn btn-save" onclick="saveEdit(\\''+table+'\\','+id+')">Save</button>' +
    '<button class="btn btn-cancel" onclick="location.reload()">Cancel</button>';
}

async function saveEdit(table, id) {
  const tr = document.querySelector('[data-table="'+table+'"][data-id="'+id+'"]');
  const inputs = tr.querySelectorAll('input[data-field]');
  const body = {};
  inputs.forEach(i => { body[i.dataset.field] = i.value || null; });

  try {
    const res = await fetch('/api/' + table + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Failed');
    showToast('Row updated successfully!');
    setTimeout(() => location.reload(), 600);
  } catch(e) {
    showToast('Error updating row: ' + e.message, 'error');
  }
}
`;

// ─── Helpers ───────────────────────────────────────────────────────────────
const fmt = (val: unknown) => (val == null ? '—' : String(val));
const fmtDate = (val: string | null) => {
  if (!val) return '—';
  try {
    return new Date(val).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  } catch { return String(val); }
};
const fmtPrice = (val: number | null) => {
  if (val == null) return '—';
  return `₹${Number(val).toFixed(2)}`;
};
const raw = (val: unknown) => (val == null ? '' : String(val));

// ─── Component ─────────────────────────────────────────────────────────────
export const Dashboard: FC<DashboardProps> = ({ customers, products, orders, queriedAt }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Demo App</title>
        <meta name="description" content="Demo App — Product, Customer & Order Management" />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <div class="page-bg">
          {/* ── Header ── */}
          <header class="header">
            <div class="header-badge">● Live Dashboard</div>
            <h1>Demo App</h1>
            <p>Product, Customer &amp; Order Management</p>
            <div class="timestamp">Last refreshed: {queriedAt}</div>
          </header>

          {/* ── Stats ── */}
          <div class="stats">
            <div class="stat-card">
              <div class="stat-number blue">{customers.length}</div>
              <div class="stat-label">Customers</div>
            </div>
            <div class="stat-card">
              <div class="stat-number purple">{products.length}</div>
              <div class="stat-label">Products</div>
            </div>
            <div class="stat-card">
              <div class="stat-number pink">{orders.length}</div>
              <div class="stat-label">Orders</div>
            </div>
          </div>

          {/* ═══════════ Customers ═══════════ */}
          <div class="section">
            <div class="section-header">
              <div class="section-title"><span class="section-icon">👥</span> Customers</div>
              <button class="btn btn-add" onclick="openModal('customers')">+ Add Customer</button>
            </div>
            <div class="table-wrap">
              {customers.length > 0 ? (
                <table>
                  <thead>
                    <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Created</th><th></th></tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr data-table="customers" data-id={c.CustomerID}>
                        <td class="id-cell">{c.CustomerID}</td>
                        <td data-field="FirstName" data-value={raw(c.FirstName)}>{fmt(c.FirstName)}</td>
                        <td data-field="LastName" data-value={raw(c.LastName)}>{fmt(c.LastName)}</td>
                        <td data-field="Email" data-value={raw(c.Email)} class="email-cell">{fmt(c.Email)}</td>
                        <td data-field="PhoneNumber" data-value={raw(c.PhoneNumber)}>{fmt(c.PhoneNumber)}</td>
                        <td>{fmtDate(c.CreatedDate)}</td>
                        <td>
                          <div class="actions-cell">
                            <button class="btn btn-edit" onclick={`startEdit('customers',${c.CustomerID})`}>Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<div class="empty-state">No customer records found</div>)}
            </div>
          </div>

          {/* ═══════════ Products ═══════════ */}
          <div class="section">
            <div class="section-header">
              <div class="section-title"><span class="section-icon">📦</span> Products</div>
              <button class="btn btn-add" onclick="openModal('products')">+ Add Product</button>
            </div>
            <div class="table-wrap">
              {products.length > 0 ? (
                <table>
                  <thead>
                    <tr><th>ID</th><th>Product Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr data-table="products" data-id={p.ProductID}>
                        <td class="id-cell">{p.ProductID}</td>
                        <td data-field="ProductName" data-value={raw(p.ProductName)}>{fmt(p.ProductName)}</td>
                        <td data-field="Category" data-value={raw(p.Category)}>{fmt(p.Category)}</td>
                        <td data-field="Price" data-value={raw(p.Price)} class="price-cell">{fmtPrice(p.Price)}</td>
                        <td data-field="StockQuantity" data-value={raw(p.StockQuantity)}>{fmt(p.StockQuantity)}</td>
                        <td>
                          <div class="actions-cell">
                            <button class="btn btn-edit" onclick={`startEdit('products',${p.ProductID})`}>Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<div class="empty-state">No product records found</div>)}
            </div>
          </div>

          {/* ═══════════ Orders ═══════════ */}
          <div class="section">
            <div class="section-header">
              <div class="section-title"><span class="section-icon">🛒</span> Orders</div>
              <button class="btn btn-add" onclick="openModal('orders')">+ Add Order</button>
            </div>
            <div class="table-wrap">
              {orders.length > 0 ? (
                <table>
                  <thead>
                    <tr><th>Order ID</th><th>Customer ID</th><th>Product ID</th><th>Order Date</th><th>Qty</th><th>Total</th><th></th></tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr data-table="orders" data-id={o.OrderID}>
                        <td class="id-cell">{o.OrderID}</td>
                        <td data-field="CustomerID" data-value={raw(o.CustomerID)}>{fmt(o.CustomerID)}</td>
                        <td data-field="ProductID" data-value={raw(o.ProductID)}>{fmt(o.ProductID)}</td>
                        <td>{fmtDate(o.OrderDate)}</td>
                        <td data-field="Quantity" data-value={raw(o.Quantity)}>{fmt(o.Quantity)}</td>
                        <td data-field="TotalAmount" data-value={raw(o.TotalAmount)} class="price-cell">{fmtPrice(o.TotalAmount)}</td>
                        <td>
                          <div class="actions-cell">
                            <button class="btn btn-edit" onclick={`startEdit('orders',${o.OrderID})`}>Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<div class="empty-state">No order records found</div>)}
            </div>
          </div>

          {/* ═══════════ Modals ═══════════ */}

          {/* Add Customer Modal */}
          <div class="modal-overlay" id="modal-customers">
            <div class="modal">
              <h2>Add New Customer</h2>
              <div class="modal-field"><label>First Name</label><input data-field="FirstName" placeholder="John" /></div>
              <div class="modal-field"><label>Last Name</label><input data-field="LastName" placeholder="Doe" /></div>
              <div class="modal-field"><label>Email</label><input data-field="Email" placeholder="john@example.com" type="email" /></div>
              <div class="modal-field"><label>Phone Number</label><input data-field="PhoneNumber" placeholder="+91 98765 43210" /></div>
              <div class="modal-actions">
                <button class="btn-modal-cancel" onclick="closeModal('customers')">Cancel</button>
                <button class="btn-modal-save" onclick="addRow('customers')">Add Customer</button>
              </div>
            </div>
          </div>

          {/* Add Product Modal */}
          <div class="modal-overlay" id="modal-products">
            <div class="modal">
              <h2>Add New Product</h2>
              <div class="modal-field"><label>Product Name</label><input data-field="ProductName" placeholder="Widget Pro" /></div>
              <div class="modal-field"><label>Category</label><input data-field="Category" placeholder="Electronics" /></div>
              <div class="modal-field"><label>Price</label><input data-field="Price" placeholder="99.99" type="number" step="0.01" /></div>
              <div class="modal-field"><label>Stock Quantity</label><input data-field="StockQuantity" placeholder="100" type="number" /></div>
              <div class="modal-actions">
                <button class="btn-modal-cancel" onclick="closeModal('products')">Cancel</button>
                <button class="btn-modal-save" onclick="addRow('products')">Add Product</button>
              </div>
            </div>
          </div>

          {/* Add Order Modal */}
          <div class="modal-overlay" id="modal-orders">
            <div class="modal">
              <h2>Add New Order</h2>
              <div class="modal-field"><label>Customer ID</label><input data-field="CustomerID" placeholder="1" type="number" /></div>
              <div class="modal-field"><label>Product ID</label><input data-field="ProductID" placeholder="1" type="number" /></div>
              <div class="modal-field"><label>Quantity</label><input data-field="Quantity" placeholder="2" type="number" /></div>
              <div class="modal-field"><label>Total Amount</label><input data-field="TotalAmount" placeholder="199.98" type="number" step="0.01" /></div>
              <div class="modal-actions">
                <button class="btn-modal-cancel" onclick="closeModal('orders')">Cancel</button>
                <button class="btn-modal-save" onclick="addRow('orders')">Add Order</button>
              </div>
            </div>
          </div>

          {/* Toast notification */}
          <div class="toast" id="toast"></div>

          {/* Footer */}
          <footer class="footer">
            Demo App &middot; Powered by Hono
          </footer>
        </div>

        <script dangerouslySetInnerHTML={{ __html: clientScript }} />
      </body>
    </html>
  );
};
