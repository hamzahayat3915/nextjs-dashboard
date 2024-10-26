import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Admin Panel - Update Contacts</title>
        <meta name="description" content="Admin Panel for updating contacts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to the Admin Panel
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Manage your contacts easily and efficiently.
            </p>

            {/* Placeholder for the Image */}
            <div className="mx-auto mb-8">
              {/* Add your image path below */}
              <img 
                src="/logo.png" 
                alt="Admin Panel Illustration" 
                className="w-1/2 mx-auto"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <a href="/auth/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Login
              </a>
             
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}
