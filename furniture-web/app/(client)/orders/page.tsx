import { requiredUser } from '@/hooks/requiredUser';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const OrdersPage = async () => {
   
// To check the user is logged in or not
 await requiredUser();

  return (
    <div>
      gibe order
    </div>
  )
}

export default OrdersPage;
