import axios from 'axios';

const API_URL = 'https://nest-mart-backend.vercel.app/api/auth';

interface RegisterResponse {
  message: string;
}

interface LoginResponse {
  message: string;
  token: string;
  role: string;
}

interface AdminDashboardResponse {
  usersCount: number;
  totalRevenue: number;
  activeSessions: number;
  recentUsers: { id: string; name: string; email: string }[];
}

interface ErrorResponse {
  response?: {
    data?: {
      error: string;
    };
  };
}

// Register user
const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.response?.data?.error || 'Registration failed');
  }
};

// Login user
const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.response?.data?.error || 'Login failed');
  }
};

// Get admin dashboard data with proper type
const getAdminDashboard = async (): Promise<AdminDashboardResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get<AdminDashboardResponse>(`${API_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as ErrorResponse;
    throw new Error(err.response?.data?.error || 'Failed to fetch admin dashboard data');
  }
};

// Export the API object
const api = {
  register,
  login,
  getAdminDashboard,
};

export default api;
