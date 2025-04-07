import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  AlertTriangle
} from "lucide-react";
import Sidebar from "../Components/Sidebar";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA",
    deviceId: "WMS-21345-XZ",
    whatsappNotify: true,
    bio: "I'm a homeowner who uses AquaSentry to monitor my water system."
  });

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
    // In a real application, this would send the profile data to a backend
    console.log("Saving profile:", formData);

    // Toggle edit mode off
    setIsEditMode(false);

    // Show success message to user
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
                <p className="text-gray-500 text-sm mt-1">Manage your personal information and notification preferences</p>
              </div>
              <button
                className={`px-4 py-2 flex items-center text-sm font-medium ${isEditMode ? "rounded-full bg-water-600 text-white px-6 py-2.5 font-medium transition-all duration-300 hover:shadow-button-hover hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-button focus:outline-none focus:ring-2 focus:ring-water-500 focus:ring-offset-2" : "rounded-full bg-transparent text-water-600 px-6 py-2.5 font-medium border border-water-500/30 transition-all duration-300 hover:bg-water-600/10 hover:border-water-500/50 active:bg-water-600/20 focus:outline-none focus:ring-2 focus:ring-water-500 focus:ring-offset-2"}`}
                onClick={() => isEditMode ? handleSaveProfile() : setIsEditMode(true)}
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
                  <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                    {isEditMode && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <label className="cursor-pointer p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
                          <Upload className="h-5 w-5 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {isEditMode && (
                    <p className="text-xs text-gray-500">
                      Click to upload a new photo
                    </p>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        className={`w-full px-3 py-2 text-sm rounded-md ${!isEditMode ? "bg-[#f1f5f9] text-gray-500" : "border border-gray-300"}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        className={`w-full px-3 py-2 text-sm rounded-md ${!isEditMode ? "bg-[#f1f5f9] text-gray-500" : "border border-gray-300"}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium">WhatsApp Phone Number</label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        className={`w-full px-3 py-2 text-sm rounded-md ${!isEditMode ? "bg-[#f1f5f9] text-gray-500" : "border border-gray-300"}`}
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
                      <label htmlFor="whatsappNotify" className="ml-2 text-sm text-gray-500">
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
              <div className="h-px w-full bg-gray-200 mb-6"></div> {/* Separator */}

              <div className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="address" className="text-sm font-medium">Address</label>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-3" />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      className={`w-full px-3 py-2 rounded-md ${!isEditMode ? "bg-[#f1f5f9] text-gray-500" : "border border-gray-300"}`}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="deviceId" className="text-sm font-medium">Device ID</label>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      id="deviceId"
                      name="deviceId"
                      value={formData.deviceId}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      className={`w-full px-3 py-2 text-sm rounded-md ${!isEditMode ? "bg-[#f1f5f9] text-gray-500" : "border border-gray-300"}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is your unique device identifier for the water management system
                  </p>
                </div>

                <div className="space-y-1">
                  <label htmlFor="bio" className="text-sm font-medium">About</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    className={`w-full px-3 py-2 rounded-md ${!isEditMode ? "bg-[#f1f5f9] text-gray-500" : "border border-gray-300"}`}
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