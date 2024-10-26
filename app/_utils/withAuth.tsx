// utils/withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('authToken'); // Check auth status

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('auth/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) return null; // Render nothing if not authenticated

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
