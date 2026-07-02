import {useEffect,useState} from "react";
import api from "../api/api";

function Dashboard(){

const [users,setUsers]=useState(0);
const [albums,setAlbums]=useState(0);
const [photos,setPhotos]=useState(0);
const [categories,setCategories]=useState(0);
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null);

useEffect(()=>{
loadDashboardData();
},[]);

function loadDashboardData(){
setLoading(true);
setError(null);

api.get("/Users").then(res=>{
console.log('Users API Response:',res.data);
const count=Array.isArray(res.data)?res.data.length:0;
setUsers(count);
}).catch(err=>{
console.error('Error fetching users:',err);
setError('Failed to load users');
});

api.get("/Albums").then(res=>{
console.log('Albums API Response:',res.data);
const count=Array.isArray(res.data)?res.data.length:0;
setAlbums(count);
}).catch(err=>{
console.error('Error fetching albums:',err);
setError('Failed to load albums');
});

api.get("/Photos").then(res=>{
console.log('Photos API Response:',res.data);
const count=Array.isArray(res.data)?res.data.length:0;
setPhotos(count);
}).catch(err=>{
console.error('Error fetching photos:',err);
setError('Failed to load photos');
});

api.get("/Categories").then(res=>{
console.log('Categories API Response:',res.data);
const count=Array.isArray(res.data)?res.data.length:0;
setCategories(count);
setLoading(false);
}).catch(err=>{
console.error('Error fetching categories:',err);
setError('Failed to load categories');
setLoading(false);
});
}

if(loading){
return (
<div className="p-6">
<p className="text-lg">⏳ Loading dashboard...</p>
</div>
)
}

if(error){
return (
<div className="p-6">
<div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg">
<p className="text-red-700 text-lg font-bold mb-3">❌ Backend Not Responding</p>
<p className="text-red-600 mb-4">Cannot connect to: <span className="font-mono">https://localhost:7098/api</span></p>
<div className="bg-white p-4 rounded mb-4 text-sm text-gray-700">
<p className="font-bold mb-2">🔧 Fix this:</p>
<ul className="list-disc ml-5 space-y-1">
<li>Make sure your C# backend server is running</li>
<li>Check if it's listening on <span className="font-mono">https://localhost:7098</span></li>
<li>Check backend logs for errors</li>
<li>Verify HTTPS certificate is valid</li>
</ul>
</div>
<button
onClick={loadDashboardData}
className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
>
🔄 Retry
</button>
</div>
</div>
)
}

return (

<div>

<h1 className="text-4xl font-bold mb-8">
📷 Dashboard
</h1>

<div className="grid grid-cols-4 gap-6">

<div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
<h2 className="text-lg mb-2">👥 Users</h2>
<p className="text-5xl font-bold">{users}</p>
</div>

<div className="bg-green-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
<h2 className="text-lg mb-2">📁 Albums</h2>
<p className="text-5xl font-bold">{albums}</p>
</div>

<div className="bg-purple-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
<h2 className="text-lg mb-2">📷 Photos</h2>
<p className="text-5xl font-bold">{photos}</p>
</div>

<div className="bg-orange-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
<h2 className="text-lg mb-2">🏷️ Categories</h2>
<p className="text-5xl font-bold">{categories}</p>
</div>

</div>

<div className="mt-8">
<button
onClick={loadDashboardData}
className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
>
🔄 Refresh
</button>
</div>

</div>

)

}

export default Dashboard;