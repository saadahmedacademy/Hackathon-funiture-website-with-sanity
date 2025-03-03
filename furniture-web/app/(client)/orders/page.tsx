'use client';
import GlobalLoading from '@/components/GlobalLoading';
import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if(!isClient){
    return <GlobalLoading/>
  }

  return (

  <div>Give Order</div>
)
};

export default OrdersPage;

