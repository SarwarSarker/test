const QuizSkeleton = () => {
  return (
    <div className="bg-white px-4 py-6 rounded-3xl mb-12 animate-pulse">
      <p className="mb-3">
        <span className="block w-full h-4 bg-gray-300 rounded"></span>
      </p>
      <div className="w-5/6 mx-auto mb-[30px]">
        <div className="h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col gap-2">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl relative bg-gray-200 flex items-center gap-2"
            >
              <div className="w-[22px] h-[22px] bg-gray-300 rounded-full"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuizSkeleton;
