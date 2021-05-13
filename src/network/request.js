import axios from "axios";
export function request(config) {
  const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  instance.interceptors.request.use(config=>{
   return config
  },error => {
    console.log(error);
  })
  instance.interceptors.response.use(res=>{
    return res
  },error => {
    console.log(error);
  })
  return instance(config)
}
