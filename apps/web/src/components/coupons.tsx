'use client';

import { getDiscountByUserId } from '@/lib/discount';
import { useState, useEffect } from 'react';

export default function MyCoupons(params) {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const userId = id; 
        const data = await getDiscountByUserId(userId);
        setCoupons(data.user.discountCoupons);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  function handleCopy(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Coupons</h1>
      <div className="flex flex-col gap-5">
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          coupons.map(coupon => (
            <button
              key={coupon.id}
              className="flex gap-2"
              onClick={() => handleCopy(coupon.code)}
            >
              <div className="bg-red-500 text-white rounded-xl p-2 flex flex-col gap-1">
                {copySuccess && (
                  <p className="text-sm text-green-300">{copySuccess}</p>
                )}
                <h3 className="">
                  CouponCode:
                  <span className="text-slate-300">{coupon.code}</span>
                </h3>
                <p className="text-center font-bold">
                  <span className="text-2xl">{coupon.discountValue}%</span> Discount
                </p>
                <p className="text-center text-sm text-red-200">
                  Expires at: {new Date(coupon.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
