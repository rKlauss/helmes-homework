import axios from "axios";
import type { Sector, UserDataDto } from "../types/types";

const API_URL = "http://localhost:8080/api";

export const getSectors = async (): Promise<Sector[]> => {
  const res = await axios.get(`${API_URL}/sectors`);
  return res.data;
};

export const saveUser = async (data: UserDataDto): Promise<UserDataDto> => {
  const res = await axios.post(`${API_URL}/user`, data);
  return res.data;
};

export const updateUser = async (
  id: number,
  data: UserDataDto
): Promise<UserDataDto> => {
  const res = await axios.put(`${API_URL}/user/${id}`, data);
  return res.data;
};

export const getUser = async (id: number): Promise<UserDataDto> => {
  const res = await axios.get(`${API_URL}/user/${id}`);
  return res.data;
};
