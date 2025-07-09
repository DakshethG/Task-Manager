import React from "react";

const ProfilePhotoSelector = ({ profilePic, setProfilePic, setAdminInviteToken }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePic(file);
    } else {
      setProfilePic(null);
    }
  };

  return (
    <>
      <h3 className="text-sm font-semibold text-gray-700 text-center mb-2">Profile Picture</h3>
      <div className="relative w-28 h-28 mx-auto mb-4">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {!profilePic ? (
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-blue-100 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#3b82f6"
                viewBox="0 0 24 24"
                className="w-10 h-10"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <div className="absolute bottom-0 right-0 bg-blue-700 p-1.5 rounded-full border-2 border-white shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M12 5c-1.1 0-2 .9-2 2H7v2H5v10h14V9h-2V7h-3c0-1.1-.9-2-2-2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="relative w-28 h-28">
              <img
                src={URL.createObjectURL(profilePic)}
                alt="profile"
                className="w-full h-full object-cover rounded-full border shadow"
              />
              <div className="absolute bottom-0 right-0 bg-blue-700 p-1.5 rounded-full border-2 border-white shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M12 5c-1.1 0-2 .9-2 2H7v2H5v10h14V9h-2V7h-3c0-1.1-.9-2-2-2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                </svg>
              </div>
            </div>
          )}
        </label>
      </div>
      <p className="text-center text-sm text-gray-500 mb-4">Click the icon above to upload your photo</p>
    </>
  );
};

export default ProfilePhotoSelector;
