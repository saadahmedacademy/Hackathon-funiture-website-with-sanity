import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useCartStore = create()(persist((set,get) => ({})))