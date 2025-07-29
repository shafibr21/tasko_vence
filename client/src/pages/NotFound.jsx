import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import notfounndImage from "../assets/error.svg";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Top background section */}
        <div
          className="absolute top-0 left-0 w-full h-50 overflow-hidden flex items-center justify-end pr-16"
          style={{ backgroundColor: "#040612" }}
        >
          {/* Top left circular blur */}
          <div
            className="absolute top-4 -left-25 w-70 h-70 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#60E5AE" }}
          ></div>

          {/* Bottom right circular blur */}
          <div
            className="absolute bottom-4 right-4 w-90 h-80 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#60E5AE" }}
          ></div>

          {/* Login illustration on the right */}
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-100 h-auto relative z-10 translate-y-5 opacity-60 translate-x-10"
          />
        </div>

        {/* Bottom white section */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-white"></div>
        <div className="bg-white rounded-lg shadow-lg p-15 w-full max-w relative z-10 mx-20 lg:px-130 ">
          <div className="flex justify-center mb-6 ">
            <div>
              <img src={notfounndImage} alt="Logo" className="h-120 w-120" />
            </div>
          </div>
          <button
            type="button"
            onClick={handleBackToHome}
            className="w-full bg-teal-400 hover:bg-teal-500 text-black font-medium py-2 rounded-md transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
