import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  AlertTriangle
} from "lucide-react";
import Sidebar from "../Components/Sidebar";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Sunil Adhikari",
    email: "suniladhikari580@gmail.com",
    phone: "+9779840379646",
    address: "Kadaghari,Forcepark",
    deviceId: "WMS-21345-XZ",
    whatsappNotify: true,
    bio: "I'm a homeowner who uses Aquacontrol to monitor my water system."
  });

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle save profile
  const handleSaveProfile = () => {
    console.log("Saving profile:", formData);
    setIsEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full ml-64'>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col space-y-6">
            {/* Page header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold">User Profile</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your personal information and notification preferences
                </p>
              </div>
              <button
                className={`px-4 py-2 flex items-center text-sm font-medium ${
                  isEditMode
                    ? "rounded-full bg-water-600 text-white px-6 py-2.5 transition-all duration-300 hover:shadow-button-hover"
                    : "rounded-full bg-transparent text-water-600 px-6 py-2.5 border border-water-500/30 transition-all duration-300 hover:bg-water-600/10"
                }`}
                onClick={() =>
                  isEditMode ? handleSaveProfile() : setIsEditMode(true)
                }
              >
                {isEditMode ? (
                  <>
                    <Save className="mr-1.5 h-4 w-4" />
                    <span>Save Profile</span>
                  </>
                ) : (
                  <>
                    <User className="mr-1.5 h-4 w-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            {/* Profile image and basic info */}
            <div className="bg-white rounded-lg p-8 shadow-gray-300 border shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src="/images/default-avatar.png"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        className={`w-full px-3 py-2 text-sm rounded-md ${
                          !isEditMode
                            ? "bg-[#f1f5f9] text-gray-500"
                            : "border border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        className={`w-full px-3 py-2 text-sm rounded-md ${
                          !isEditMode
                            ? "bg-[#f1f5f9] text-gray-500"
                            : "border border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium">
                      WhatsApp Phone Number
                    </label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        className={`w-full px-3 py-2 text-sm rounded-md ${
                          !isEditMode
                            ? "bg-[#f1f5f9] text-gray-500"
                            : "border border-gray-300"
                        }`}
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="whatsappNotify"
                        name="whatsappNotify"
                        checked={formData.whatsappNotify}
                        onChange={handleCheckboxChange}
                        disabled={!isEditMode}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label
                        htmlFor="whatsappNotify"
                        className="ml-2 text-sm text-gray-500"
                      >
                        Receive WhatsApp notifications for alerts
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional information */}
            <div className="bg-white rounded-lg p-6 shadow-gray-300 border shadow-lg">
              <h2 className="text-lg font-medium mb-4">Additional Information</h2>
              <div className="h-px w-full bg-gray-200 mb-6"></div>

              <div className="space-y-6">
                {/* Address */}
                <div className="space-y-1">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-3" />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      className={`w-full px-3 py-2 rounded-md ${
                        !isEditMode
                          ? "bg-[#f1f5f9] text-gray-500"
                          : "border border-gray-300"
                      }`}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Device ID */}
                <div className="space-y-1">
                  <label htmlFor="deviceId" className="text-sm font-medium">
                    Device ID
                  </label>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      id="deviceId"
                      name="deviceId"
                      value={formData.deviceId}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      className={`w-full px-3 py-2 text-sm rounded-md ${
                        !isEditMode
                          ? "bg-[#f1f5f9] text-gray-500"
                          : "border border-gray-300"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is your unique device identifier for the water management system
                  </p>
                </div>

                {/* Bio */}
                <div className="space-y-1">
                  <label htmlFor="bio" className="text-sm font-medium">
                    About
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    className={`w-full px-3 py-2 rounded-md ${
                      !isEditMode
                        ? "bg-[#f1f5f9] text-gray-500"
                        : "border border-gray-300"
                    }`}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h2 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h2>
              <p className="text-sm text-red-500 mb-4">
                These actions are irreversible. Please proceed with caution.
              </p>
              <div className="space-x-4">
                <button className="px-4 py-2 bg-white border border-red-300 rounded-md text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  Reset System Configuration
                </button>
                <button className="px-4 py-2 bg-white border border-red-300 rounded-md text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
