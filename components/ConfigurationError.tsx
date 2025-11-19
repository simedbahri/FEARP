import React from 'react';

export const ConfigurationError: React.FC = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-3xl font-bold font-serif text-gray-800 mt-4">Configuration Error</h1>
            <p className="mt-4 text-gray-600">
                This application is not connected to Firebase. The required configuration details are missing.
            </p>
            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="font-semibold text-gray-700">Action Required:</h2>
                <p className="mt-2 text-sm text-gray-600">
                    If you are the developer, please update your environment variables in your Vercel project settings. For Vercel to expose variables to the browser, they must be prefixed with <code className="bg-gray-200 text-red-600 font-mono p-1 rounded">NEXT_PUBLIC_</code>.
                </p>
                 <p className="mt-2 text-sm text-gray-600">
                    For example, rename <code className="bg-gray-200 font-mono p-1 rounded">REACT_APP_FIREBASE_API_KEY</code> to <code className="bg-gray-200 font-mono p-1 rounded">NEXT_PUBLIC_FIREBASE_API_KEY</code>.
                </p>
            </div>
        </div>
    </div>
);