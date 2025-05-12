import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
    "x-secret-key": import.meta.env.VITE_X_SECRET_KEY,
    "x-project-id": import.meta.env.VITE_PROJECT_ID,
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token){
      console.log(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;


export const registerUserDataFlower = async (username, password) => {
  try {
    const registerResponse = await apiClient.post(
      "/users/cfe3b457-4b1d-40c2-a4bf-9dc053050e4c",
      { username, password }
    );
    console.log("registered:", registerResponse.data);
    return registerResponse.data;
  } catch (error) {
    console.error("Error", error);
  }
};

export const loginUserDataFlower = async (username, password) => {
  try {
    const registerResponse = await apiClient.post(
      "/users/cfe3b457-4b1d-40c2-a4bf-9dc053050e4c/authenticate",
      { username, password }
    );
    console.log("logged in:", registerResponse);
    return registerResponse;
  } catch (error) {
    console.error("Error", error);
  }
};

export const addTickets = async(projectName, description, userId, userName) => {
try {
    const registerResponse = await apiClient.post(
      "/ticket/8d19971e-8e16-4360-8f58-b9c3016cdeb9",
      { projectName, description, userId, userName }
    );
    console.log("Ticket registered:", registerResponse);
    return registerResponse;
  } catch (error) {
    console.error("Error", error);
  }
}

export const getSpecificTickets = async () => {
  try {
    const getTickets = await apiClient.get(
      "/ticket/8d19971e-8e16-4360-8f58-b9c3016cdeb9"
    );
    console.log("Ticket got:", getTickets);
    return getTickets;
  } catch (error) {
    console.error("Error", error);
  }
}

export const addTicketWithImage = async (projectName, description, userId, userName, attachment) => {
  try {
    const response = await apiClient.post(
      "/ticket/8d19971e-8e16-4360-8f58-b9c3016cdeb9",
      {
        projectName,
        description,
        userId,
        userName,
        attachment: null  
      }
    );

    if (attachment && response.data?.success && response.data?.data?.id) {
      const formData = new FormData();
      formData.append('file', attachment);

      const uploadResponse = await apiClient.post(
        `/ticket/8d19971e-8e16-4360-8f58-b9c3016cdeb9/${response.data.data.id}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            fieldName: 'attachment'  
          }
        }
      );

      if (uploadResponse.data?.success) {
        console.log('File uploaded successfully!');
      } else {
        console.error('File upload failed');
      }
    }

    return response;
  } catch (error) {
    console.error('Error in addTicketWithImage:', error);
    throw error;
  }
};

export const logOut = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
}

export const addProject = async(projectName) => {
try {
    const registerResponse = await apiClient.post(
      "/odysseprojects/076cfe09-95d0-4c63-86cd-7eb193460efe",
      { projectName }
    );
    console.log("Project registered:", registerResponse);
    return registerResponse;
  } catch (error) {
    console.error("Error", error);
  }
}

export const getProjects = async () => {
  try {
    const registerResponse = await apiClient.get(
      "/odysseprojects/076cfe09-95d0-4c63-86cd-7eb193460efe"
    );
    console.log("Project got:", registerResponse);
    return registerResponse;
  } catch (error) {
    console.error("Error", error);
  }
}