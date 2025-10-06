import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-nursing-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-nursing-text mb-2">Oops! Page not found</h2>
        <p className="text-nursing-text-light mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-nursing-primary text-white rounded-md text-sm font-medium hover:bg-nursing-primary/90 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
