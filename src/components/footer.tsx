import React from 'react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Firebase FolioFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
