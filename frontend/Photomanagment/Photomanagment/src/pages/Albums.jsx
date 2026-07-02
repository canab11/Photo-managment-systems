import { useEffect, useState } from "react";
import api from "../api/api";


function Albums(){


const [albums,setAlbums]=useState([]);

const [users,setUsers]=useState([]);


const [albumName,setAlbumName]=useState("");

const [userID,setUserID]=useState("");

const [search,setSearch]=useState("");

const [editingId,setEditingId]=useState(null);





useEffect(()=>{

loadAlbums();
loadUsers();

},[]);






function loadAlbums(){

api.get("/Albums")

.then(res=>{

setAlbums(res.data);

})

.catch(err=>console.log(err));

}







function loadUsers(){

api.get("/Users")

.then(res=>{

setUsers(res.data);

})

.catch(err=>console.log(err));


}








function saveAlbum(e){

e.preventDefault();



if(albumName===""){

alert("Enter album name");

return;

}





if(editingId){



api.put("/Albums/"+editingId,{

albumID:editingId,

albumName:albumName,

userID:userID

})


.then(()=>{


alert("Album Updated");


clearForm();

loadAlbums();


})

.catch(err=>console.log(err));



}

else{



api.post("/Albums",{

albumName:albumName,

userID:userID

})


.then(()=>{


alert("Album Added");


clearForm();

loadAlbums();


})

.catch(err=>console.log(err));



}



}









function editAlbum(a){


setEditingId(a.albumID);

setAlbumName(a.albumName);

setUserID(a.userID);



window.scrollTo({

top:0,

behavior:"smooth"

});


}









function deleteAlbum(id){


if(!window.confirm("Delete Album?"))
return;




api.delete("/Albums/"+id)


.then(()=>{


alert("Deleted");


loadAlbums();


})

.catch(err=>console.log(err));



}









function clearForm(){


setAlbumName("");

setUserID("");

setEditingId(null);


}









const filtered = albums.filter(a=>

a.albumName
?.toLowerCase()
.includes(search.toLowerCase())

);








return (


<div className="p-6 bg-gray-100 min-h-screen">





<h1 className="text-3xl font-bold mb-2">

📁 Albums Management

</h1>





<p className="text-gray-500 mb-6">

Add, edit, delete and manage albums

</p>









<form

onSubmit={saveAlbum}

className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-3 gap-4"

>







<input


className="border p-3 rounded"


placeholder="Album Name"


value={albumName}


onChange={e=>setAlbumName(e.target.value)}


/>









<select


className="border p-3 rounded"


value={userID}


onChange={e=>setUserID(e.target.value)}


>


<option value="">

Select User

</option>




{

users.map(u=>(


<option

key={u.userID}

value={u.userID}

>

{u.fullName}

</option>


))


}



</select>









<button


className="bg-blue-600 text-white rounded p-3"


>


➕ {editingId ? "Update Album":"Add Album"}


</button>







</form>








<input


className="border p-3 rounded w-full mb-6"


placeholder="Search Album"


value={search}


onChange={e=>setSearch(e.target.value)}


/>









<div className="bg-white rounded-xl shadow p-5">





<h2 className="text-xl font-bold mb-4">


📋 Albums List ({filtered.length})


</h2>








<table className="w-full">





<thead>


<tr className="bg-gray-100">



<th className="p-4">
#
</th>



<th className="p-4">
Album ID
</th>



<th className="p-4">
Album Name
</th>



<th className="p-4">
User ID
</th>



<th className="p-4">
Actions
</th>




</tr>

</thead>









<tbody>

{

filtered.map((a,index)=>(



<tr

key={a.albumID}

className="border-b"


>





<td className="p-4">

{index+1}

</td>








<td className="p-4">

{a.albumID}

</td>








<td className="p-4 font-bold">

{a.albumName}

</td>







<td className="p-4">

{a.userID}

</td>








<td className="p-4">



<div className="flex gap-2">






<button


onClick={()=>editAlbum(a)}


className="bg-green-600 text-white px-3 py-1 rounded text-sm"


>

✏️ Edit

</button>









<button


onClick={()=>deleteAlbum(a.albumID)}


className="bg-red-600 text-white px-3 py-1 rounded text-sm"


>

🗑 Delete

</button>







</div>


</td>









</tr>



))


}




</tbody>






</table>






</div>






</div>



)


}



export default Albums;