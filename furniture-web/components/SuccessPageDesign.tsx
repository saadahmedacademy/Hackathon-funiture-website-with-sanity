"use client";
import useCartStore from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { motion } from 'motion/react';
import { Check, Home, Package, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import GlobalLoading from '@/components/GlobalLoading';


const SuccessPageDesign = () => {

    //To get orderNumber and session id
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const sessionId = searchParams.get("session_id");
    const router = useRouter();
    const {resetCart} = useCartStore();

    // To prevent the user from accessing this page without orderNumber and sessionId
    useEffect(()=>{
        if(!orderNumber && !sessionId){
            router.push('/');
        }else{
          resetCart();
        }
    },[orderNumber,sessionId,resetCart,router])

    if (!searchParams) return <GlobalLoading/>;


  return (
    <main className='py-10 p-4 sm:py-10 bg-gradient-to-br from-gray-50 to-gray-100 
    flex items-center justify-center '>
     
       <motion.div
       initial={{opacity: 0,y: 20}}
       animate={{ opacity: 1,y: 0}}
       transition={{ duration: 0.5 }}
       className='bg-white rounded-2xl shadow-2xl px-8 py-12 max-w-xl
       w-full text-center'>
        <motion.div
        initial={{scale: 0}}
        animate={{ scale: 1}}
        transition={{ duration: 1 }}
        className='bg-black rounded-full flex justify-center items-center
        w-24 h-24 mx-auto mb-8 shadow-lg'>
          <Check className='text-green-500 w-12 h-12 font-bold'/>
        </motion.div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900">Order confirmed</h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Thank you for your purchasing from Avion, we&apos;re processing your order and will ship it soon. 
            A confirmation email will received you soon.
          </p>
            
          <p>Order Number: <span className='font-semibold text-black'>{orderNumber}</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg border-gray-200 p-4 mt-6 space-y-2">
          <h1 className="font-semibold text-gray-900">What&apos;s next</h1>
          <ul className='list-disc list-inside text-left mx-auto space-y-1 text-gray-700'>
            <li>Check your email for order confirmation.</li>
            <li>we&apos;ll notify you when your order has shipped.</li>
            <li>Track your order status anytime.</li>
          </ul>
        </div>

        {/* Order tracker */}
        <motion.div
         initial={{opacity: 0,y: 10}}
         animate={{ opacity: 1,y: 0}}
         transition={{ delay:0.5,duration:0.4}}
         className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

          <Link href={'/'}
          className='bg-black text-white flex justify-center items-center gap-2
          py-3 px-4 rounded-lg hover:bg-gray-800 duration-300 transition-all shadow-md'>
          <Home className='w-5 h-5'/>Home
          </Link>

          <Link href={'/orders'}
          className='bg-black text-white flex justify-center items-center gap-2
          py-3 px-4 rounded-lg hover:bg-gray-800 duration-300 transition-all shadow-md'>
          <ShoppingBag className='w-5 h-5'/>Orders 
          </Link>

          <Link href={'/productlisting'}
          className='bg-black text-white flex justify-center items-center gap-2
          py-3 px-4 rounded-lg hover:bg-gray-800 duration-300 transition-all shadow-md'>
          <Package className='w-5 h-5'/>Shop
          </Link>

        </motion.div>

       </motion.div>

    </main>
  )
}

export default SuccessPageDesign ;
