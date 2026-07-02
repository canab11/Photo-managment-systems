import axios from "axios";

const api = axios.create({
baseURL:"https://localhost:7098/api",
timeout: 30000
});

api.interceptors.request.use(config => {
console.log('📤 API Request:', config.method.toUpperCase(), config.baseURL + config.url);
return config;
}, error => {
console.error('❌ Request error:', error);
return Promise.reject(error);
});

api.interceptors.response.use(response => {
console.log('📥 API Response:', response.status, response.data);
return response;
}, error => {
if(error.code === 'ECONNABORTED'){
console.error('⏱️ Timeout: Backend not responding. Check if server is running on https://localhost:7098');
}else if(error.message === 'Network Error'){
console.error('🌐 Network Error: Cannot reach backend. Is it running?');
}else{
console.error('❌ API Error:', error.message);
}
return Promise.reject(error);
});

export default api;