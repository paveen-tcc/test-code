import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
/** @jsxImportSource hono/jsx */
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import mssql from 'mssql';
import { rawQuery, rawExecute } from './db/index.js';
import { Dashboard } from './views/dashboard.js';
const app = new Hono();
app.get('/', async (c) => {
    try {
        const [customers, products, orders] = await Promise.all([
            rawQuery('SELECT * FROM Customers'),
            rawQuery('SELECT * FROM Products'),
            rawQuery('SELECT * FROM Orders'),
        ]);
        const queriedAt = new Date().toLocaleString('en-IN', {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: 'Asia/Kolkata',
        });
        return c.html(_jsx(Dashboard, { customers: customers, products: products, orders: orders, queriedAt: queriedAt }));
    }
    catch (err) {
        console.error('Database error:', err);
        return c.html(_jsx("html", { children: _jsxs("body", { style: "font-family:sans-serif;padding:2rem;background:#0a0e1a;color:#f87171;", children: [_jsx("h1", { children: "Database Connection Error" }), _jsx("p", { children: err.message }), _jsx("pre", { style: "background:#1e293b;padding:1rem;border-radius:8px;overflow:auto;color:#94a3b8;margin-top:1rem;", children: err.stack })] }) }), 500);
    }
});
// ─── Customers API ─────────────────────────────────────────────────────────
app.post('/api/customers', async (c) => {
    const body = await c.req.json();
    await rawExecute(`INSERT INTO Customers (FirstName, LastName, Email, PhoneNumber)
     VALUES (@FirstName, @LastName, @Email, @PhoneNumber)`, {
        FirstName: { type: mssql.NVarChar(50), value: body.FirstName || null },
        LastName: { type: mssql.NVarChar(50), value: body.LastName || null },
        Email: { type: mssql.NVarChar(100), value: body.Email || null },
        PhoneNumber: { type: mssql.NVarChar(20), value: body.PhoneNumber || null },
    });
    return c.json({ success: true });
});
app.put('/api/customers/:id', async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    const body = await c.req.json();
    await rawExecute(`UPDATE Customers
     SET FirstName = @FirstName, LastName = @LastName, Email = @Email, PhoneNumber = @PhoneNumber
     WHERE CustomerID = @CustomerID`, {
        CustomerID: { type: mssql.Int, value: id },
        FirstName: { type: mssql.NVarChar(50), value: body.FirstName || null },
        LastName: { type: mssql.NVarChar(50), value: body.LastName || null },
        Email: { type: mssql.NVarChar(100), value: body.Email || null },
        PhoneNumber: { type: mssql.NVarChar(20), value: body.PhoneNumber || null },
    });
    return c.json({ success: true });
});
// ─── Products API ──────────────────────────────────────────────────────────
app.post('/api/products', async (c) => {
    const body = await c.req.json();
    await rawExecute(`INSERT INTO Products (ProductName, Category, Price, StockQuantity)
     VALUES (@ProductName, @Category, @Price, @StockQuantity)`, {
        ProductName: { type: mssql.NVarChar(100), value: body.ProductName || null },
        Category: { type: mssql.NVarChar(50), value: body.Category || null },
        Price: { type: mssql.Decimal(10, 2), value: body.Price != null ? parseFloat(body.Price) : null },
        StockQuantity: { type: mssql.Int, value: body.StockQuantity != null ? parseInt(body.StockQuantity, 10) : null },
    });
    return c.json({ success: true });
});
app.put('/api/products/:id', async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    const body = await c.req.json();
    await rawExecute(`UPDATE Products
     SET ProductName = @ProductName, Category = @Category, Price = @Price, StockQuantity = @StockQuantity
     WHERE ProductID = @ProductID`, {
        ProductID: { type: mssql.Int, value: id },
        ProductName: { type: mssql.NVarChar(100), value: body.ProductName || null },
        Category: { type: mssql.NVarChar(50), value: body.Category || null },
        Price: { type: mssql.Decimal(10, 2), value: body.Price != null ? parseFloat(body.Price) : null },
        StockQuantity: { type: mssql.Int, value: body.StockQuantity != null ? parseInt(body.StockQuantity, 10) : null },
    });
    return c.json({ success: true });
});
// ─── Orders API ────────────────────────────────────────────────────────────
app.post('/api/orders', async (c) => {
    const body = await c.req.json();
    await rawExecute(`INSERT INTO Orders (CustomerID, ProductID, Quantity, TotalAmount)
     VALUES (@CustomerID, @ProductID, @Quantity, @TotalAmount)`, {
        CustomerID: { type: mssql.Int, value: body.CustomerID != null ? parseInt(body.CustomerID, 10) : null },
        ProductID: { type: mssql.Int, value: body.ProductID != null ? parseInt(body.ProductID, 10) : null },
        Quantity: { type: mssql.Int, value: body.Quantity != null ? parseInt(body.Quantity, 10) : null },
        TotalAmount: { type: mssql.Decimal(10, 2), value: body.TotalAmount != null ? parseFloat(body.TotalAmount) : null },
    });
    return c.json({ success: true });
});
app.put('/api/orders/:id', async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    const body = await c.req.json();
    await rawExecute(`UPDATE Orders
     SET CustomerID = @CustomerID, ProductID = @ProductID, Quantity = @Quantity, TotalAmount = @TotalAmount
     WHERE OrderID = @OrderID`, {
        OrderID: { type: mssql.Int, value: id },
        CustomerID: { type: mssql.Int, value: body.CustomerID != null ? parseInt(body.CustomerID, 10) : null },
        ProductID: { type: mssql.Int, value: body.ProductID != null ? parseInt(body.ProductID, 10) : null },
        Quantity: { type: mssql.Int, value: body.Quantity != null ? parseInt(body.Quantity, 10) : null },
        TotalAmount: { type: mssql.Decimal(10, 2), value: body.TotalAmount != null ? parseFloat(body.TotalAmount) : null },
    });
    return c.json({ success: true });
});
serve({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
