import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Application = () => {
  const { logout, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the application
          </h1>
          {user && (
            <div className="text-gray-600 mb-4">
              <p>Email: {user.email}</p>
              <p>Name: {user.name}</p>
              <p>ID: {user.id}</p>
            </div>
          )}
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};
