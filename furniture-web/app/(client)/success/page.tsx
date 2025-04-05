"use client";

import GlobalLoading from '@/components/GlobalLoading';
import SuccessPageDesign from '@/components/SuccessPageDesign';
import { Suspense } from 'react';


export default function SuccessPage() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <SuccessPageDesign />
    </Suspense>
  );
}

