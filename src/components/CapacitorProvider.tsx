'use client';
import { useCapacitorInit } from '@/hooks/useCapacitorInit';

export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  useCapacitorInit();
  return <>{children}</>;
}
