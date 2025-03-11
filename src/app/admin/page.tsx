'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to dashboard
        router.push('/admin/dashboard');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-800">Redirecting to Dashboard...</h1>
                <div className="mt-4 w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
    );
};

export default AdminPage;