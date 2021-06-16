tab_user = document.querySelector('#tab_user');
nom = document.querySelector('#nom');
prenom = document.querySelector('#prenom');
mail = document.querySelector('#email');
nbUtil = document.querySelector('#nbUtil');
nbLigne = document.querySelector('#nbLigne');
envoi = document.querySelector('#envoi');
pseudo = document.querySelector('#pseudo');
message = document.querySelector('#message');
zone = document.querySelector('#zone');


if(sessionStorage.getItem("email") === "")
window.location = "connexion.html";

fetch('http://localhost:8082/messages')
.then(res => res.json())
.then(liste => {
    liste.forEach(msg => {
        zone.innerHTML +='<div class="alert alert-dismissible alert-warning">'
  
        +'<h6 class="alert-heading">Toto - '+msg.heure+'</h6>'
        +'<p class="mb-0">'
        +msg.texte
        +'</p>'
        +'</div>'
    })
})

function envoyer() {
let date1 = new Date();

let dateLocale = date1.toLocaleString('fr-FR',{
year: 'numeric',
month: 'long',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
});

const msg = {
    utilisateur_id : 2,
    texte : message.value,
    heure: dateLocale
};

message.value="";
zone.innerHTML +='<div class="alert alert-dismissible alert-warning" id="msg">'
  
+'<h6 class="alert-heading">Toto - '+msg.heure+'</h6>'
+'<p class="mb-0" >'
+msg.texte
+'</p>'
+'</div>'



fetch('http://localhost:8082/ajoutmessage',{
    method : 'POST',
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
}); 
}

function deconnexion()
{
    sessionStorage.setItem('email', "");
    const utilisateur = {
        profil: "Hors-Ligne"
    }
    window.location = "connexion.html";
}

