import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { html } from 'hono/html';
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
const fmt = (val) => (val == null ? '—' : String(val));
const fmtDate = (val) => {
    if (!val)
        return '—';
    try {
        return new Date(val).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    }
    catch {
        return String(val);
    }
};
const fmtPrice = (val) => {
    if (val == null)
        return '—';
    return `₹${Number(val).toFixed(2)}`;
};
const raw = (val) => (val == null ? '' : String(val));
// ─── Component ─────────────────────────────────────────────────────────────
export const Dashboard = ({ customers, products, orders, queriedAt }) => {
    return (_jsxs("html", { lang: "en", children: [_jsxs("head", { children: [_jsx("meta", { charset: "utf-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx("title", { children: "Demo App" }), _jsx("meta", { name: "description", content: "Demo App \u2014 Product, Customer & Order Management" }), _jsx("style", { dangerouslySetInnerHTML: { __html: styles } })] }), _jsxs("body", { children: [_jsxs("div", { class: "page-bg", children: [_jsxs("header", { class: "header", children: [_jsx("div", { class: "header-badge", children: "\u25CF Live Dashboard" }), _jsx("h1", { children: "Demo App" }), _jsx("p", { children: "Product, Customer & Order Management" }), _jsxs("div", { class: "timestamp", children: ["Last refreshed: ", queriedAt] })] }), _jsxs("div", { class: "stats", children: [_jsxs("div", { class: "stat-card", children: [_jsx("div", { class: "stat-number blue", children: customers.length }), _jsx("div", { class: "stat-label", children: "Customers" })] }), _jsxs("div", { class: "stat-card", children: [_jsx("div", { class: "stat-number purple", children: products.length }), _jsx("div", { class: "stat-label", children: "Products" })] }), _jsxs("div", { class: "stat-card", children: [_jsx("div", { class: "stat-number pink", children: orders.length }), _jsx("div", { class: "stat-label", children: "Orders" })] })] }), _jsxs("div", { class: "section", children: [_jsxs("div", { class: "section-header", children: [_jsxs("div", { class: "section-title", children: [_jsx("span", { class: "section-icon", children: "\uD83D\uDC65" }), " Customers"] }), _jsx("button", { class: "btn btn-add", onclick: "openModal('customers')", children: "+ Add Customer" })] }), _jsx("div", { class: "table-wrap", children: customers.length > 0 ? (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "First Name" }), _jsx("th", { children: "Last Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Created" }), _jsx("th", {})] }) }), _jsx("tbody", { children: customers.map((c) => (_jsxs("tr", { "data-table": "customers", "data-id": c.CustomerID, children: [_jsx("td", { class: "id-cell", children: c.CustomerID }), _jsx("td", { "data-field": "FirstName", "data-value": raw(c.FirstName), children: fmt(c.FirstName) }), _jsx("td", { "data-field": "LastName", "data-value": raw(c.LastName), children: fmt(c.LastName) }), _jsx("td", { "data-field": "Email", "data-value": raw(c.Email), class: "email-cell", children: fmt(c.Email) }), _jsx("td", { "data-field": "PhoneNumber", "data-value": raw(c.PhoneNumber), children: fmt(c.PhoneNumber) }), _jsx("td", { children: fmtDate(c.CreatedDate) }), _jsx("td", { children: _jsx("div", { class: "actions-cell", children: _jsx("button", { class: "btn btn-edit", onclick: `startEdit('customers',${c.CustomerID})`, children: "Edit" }) }) })] }))) })] })) : (_jsx("div", { class: "empty-state", children: "No customer records found" })) })] }), _jsxs("div", { class: "section", children: [_jsxs("div", { class: "section-header", children: [_jsxs("div", { class: "section-title", children: [_jsx("span", { class: "section-icon", children: "\uD83D\uDCE6" }), " Products"] }), _jsx("button", { class: "btn btn-add", onclick: "openModal('products')", children: "+ Add Product" })] }), _jsx("div", { class: "table-wrap", children: products.length > 0 ? (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Product Name" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Price" }), _jsx("th", { children: "Stock" }), _jsx("th", {})] }) }), _jsx("tbody", { children: products.map((p) => (_jsxs("tr", { "data-table": "products", "data-id": p.ProductID, children: [_jsx("td", { class: "id-cell", children: p.ProductID }), _jsx("td", { "data-field": "ProductName", "data-value": raw(p.ProductName), children: fmt(p.ProductName) }), _jsx("td", { "data-field": "Category", "data-value": raw(p.Category), children: fmt(p.Category) }), _jsx("td", { "data-field": "Price", "data-value": raw(p.Price), class: "price-cell", children: fmtPrice(p.Price) }), _jsx("td", { "data-field": "StockQuantity", "data-value": raw(p.StockQuantity), children: fmt(p.StockQuantity) }), _jsx("td", { children: _jsx("div", { class: "actions-cell", children: _jsx("button", { class: "btn btn-edit", onclick: `startEdit('products',${p.ProductID})`, children: "Edit" }) }) })] }))) })] })) : (_jsx("div", { class: "empty-state", children: "No product records found" })) })] }), _jsxs("div", { class: "section", children: [_jsxs("div", { class: "section-header", children: [_jsxs("div", { class: "section-title", children: [_jsx("span", { class: "section-icon", children: "\uD83D\uDED2" }), " Orders"] }), _jsx("button", { class: "btn btn-add", onclick: "openModal('orders')", children: "+ Add Order" })] }), _jsx("div", { class: "table-wrap", children: orders.length > 0 ? (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Order ID" }), _jsx("th", { children: "Customer ID" }), _jsx("th", { children: "Product ID" }), _jsx("th", { children: "Order Date" }), _jsx("th", { children: "Qty" }), _jsx("th", { children: "Total" }), _jsx("th", {})] }) }), _jsx("tbody", { children: orders.map((o) => (_jsxs("tr", { "data-table": "orders", "data-id": o.OrderID, children: [_jsx("td", { class: "id-cell", children: o.OrderID }), _jsx("td", { "data-field": "CustomerID", "data-value": raw(o.CustomerID), children: fmt(o.CustomerID) }), _jsx("td", { "data-field": "ProductID", "data-value": raw(o.ProductID), children: fmt(o.ProductID) }), _jsx("td", { children: fmtDate(o.OrderDate) }), _jsx("td", { "data-field": "Quantity", "data-value": raw(o.Quantity), children: fmt(o.Quantity) }), _jsx("td", { "data-field": "TotalAmount", "data-value": raw(o.TotalAmount), class: "price-cell", children: fmtPrice(o.TotalAmount) }), _jsx("td", { children: _jsx("div", { class: "actions-cell", children: _jsx("button", { class: "btn btn-edit", onclick: `startEdit('orders',${o.OrderID})`, children: "Edit" }) }) })] }))) })] })) : (_jsx("div", { class: "empty-state", children: "No order records found" })) })] }), _jsx("div", { class: "modal-overlay", id: "modal-customers", children: _jsxs("div", { class: "modal", children: [_jsx("h2", { children: "Add New Customer" }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "First Name" }), _jsx("input", { "data-field": "FirstName", placeholder: "John" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Last Name" }), _jsx("input", { "data-field": "LastName", placeholder: "Doe" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Email" }), _jsx("input", { "data-field": "Email", placeholder: "john@example.com", type: "email" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Phone Number" }), _jsx("input", { "data-field": "PhoneNumber", placeholder: "+91 98765 43210" })] }), _jsxs("div", { class: "modal-actions", children: [_jsx("button", { class: "btn-modal-cancel", onclick: "closeModal('customers')", children: "Cancel" }), _jsx("button", { class: "btn-modal-save", onclick: "addRow('customers')", children: "Add Customer" })] })] }) }), _jsx("div", { class: "modal-overlay", id: "modal-products", children: _jsxs("div", { class: "modal", children: [_jsx("h2", { children: "Add New Product" }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Product Name" }), _jsx("input", { "data-field": "ProductName", placeholder: "Widget Pro" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Category" }), _jsx("input", { "data-field": "Category", placeholder: "Electronics" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Price" }), _jsx("input", { "data-field": "Price", placeholder: "99.99", type: "number", step: "0.01" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Stock Quantity" }), _jsx("input", { "data-field": "StockQuantity", placeholder: "100", type: "number" })] }), _jsxs("div", { class: "modal-actions", children: [_jsx("button", { class: "btn-modal-cancel", onclick: "closeModal('products')", children: "Cancel" }), _jsx("button", { class: "btn-modal-save", onclick: "addRow('products')", children: "Add Product" })] })] }) }), _jsx("div", { class: "modal-overlay", id: "modal-orders", children: _jsxs("div", { class: "modal", children: [_jsx("h2", { children: "Add New Order" }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Customer ID" }), _jsx("input", { "data-field": "CustomerID", placeholder: "1", type: "number" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Product ID" }), _jsx("input", { "data-field": "ProductID", placeholder: "1", type: "number" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Quantity" }), _jsx("input", { "data-field": "Quantity", placeholder: "2", type: "number" })] }), _jsxs("div", { class: "modal-field", children: [_jsx("label", { children: "Total Amount" }), _jsx("input", { "data-field": "TotalAmount", placeholder: "199.98", type: "number", step: "0.01" })] }), _jsxs("div", { class: "modal-actions", children: [_jsx("button", { class: "btn-modal-cancel", onclick: "closeModal('orders')", children: "Cancel" }), _jsx("button", { class: "btn-modal-save", onclick: "addRow('orders')", children: "Add Order" })] })] }) }), _jsx("div", { class: "toast", id: "toast" }), _jsx("footer", { class: "footer", children: "Demo App \u00B7 Powered by Hono" })] }), _jsx("script", { dangerouslySetInnerHTML: { __html: clientScript } })] })] }));
};
