import axios from 'axios'

export const app = axios.create({
  baseURL: 'http://192.168.6.20:3010' //'https://mais-edu.herokuapp.com/'
})

export const createSession = async (mat: string, password: string) => {
  return app.post("/escolas/users/professores/login", {mat, password});
};
