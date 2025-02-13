const PopModal = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#4703A6] to-[#1B0140] py-16 px-4 border-2 border-white rounded-3xl shadow-custom1 w-[320px] mx-auto">
        <div>
          <p className="font-passionOne text-center text-[32px]/9 font-bold text-white mb-6">
            Do you want to quit?
          </p>

          <div className="flex items-center gap-[9px]">
            <button className="text-white text-[22px]/6 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne p-2 w-full rounded-xl">
              Yes
            </button>
            <button className="text-white text-[22px]/6 bg-[#F97F40] border-2 border-[#F9AE40] uppercase font-passionOne p-2 w-full rounded-xl">
              No
            </button>
          </div>
        </div>

        {/* start popup */}
        {/* <div>
          <p className="font-passionOne text-center text-[32px]/9 font-bold text-white mb-6">
            Are You Ready?
          </p>

          <div className="flex justify-center items-center">
            <button className="text-white text-[22px]/6 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne py-2 px-6 block rounded-xl">
              Let’s start
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PopModal;
