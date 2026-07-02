import { useEffect, useState } from "react";
import api from "../api/api";


function Categories(){


const [categories,setCategories]=useState([]);

const [categoryName,setCategoryName]=useState("");

const [search,setSearch]=useState("");

const [editingId,setEditingId]=useState(null);





useEffect(()=>{

loadCategories();

},[]);






function loadCategories(){

api.get("/Categories")

.then(res=>{

setCategories(res.data);

})

.catch(err=>console.log(err));

}







function saveCategory(e){

e.preventDefault();


if(categoryName===""){
alert("Enter category name");
return;
}



if(editingId){


api.put(`/Categories/${editingId}`,{

categoryID: editingId,
categoryName: categoryName

})

.then(()=>{

alert("Category Updated");

clearForm();

loadCategories();

})

.catch(err=>{

console.log(err);
alert("Update error");

})


}

else{


api.post("/Categories",{

categoryName:categoryName

})

.then(()=>{

alert("Added");

clearForm();

loadCategories();

})


}



}





function editCategory(c){

setEditingId(c.categoryID);

setCategoryName(c.categoryName);

window.scrollTo({
top:0,
behavior:"smooth"
});

}








function deleteCategory(id){


if(!window.confirm("Delete Category?"))

return;



api.delete("/Categories/"+id)

.then(()=>{

alert("Deleted");

loadCategories();

})


}







function clearForm(){

setCategoryName("");

setEditingId(null);

}







const filtered = categories.filter(c=>

c.categoryName
?.toLowerCase()
.includes(search.toLowerCase())

);









return (


<div className="p-6 bg-gray-100 min-h-screen">





<h1 className="text-3xl font-bold mb-2">

📂 Categories Management

</h1>


<p className="text-gray-500 mb-6">

Add, edit, delete and manage categories

</p>








<form

onSubmit={saveCategory}

className="bg-white p-5 rounded-xl shadow mb-6 flex gap-4"

>


<input

className="border p-3 rounded flex-1"

placeholder="Category Name"

value={categoryName}

onChange={e=>setCategoryName(e.target.value)}

/>




<button

className="bg-blue-600 text-white px-6 py-3 rounded"

>

➕ {editingId ? "Update Category":"Add Category"}

</button>



</form>







<input


className="border p-3 rounded w-full mb-6"


placeholder="Search Category"


value={search}


onChange={e=>setSearch(e.target.value)}


/>








<div className="bg-white rounded-xl shadow p-5">






<h2 className="text-xl font-bold mb-5">

📋 Categories List ({filtered.length})

</h2>








<table className="w-full">





<thead>

<tr className="bg-gray-100">


<th className="p-4 text-left">
#
</th>


<th className="p-4 text-left">
Category ID
</th>


<th className="p-4 text-left">
Category Name
</th>


<th className="p-4 text-left">
Actions
</th>



</tr>

</thead>








<tbody>

{


filtered.map((c,index)=>(


<tr

key={c.categoryID}

className="border-b"

>



<td className="p-4">

{index+1}

</td>





<td className="p-4">

{c.categoryID}

</td>






<td className="p-4 font-bold">

{c.categoryName}

</td>







<td className="p-4">


<div className="flex gap-2">






<button


onClick={()=>editCategory(c)}


className="bg-green-600 text-white px-3 py-1 rounded text-sm"


>

✏️ Edit

</button>







<button


onClick={()=>deleteCategory(c.categoryID)}


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


export default Categories;