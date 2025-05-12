import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user.name}!</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link
            to="/profile"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            View Profile
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Account</h2>
              <p className="text-muted-foreground text-sm">Manage your account settings</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/profile" className="text-primary hover:underline text-sm font-medium">
              View Profile →
            </Link>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Security</h2>
              <p className="text-muted-foreground text-sm">Manage your security settings</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/profile" className="text-primary hover:underline text-sm font-medium">
              Change Password →
            </Link>
          </div>
        </div>
        
        {user.role === 'admin' && (
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Admin</h2>
                <p className="text-muted-foreground text-sm">Manage users and settings</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin" className="text-primary hover:underline text-sm font-medium">
                Admin Dashboard →
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Getting Started</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Complete your profile</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Make sure your profile information is up to date.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">Set a strong password</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Ensure your account is secure by setting a strong password.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <h3 className="font-medium">Explore the application</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Discover all the features available to you in this application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
