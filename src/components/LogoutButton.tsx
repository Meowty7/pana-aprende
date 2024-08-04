
function LogoutButton() {
  const handleLogout = async (e: {
    target: any; preventDefault: () => void; 
}) => {
    e.preventDefault();
    
    try {
      const response = await fetch(e.target.action, {
        method: e.target.method,
      });

      if (response.ok) {
        window.location.href = "/login"; // Redirect after successful logout
      } else {
        const errorText = await response.text();
        console.error('Logout failed:', errorText); // Log error for debugging
      }
    } catch (error) {
      console.error('Error during logout:', error); // Log unexpected errors
    }
  };

  return (
    <form className="ml-4" method="post" action="/api/logout" onSubmit={handleLogout}>
      <button
        type="submit"
        className="font-normal text-gray-600 dark:text-gray-400 md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
      >
        Cerrar sesión
      </button>
    </form>
  );
}

export default LogoutButton;
