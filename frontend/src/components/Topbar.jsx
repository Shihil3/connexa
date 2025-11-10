import React from "react";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-sm fixed top-0 w-full py-3 px-6 flex justify-between items-center z-10">
      <h1 className="text-xl font-bold text-blue-600 tracking-wide">Connexa</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700">{user.name || "User"}</span>
        <button
          onClick={logout}
          className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
