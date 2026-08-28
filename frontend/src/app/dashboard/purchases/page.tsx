'use client';

import { useState, useEffect } from 'react';

export default function PurchaseHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      fetchMyOrders(user.token);
    }
  }, []);

  const fetchMyOrders = async (token: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Purchase History & Quotations</h1>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 mb-4">You have not made any purchases yet.</p>
          <a href="/search" className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-blue-700">Start Shopping</a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const subtotal = order.totalAmount - order.commissionFee - order.taxFee - order.importFee - order.deliveryFee;

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Order Placed</p>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold text-lg text-green-600">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-xs text-gray-700">#{order.id.split('-')[0]}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Items List */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Items Ordered</h3>
                    <div className="space-y-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 bg-gray-200 rounded flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quotation Breakdown */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Quotation Breakdown</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Parts Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Commission</span>
                        <span>${order.commissionFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Local Tax (VAT)</span>
                        <span>${order.taxFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Importation Fee</span>
                        <span>${order.importFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>${order.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold text-gray-900 text-base">
                        <span>Total Paid</span>
                        <span className="text-green-600">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
