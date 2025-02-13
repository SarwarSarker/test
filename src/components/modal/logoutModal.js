import { clearUser } from "@/GlobalRedux/features/auth/authSlice";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import { useRouter } from "next/navigation";

const LogoutModal = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    setTimeout(handleClose, 300);
    router.push("/")
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#1B0140] bg-opacity-90 z-50 flex justify-center items-center">
        <div className="bg-gradient-to-b from-[#4703A6] to-[#1B0140] py-16 px-4 border-2 border-white rounded-3xl shadow-custom1 w-[320px] mx-auto">
          {/* start popup */}
          <div>
            <h2 className="font-passionOne text-center text-[32px]/9 font-bold text-white mb-6">
              Are You Sure?
            </h2>

            <div className="flex justify-center items-center">
              {/* Bind handleLogout to the Yes button */}
              <button
                onClick={handleLogout}
                className="text-white text-[22px]/6 mr-4 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne py-2 px-6 block rounded-xl"
              >
                Yes
              </button>
              <button
                onClick={handleClose}
                className="text-white text-[22px]/6 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne py-2 px-6 block rounded-xl"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
