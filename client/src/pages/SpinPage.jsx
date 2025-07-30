import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Header from "../components/Header";
import spinnerIcon from "../assets/spinner.svg";

const wheelSegments = [
  { label: "Arts and Craft", color: "#F59E42" },
  { label: "Nature", color: "#34D399" },
  { label: "Family", color: "#60A5FA" },
  { label: "Sport", color: "#FBBF24" },
  { label: "Friends", color: "#A78BFA" },
  { label: "Meditation", color: "#10B981" },
  { label: "Work", color: "#F87171" },
];

const SpinPage = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categoryDropdownHover, setCategoryDropdownHover] = useState("");

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + finalAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Pointer is at 180deg (bottom), so use 540 instead of 360
      const normalized = (540 - (totalRotation % 360)) % 360;
      const degreesPerSlice = 360 / wheelSegments.length;
      const index =
        Math.floor((normalized + degreesPerSlice / 2) / degreesPerSlice) %
        wheelSegments.length;
      setResult(wheelSegments[index].label);
    }, 3000);
  };

  // SVG wheel rendering
  const renderWheel = () => {
    const size = 500;
    const center = size / 2;
    const radius = 210;
    const degreesPerSlice = 360 / wheelSegments.length;

    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {wheelSegments.map((segment, i) => {
          const startAngle = i * degreesPerSlice - 90;
          const endAngle = (i + 1) * degreesPerSlice - 90;
          const largeArcFlag = degreesPerSlice > 180 ? 1 : 0;

          const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
          const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
          const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
          const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);

          const textAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
          const textX = center + 155 * Math.cos(textAngle);
          const textY = center + 155 * Math.sin(textAngle);

          return (
            <g key={segment.label}>
              <path
                d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={textX}
                y={textY}
                fill="black"
                fontSize="18"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  userSelect: "none",
                  pointerEvents: "none",
                  textShadow: "0 1px 2px #0008",
                }}
              >
                {segment.label}
              </text>
            </g>
          );
        })}
        {/* Center circle */}
        <circle
          cx={center}
          cy={center}
          r="25"
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        <circle
          cx={center}
          cy={center}
          r={225}
          fill="none"
          stroke="#CE3816 "
          strokeWidth="13"
          style={{ filter: "drop-shadow(0 2px 8px #0002)" }}
        />
        {/* Dots around the wheel */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = i * (360 / 14) * (Math.PI / 180);
          const x = center + 225 * Math.cos(angle);
          const y = center + 225 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="white"
              stroke="#d1d5db"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto w-full max-w-7xl bg-white rounded-2xl shadow-sm -translate-y-10 z-10 p-2 sm:p-6">
        <div className="mb-4 ">
          <h1 className="text-xl sm:text-3xl font-bold">Spin Wheel</h1>
        </div>
        <div className="p-2 sm:p-8">
          <div className="relative ">
            {/* Category Dropdown - top right */}
            <div className="w-full max-w-xs mb-4 sm:absolute sm:right-2 sm:top-2 sm:z-20 sm:w-[90vw] sm:max-w-xs sm:mb-0">
              <label className="block mb-2 font-medium text-gray-700">
                Select Task Category
              </label>
              {/* Custom Category Dropdown */}
              <div className="relative min-w-[180px]">
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  onClick={() => setCategoryDropdownOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={categoryDropdownOpen}
                >
                  <span>{selectedCategory || "All Categories"}</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      categoryDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {categoryDropdownOpen && (
                  <ul
                    className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                    tabIndex={-1}
                    role="listbox"
                    onMouseLeave={() => setCategoryDropdownHover("")}
                  >
                    {["", ...wheelSegments.map((seg) => seg.label)].map(
                      (option) => (
                        <li
                          key={option || "all"}
                          role="option"
                          aria-selected={selectedCategory === option}
                          className={`flex items-center px-4 py-2 cursor-pointer text-sm select-none transition-colors text-gray-500
                          ${
                            selectedCategory === option
                              ? "bg-teal-50 font-semibold text-teal-700"
                              : "hover:bg-teal-400 hover:text-black"
                          }
                        `}
                          onClick={() => {
                            setSelectedCategory(option);
                            setCategoryDropdownOpen(false);
                          }}
                          onMouseEnter={() => setCategoryDropdownHover(option)}
                        >
                          <span className="mr-2 text-lg">
                            {selectedCategory === option ||
                            categoryDropdownHover === option ? (
                              <MdCheckBox className="text-teal-600" size={20} />
                            ) : (
                              <MdCheckBoxOutlineBlank
                                className="text-gray-400"
                                size={20}
                              />
                            )}
                          </span>
                          {option || "All Categories"}
                        </li>
                      )
                    )}
                  </ul>
                )}
                {categoryDropdownOpen && (
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCategoryDropdownOpen(false)}
                    aria-hidden="true"
                  ></div>
                )}
              </div>
            </div>
            {/* Spin Wheel */}
            <div className="w-full flex justify-center">
              <div className="relative w-full max-w-[95vw] sm:max-w-[500px] aspect-square">
                <div
                  className="transition-transform duration-[3000ms] ease-out w-full h-full"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning
                      ? "transform 3s cubic-bezier(0.23, 1, 0.32, 1)"
                      : "none",
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 500"
                    className="drop-shadow-lg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {renderWheel()}
                  </svg>
                </div>
                {/* Pointer at bottom center */}
                <div className="absolute bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] md:border-l-[30px] md:border-r-[30px] md:border-b-[68px] border-l-transparent border-r-transparent border-b-teal-500"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 m-6 font-bold md:text-lg text-center">
              Spin Wheel to pick your task
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full justify-center">
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="bg-teal-500 hover:bg-teal-600 text-black px-4 md:px-8 py-3 text-lg font-medium flex items-center gap-2 rounded-lg justify-center"
              >
                {isSpinning ? "Spinning..." : "Spin"}
                <img
                  src={spinnerIcon}
                  alt="Spinner Icon"
                  className="filter invert"
                />
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-teal-500 hover:bg-teal-600 text-black  px-4 md:px-8 py-3 text-lg font-medium flex items-center gap-2 rounded-lg justify-center"
              >
                Go to Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinPage;
