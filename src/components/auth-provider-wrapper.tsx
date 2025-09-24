'use client';

import dynamic from 'next/dynamic';

// Dynamically import the AuthProvider to prevent SSR issues
const AuthProvider = dynamic(() => import('@/contexts/auth-context').then(mod => ({ default: mod.AuthProvider })), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
