form = document.getElementById("loginForm")

form.onsubmit = (e)=>{
    e.preventDefault();

    usernameInput = document.getElementById("usernameInput").value
    passwordInput = document.getElementById("passwordInput").value

    //create login paylaod
    loginPayload = {
        username : usernameInput,
        password : passwordInput
    }



    //declare request options
    loginUrl = '/users/login'
    loginParams = {
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(loginPayload),
        method : "POST"
    }

    //send login req to server
    loginRequest(loginUrl , loginParams)


}

const loginRequest = (loginUrl , loginParams)=>{
        //send post request to server containing input as payload data
        fetch(loginUrl , loginParams)
        .then(response => response.json())//parse response into readable json
        .then((data)=>{
            //display status message according to resposne
            statusMessage = document.getElementById('statusMessage')
    
            if(data.error){
                statusMessage.innerHTML = `${data.error}`
                statusMessage.classList.remove('hide');
                form.reset()
            }else{
                //redirect to dashoard page
                document.cookie = `jwt=${data.token}`;
                window.location.href = '/admin/dashboard'
            }
        })
        .catch(
            (error)=>{
                statusMessage.innerHTML = `${error.message}`
                statusMessage.classList.remove('hide');
            }
        )
}

