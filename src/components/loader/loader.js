const Loader = ({ size = "8", color = "text-blue-600", border = "border-4" }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`inline-block h-${size} w-${size} animate-spin rounded-full ${border} border-solid border-current border-e-transparent align-[-0.125em] ${color} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
