//get cookie and check if the jwt on cookie is valid

//get cookie value function, returns cookie value given the name
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

    //declare request options
    authUrl = '/admin/dashboardAuth'
    authParams = {
        headers : {
            "Authorization" : `Bearer ${getCookie('jwt')}`
        },
        method : "GET"
    }


 //send post request to server containing input as payload data
 fetch(authUrl , authParams)
 .then(response => response.json())//parse response into readable json
 .then((data)=>{
   
    //if error exists in resposne then redirect user back to login page
     if(data.Error){
         alert(data.Error)
         window.location.href = '/admin'
     }else{
        alert("SUCC")
        console.log(data)
     }
 })
 .catch(
     (error)=>{
        alert(data.Error)
        console.log(error)
        window.location.href = '/admin'
        
     }
 )