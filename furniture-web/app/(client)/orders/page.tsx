import { requiredUser } from '@/hooks/requiredUser';
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
