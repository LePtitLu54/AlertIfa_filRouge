const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");


      
        
    

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const mdp = loginForm.mdp.value;

    

  

    fetch('http://localhost:8082/utilisateurs')
    .then(res => res.json())
    .then(liste => {
     
        liste.forEach(utilisateur => {
                
                if (utilisateur.mail === username && utilisateur.password === mdp ) {
                    utilisateur.profil = 'En ligne';
                    sessionStorage.setItem("email",utilisateur.mail);
                        if( utilisateur.statut==='admin'){
                            window.location = "index.html";   
                        }else{
                        window.location = "chat.html";
                    }
                }      
        })
        loginErrorMsg.style.opacity = 1;
    })  
})
