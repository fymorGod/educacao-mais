import axios from 'axios'

export const app = axios.create({
  baseURL: 'https://mais-edu.herokuapp.com/'
})

export const createSession = async (mat: string, password: string) => {
  return app.post("/escolas/users/professores/login", {mat, password});
};
