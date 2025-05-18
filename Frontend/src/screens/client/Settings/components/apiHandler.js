import axios from "axios";
import { url } from "../../../../api/Api";

const API_URL = url;

// Configure axios with token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log(token)
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const deviceApiService = {
  // Fetch user's device
  getUserDevice: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user-device`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching device:", error);
      throw error;
    }
  },

  // Add new device
  addDevice: async (deviceData) => {
    try {
      const response = await axios.post(
        `${API_URL}/add-device`,
        deviceData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error adding device:", error);
      throw error;
    }
  },

  // Update device settings
  updateDeviceSettings: async (deviceSettings) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-device`,
        deviceSettings,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error updating device settings:", error);
      throw error;
    }
  },

  // Delete device
  deleteDevice: async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/delete-device`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting device:", error);
      throw error;
    }
  },
};