import { useEffect, useState } from "react";
import api from "../api/api";


function Photos(){


const [photos,setPhotos]=useState([]);

const [albums,setAlbums]=useState([]);


const [photoName,setPhotoName]=useState("");

const [photoPath,setPhotoPath]=useState("");

const [uploadDate,setUploadDate]=useState("");

const [albumID,setAlbumID]=useState("");


const [search,setSearch]=useState("");

const [editingId,setEditingId]=useState(null);






useEffect(()=>{

loadPhotos();
loadAlbums();

},[]);







function loadPhotos(){

api.get("/Photos")

.then(res=>{

setPhotos(res.data);

})

.catch(err=>console.log(err));


}







function loadAlbums(){

api.get("/Albums")

.then(res=>{

setAlbums(res.data);

})

.catch(err=>console.log(err));


}








function savePhoto(e){

e.preventDefault();



if(photoName==="" || photoPath===""){

alert("Fill all fields");

return;

}





if(editingId){



api.put("/Photos/"+editingId,{

photoID: editingId,
photoName: photoName,
photoPath: photoPath,
uploadDate: uploadDate,
albumID: albumID

})


.then(()=>{


alert("Photo Updated");


clearForm();

loadPhotos();


})


.catch(err=>{

console.log(err);

alert("Update error");

});


}

else{



api.post("/Photos",{


photoName:photoName,

photoPath:photoPath,

uploadDate:uploadDate,

albumID:albumID


})


.then(()=>{


alert("Photo Added");


clearForm();

loadPhotos();


})

.catch(err=>console.log(err));



}


}








function editPhoto(p){


setEditingId(p.photoID);


setPhotoName(p.photoName);


setPhotoPath(p.photoPath);


setUploadDate(p.uploadDate);


setAlbumID(p.albumID);



window.scrollTo({

top:0,

behavior:"smooth"

});


}







function deletePhoto(id){


if(!window.confirm("Delete Photo?"))

return;



api.delete("/Photos/"+id)

.then(()=>{


alert("Deleted");


loadPhotos();


})


.catch(err=>console.log(err));


}








function clearForm(){


setPhotoName("");

setPhotoPath("");

setUploadDate("");

setAlbumID("");

setEditingId(null);


}








const filtered = photos.filter(p=>

p.photoName
?.toLowerCase()
.includes(search.toLowerCase())

);









return (

<div className="p-6 bg-gray-100 min-h-screen">





<h1 className="text-3xl font-bold mb-2">

🖼️ Photos Management

</h1>


<p className="text-gray-500 mb-6">

Add, edit, delete and manage photos

</p>









<form

onSubmit={savePhoto}

className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-5 gap-4"

>





<input

className="border p-3 rounded"

placeholder="Photo Name"

value={photoName}

onChange={e=>setPhotoName(e.target.value)}

/>







<input

className="border p-3 rounded"

placeholder="Photo Path"

value={photoPath}

onChange={e=>setPhotoPath(e.target.value)}

/>







<input

className="border p-3 rounded"

placeholder="Upload Date"

value={uploadDate}

onChange={e=>setUploadDate(e.target.value)}

/>







<select

className="border p-3 rounded"

value={albumID}

onChange={e=>setAlbumID(e.target.value)}

>


<option value="">

Select Album

</option>



{

albums.map(a=>(


<option

key={a.albumID}

value={a.albumID}

>

{a.albumName}

</option>


))


}



</select>








<button

className="bg-blue-600 text-white rounded p-3"

>

➕ {editingId ? "Update Photo":"Add Photo"}

</button>





</form>









<input


className="border p-3 rounded w-full mb-6"


placeholder="Search Photo"


value={search}


onChange={e=>setSearch(e.target.value)}


/>









<div className="bg-white rounded-xl shadow p-5">






<h2 className="text-xl font-bold mb-4">

📋 Photos List ({filtered.length})

</h2>








<table className="w-full">





<thead>


<tr className="bg-gray-100">



<th className="p-4">
#
</th>


<th className="p-4">
Photo ID
</th>


<th className="p-4">
Photo Name
</th>


<th className="p-4">
Photo Path
</th>


<th className="p-4">
Upload Date
</th>


<th className="p-4">
Album ID
</th>


<th className="p-4">
Actions
</th>



</tr>

</thead>








<tbody>


{


filtered.map((p,index)=>(


<tr

key={p.photoID}

className="border-b"

>



<td className="p-4">

{index+1}

</td>





<td className="p-4">

{p.photoID}

</td>





<td className="p-4 font-bold">

{p.photoName}

</td>





<td className="p-4">

{p.photoPath}

</td>





<td className="p-4">

{p.uploadDate}

</td>





<td className="p-4">

{p.albumID}

</td>







<td className="p-4">


<div className="flex gap-2">





<button

onClick={()=>editPhoto(p)}

className="bg-green-600 text-white px-3 py-1 rounded text-sm"

>

✏️ Edit

</button>







<button

onClick={()=>deletePhoto(p.photoID)}

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



export default Photos;