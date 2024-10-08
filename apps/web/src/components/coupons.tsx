'use client';

import { getDiscountByUserId } from '@/lib/discount';
import { DiscountCoupon } from '@/type/user';
import { useState, useEffect } from 'react';

interface paramsCoupons {
  id:number;
  coupons:DiscountCoupon[]
}

export default function MyCoupons(params:paramsCoupons) {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  useEffect(()=>{
    setCoupons(params.coupons)
    console.log("aduh",params.coupons);
    
  },[])


  function handleCopy(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }

  return (
    <div className="p-6 bg-gray-100 flex">
    <h1 className="text-3xl mb-6">My Coupons: </h1>
    <div className="flex flex-col gap-5">
      {coupons.map((coupon) => (
        <button
          key={coupon.id}
          className={`flex gap-2 ${coupon.used ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !coupon.used && handleCopy(coupon.code)} 
          disabled={coupon.used}
        >
          <div
            className={`${
              coupon.used ? 'bg-gray-500' : 'bg-red-500'
            } text-white rounded-xl p-2 flex flex-col gap-1`}
          >
            {copySuccess && (
              <p className="text-sm text-green-300">{copySuccess}</p>
            )}
            <h3 className="">
              CouponCode: 
              <span className={`${coupon.used ? 'text-gray-300' : 'text-slate-300'}`}>
                {coupon.code}
              </span>
            </h3>
            <p className="text-center font-bold">
              <span className="text-2xl">{coupon.discountValue}%</span> Discount
            </p>
            <p className="text-center text-sm text-red-200">
              Expires at: {new Date(coupon.expiresAt).toLocaleDateString()}
            </p>
            {coupon.used && (
              <p className="text-center text-sm text-yellow-300">
                Coupon Used
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
  
  );
}


