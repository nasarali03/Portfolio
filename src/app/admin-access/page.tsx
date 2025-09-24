'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminAccessPage() {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // You can change this secret key to anything you want
    const validSecretKey = 'admin2024'; // Change this to your preferred secret
    
    if (secretKey === validSecretKey) {
      router.push('/admin');
    } else {
      setError('Invalid access key');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="mx-auto max-w-sm w-full rounded-2xl shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="mb-4 inline-block">
            <Code2 className="h-8 w-8 text-primary" />
          </Link>
          <CardTitle className="text-2xl font-headline flex items-center justify-center gap-2">
            <Lock className="h-6 w-6" />
            Admin Access
          </CardTitle>
          <CardDescription>
            Enter the secret key to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="secretKey">Secret Key</Label>
              <div className="relative">
                <Input
                  id="secretKey"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Access Admin Dashboard
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/">Back to Portfolio</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
