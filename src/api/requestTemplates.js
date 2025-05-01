import instance from "./axiosInstance"; // Biraz önce hazırladığımız instance

// GET isteği (query parametreli örnek)
export const getData = async (params = {}) => {
  try {
    const response = await instance.get("/users", { params });
    return response.data;
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

// POST isteği (body göndermek için)
export const postData = async (body = {}) => {
  try {
    const response = await instance.post("/create", body);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

// PUT isteği (güncelleme için)
export const putData = async (body = {}) => {
  try {
    const response = await instance.put("/update", body);
    return response.data;
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};

// PATCH isteği (kısmi güncelleme için)
export const patchData = async (body = {}) => {
  try {
    const response = await instance.patch("update", body);
    return response.data;
  } catch (error) {
    console.error("PATCH Error:", error);
    throw error;
  }
};

// DELETE isteği (id'li ya da params'lı örnek)
export const deleteData = async (params = {}) => {
  try {
    const response = await instance.delete("delete", { params });
    return response.data;
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};
