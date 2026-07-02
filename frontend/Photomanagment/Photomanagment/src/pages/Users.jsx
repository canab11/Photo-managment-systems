import { useEffect, useState } from "react";
import api from "../api/api";


function Users(){

const [users,setUsers] = useState([]);

const [fullName,setFullName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [editId,setEditId] = useState(null);



// GET

const loadUsers = ()=>{

api.get("/Users")
.then(res=>{

setUsers(res.data);

})
.catch(err=>console.log(err));

}



useEffect(()=>{

loadUsers();

},[]);





// ADD / UPDATE

const saveUser=(e)=>{

e.preventDefault();


if(editId){

api.put(`/Users/${editId}`,
{

UserID:editId,
FullName:fullName,
Email:email,
Password:password

})

.then(()=>{

alert("User Updated");

clear();

loadUsers();

})


}

else{


api.post("/Users",
{

FullName:fullName,
Email:email,
Password:password

})

.then(()=>{

alert("User Added");

clear();

loadUsers();

})


}


}





// EDIT

const editUser=(u)=>{

console.log(u);

setEditId(u.userID);

setFullName(u.fullName);

setEmail(u.email);

setPassword(u.password);


window.scrollTo({
top:0,
behavior:"smooth"
});


}






// DELETE

const deleteUser=(id)=>{


if(!confirm("Delete User?"))
return;


api.delete(`/Users/${id}`)

.then(()=>{


alert("Deleted");

loadUsers();


})

.catch(err=>console.log(err));


}





const clear=()=>{

setEditId(null);
setFullName("");
setEmail("");
setPassword("");

}







return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-5">
👤 Users List
</h1>



<form
onSubmit={saveUser}
className="grid grid-cols-4 gap-5 mb-8"
>


<input

className="border p-3 rounded"

placeholder="Full Name"

value={fullName}

onChange={e=>setFullName(e.target.value)}

/>



<input

className="border p-3 rounded"

placeholder="Email"

value={email}

onChange={e=>setEmail(e.target.value)}

/>



<input

className="border p-3 rounded"

placeholder="Password"

value={password}

onChange={e=>setPassword(e.target.value)}

/>



<button className="bg-blue-600 text-white rounded">

{editId ? "Update User":"Add User"}

</button>



</form>






<table className="w-full bg-white">


<thead className="bg-gray-200">

<tr>

<th>#</th>

<th>User ID</th>

<th>Full Name</th>

<th>Email</th>

<th>Password</th>

<th>Actions</th>


</tr>

</thead>




<tbody>


{

users.map((user,index)=>(


<tr key={user.userID} className="border">


<td>{index+1}</td>

<td>{user.userID}</td>

<td>{user.fullName}</td>

<td>{user.email}</td>

<td>{user.password}</td>


<td>


<button

onClick={()=>editUser(user)}

className="bg-green-600 text-white px-5 py-2 rounded"

>

✏ Edit

</button>




<button

onClick={()=>deleteUser(user.userID)}

className="bg-red-600 text-white px-5 py-2 rounded ml-3"

>

🗑 Delete

</button>


</td>


</tr>


))


}


</tbody>


</table>



</div>

)


}


export default Users;