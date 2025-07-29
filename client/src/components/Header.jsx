import React from 'react'

const Header = () => {
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
      </div>
    </>
  )
}

export default Header