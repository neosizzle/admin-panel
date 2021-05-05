//get table body from dom
tableBody = document.getElementById("tableBody")

//function to convert array buffer received from server to base64 string to be displayed as image 
//https://stackoverflow.com/questions/53723962/arraybuffer-as-source-image-tag-display-image-from-blob
const  _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }


//will send delete req to the server to delete said post
const deletePost = (jwt , postId) =>{
    console.log(jwt)

    deleteUrl = `/posts/${postId}`
    deleteParams = {
        headers : {
            "Content-Type" : "application/json"
        },
        method : "DELETE"
    }

    //send post request to server containing input as payload data
 fetch(deleteUrl , deleteParams)
 .then(response => response.json())//parse response into readable json
 .then((data)=>{
     //display status message according to resposne
     

     if(data.error){
        //error from fetch
        alert("ERROR in deleting")
        console.log(data.error)
     }else{
         //no error
        window.location.href = '/admin/dashboard/posts'

     }
 })
 .catch(
     (error)=>{
        alert("Something wrong happened")
         console.log(error)
     }
 )

}

//will set get request to server redirecting to edit posts page
const editPost = (jwt , postId)=>{
    window.location.href = `/admin/dashboard/posts/edit?_id=${postId}`
}

//declare request options
postsUrl = "/posts"
postsParams = {
    headers : {
        "Content-Type" : "application/json"
    },
    method : "GET"
}

 //send post request to server containing input as payload data
 fetch(postsUrl , postsParams)
 .then(response => response.json())//parse response into readable json
 .then((data)=>{

     if(data.error){
        //error from fetch
        alert("ERROR in fetch")
        console.log(data.error)
     }else{
         //no error

         //get auth token from cookie
         jwt = getCookie('jwt')

        //traverses the array and appends new row to table
        data.forEach(post => {
            //create new post row
            postRow = document.createElement("tr")
            newPost = `
            <td class="align-middle" >${post.title}</td>
            <td class="align-middle"> <img class = "table-img" src="data:image/jpg;base64,${_arrayBufferToBase64(post.picture.data)}" alt="" srcset=""> </td>
            <td class="align-middle">
                <button class="btn btn-primary" onclick = "editPost('${jwt}' , '${post._id}')">Edit</button>
                <button class="btn btn-secondary" onclick = "deletePost('${jwt}' , '${post._id}')">Delete</button>
            </td>
        
            `
            postRow.innerHTML = newPost


            //append new post row to table body
            tableBody.appendChild(postRow)

        });
     }
 })
 .catch(
     (error)=>{
         console.log(error)
     }
 )