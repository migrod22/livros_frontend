import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getBooks = async () => {
  try {
    const response = await api.get("livro/");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const createBook = async (newBook: any) => {
  try {
    const response = await api.post("livro/", newBook);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};
