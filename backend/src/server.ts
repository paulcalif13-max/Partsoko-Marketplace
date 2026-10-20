import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import bookingRoutes from './routes/bookingRoutes';
import adminRoutes from './routes/adminRoutes';
import bugRoutes from './routes/bugRoutes';
import importRoutes from './routes/importRoutes';
import towingRoutes from './routes/towingRoutes';
import valuationRoutes from './routes/valuationRoutes';
import financeRoutes from './routes/financeRoutes';
import mechanicRoutes from './routes/mechanicRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PARTSOKO API is running', timestamp: new Date().toISOString() });
});

// Registered API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/imports', importRoutes);
app.use('/api/towing', towingRoutes);
app.use('/api/valuations', valuationRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/mechanics', mechanicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
