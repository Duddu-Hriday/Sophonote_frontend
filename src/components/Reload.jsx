function Reload() {
    // Function to reload the page
    const reloadPage = () => {
      window.location.reload();
    };
  
    return (
      <div className="flex justify-center mt-6">
        <button
          onClick={reloadPage}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Reload Page
        </button>
      </div>
    );
  }
  
  export default Reload;
  