tab_user = document.querySelector('#tab_user');
nom = document.querySelector('#nom');
prenom = document.querySelector('#prenom');
mail = document.querySelector('#mail');
pseudo = document.querySelector('#pseudo');
statut = document.querySelector('#statut');
password = document.querySelector('#password');
profil = document.querySelector('#profil');
nbUtil = document.querySelector('#nbUsers');
nbUsersActiv = document.querySelector('#nbUsersActiv');
envoi = document.querySelector('#envoi');;
message = document.querySelector('#message');
zone = document.querySelector('#zone');
libelle = document.querySelector('#libelle');
formulaire = document.querySelector('#formulaire');
choixGroupe = document.querySelector('#choixGroupe');
info = document.querySelector('#info');
nomI = document.querySelector('#nomI');
prenomI = document.querySelector('#prenomI');
mailI = document.querySelector('#mailI');
pseudoI = document.querySelector('#pseudoI');
idI = document.querySelector('#idI');
passwordI = document.querySelector('#passwordI');
statutI = document.querySelector('#statutI');
choixGroupe = document.querySelector('#choixGroupe');
choixGroupeI = document.querySelector('#choixGroupeI');
groupeAjouter = document.querySelector('#groupeAjouter');
AjouterGroupe = document.querySelector('#AjouterGroupe');
userId = document.querySelector('#userId');
chercher = document.querySelector('#chercher');
let urlutilisateur;
nbGroups = document.querySelector('#nbGroups');

deconnectionButton = document.getElementById("deconnection");

if(sessionStorage.getItem("email") === "" )
window.location = "connexion.html";
listerUtilisateurs();
listerGroupe();

function informer(event) {
    info.style.display = 'flex';
   

    fetch('http://localhost:8082/utilisateur/' + event.target.value)
        .then(res => res.json())
        .then(utilisateur => {
           
            idI.setAttribute("value",utilisateur.id)
            nomI.setAttribute("value",utilisateur.nom)
            prenomI.setAttribute("value",utilisateur.prenom)
            mailI.setAttribute("value",utilisateur.mail)
            profilI.setAttribute("value",utilisateur.profil)
          
            pseudoI.setAttribute("value",utilisateur.pseudo)
            
          
        })

}

 function validerG() {
    
    if(libelle.value != ""){
        let date1 = new Date();

let dateLocale = date1.toLocaleString('fr-FR',{
year: 'numeric',
month: 'long',
day: 'numeric'
});
    const groupe = {
        libelle : libelle.value,
        date : dateLocale
    }
    fetch('http://localhost:8082/ajoutgroupe',{
    method : 'POST',
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(groupe)
}); 

    }
    formulaireGroupe.style.display = 'none';
    window.location.reload();
}

function addUtilisateur() {
    formulaire.style.display = 'flex';
}

function cancel() {
    formulaire.style.display = 'none';
    info.style.display = 'none';
}

function addGroupe() {
    formulaireGroupe.style.display = 'flex';
}

function cancelG() {
    formulaireGroupe.style.display = 'none';
}

function valider() {
    const utilisateur = {
        nom: nom.value,
        prenom: prenom.value,
        mail: mail.value,
        pseudo: pseudo.value,
        statut: statut.value,
        profil: "Hors ligne",
        password : password.value,
        Listegroupes : [{id : choixGroupe.value}]
      
    }
    fetch('http://localhost:8082/ajoututilisateur',{
    method : 'POST',
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(utilisateur)
    
}).then(response => {
    if(response.ok){
    formulaire.style.display = 'none';
    window.location.reload();
    }
}).catch(err => {alert(err);}); 
    
}

function supprimerUser(event) {
   
    fetch('http://localhost:8082/utilisateur/'+event.target.value,{
        method : 'DELETE'
    }); 
    window.location.reload();
}
function supprimerGroupe(event) {
   


    fetch('http://localhost:8082/supprimer/'+event.target.value,{
        method : 'DELETE'
    }); 
    window.location.reload();
}

function listerUtilisateurs() {
var a = 0;
    fetch('http://localhost:8082/utilisateurs'

    ,{
        method : 'GET',
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
     } )
        .then(res => res.json())
        .then(liste => {
            nbUtil.innerHTML = liste.length;
            liste.forEach(utilisateur => {
               // if(utilisateur.statut.includes("en ligne"))
                a++;
                choixGroupeI.innerHTML = '';
                utilisateur.Listegroupes.forEach(groupe => {
                    choixGroupeI.innerHTML += '<li>' + groupe.libelle + '</li>';
                });

                tab_user.innerHTML += "<tr class=\"table-defaut\">"
                    + "<td>" + utilisateur.nom + "</td>"
                    + "<td>" + utilisateur.prenom + "</td>"
                    + "<td>" + utilisateur.mail + "</td>"
                    + "<td>" + utilisateur.profil + "</td>"
                    + "<td>" + choixGroupeI.innerHTML + "</td>"
                    + "<td><div class=\"btn-group-vertical\"><button type=\"button\" class=\"btn btn-outline-warning btn-sm\" value=" + utilisateur.id + " onclick=\"informer(event)\">Modifier</button>"
                    + "<button type=\"button\" class=\"btn btn-outline-danger btn-sm\" value=" + utilisateur.id + " onclick=\"supprimerUser(event)\">Supprimer</button></div></td>"
                    + "<td><div class=\"btn-group-vertical\"><button type=\"button\" class=\"btn btn-outline-success  btn-sm\" value=" + utilisateur.id + " onclick=\"addGroupes(event)\">+groupe</button>"
                    + "<button type=\"button\" class=\"btn btn-outline-danger  btn-sm\" value=" + utilisateur.id + " onclick=\"addGroupes(event)\">-groupe</button></div></td>"
                    + "</tr>";
            })
        })
        nbUsersActiv.innerHTML = a; 
}

function listerGroupe() {
    fetch('http://localhost:8082/groupes')
    .then(res => res.json()) 
    .then(liste => {
    
    liste.forEach(groupe => {
        nbGroups.innerHTML = liste.length;
       tab_groupe.innerHTML += " <tr class=\"table-defaut\">"
       +"<td>"+ groupe.libelle+"</td>"
       +"<td>"+ groupe.date+"</td>"
       +"<td><button type=\"button\" class=\"btn btn-outline-danger btn-sm\" value="+groupe.id+" onclick=\"supprimerGroupe(event)\">Supprimer</button></td>"
       
     +"</tr>";
   
     choixGroupe.innerHTML += '<option value='+groupe.id+'>'+groupe.libelle+'</option>'
     groupeAjouter.innerHTML += '<option value='+groupe.id+'>'+groupe.libelle+'</option>'
   
    })
   
    })
    
}

function okInfo() {
    info.style.display = 'none';
    nomI.innerHTML = "Nom : ";
prenomI.innerHTML = "Prénom : ";
mailI.innerHTML = "Email : ";
pseudoI.innerHTML = "Pseudo : ";
profilI.innerHTML = "Profil : ";
statutI.innerHTML = "Statut : ";
    
}

function change() {
    const utilisateur = {
        id:idI.value,
        nom: nomI.value,
        prenom: prenomI.value,
        mail: mailI.value,
        pseudo: pseudoI.value,
        profil: profilI.value,
      
    }

   
    fetch('http://localhost:8082/utilisateur',{
    method : 'PATCH',
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(utilisateur)
}).then(response => {
    formulaire.style.display = 'none';
    window.location.reload();
}); 
    
}

function addGroupes(event) {
    userId.innerHTML = event.target.value;
    AjouterGroupe.style.display = 'flex';
    if(event.target.innerHTML == '+groupe')
        urlutilisateur = 'http://localhost:8082/ajoutergroupe';
        else
        urlutilisateur = 'http://localhost:8082/retirergroupe';
}

function cancelAG() {
    AjouterGroupe.style.display = 'none';
}

function validerAG(event) {
    const utilisateur = {
        id:userId.innerHTML,
        
        Listegroupes : [{id : groupeAjouter.value}]
      
    }

   
    fetch(urlutilisateur,{
    method : 'PATCH',
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(utilisateur)
}).then(response => {
    AjouterGroupe.style.display = 'none';
    window.location.reload();
}); 
  
}

function rechercher() {
    tab_user.innerHTML ="";
    
    fetch('http://localhost:8082/recherche/utilisateurs/'+chercher.value)
        .then(res => res.json())
        .then(liste => {
            
            liste.forEach(utilisateur => {
                choixGroupeI.innerHTML = '';
                utilisateur.Listegroupes.forEach(groupe => {
                    choixGroupeI.innerHTML += '<li>' + groupe.libelle + '</li>';
                });

                tab_user.innerHTML += "<tr class=\"table-defaut\">"
                    + "<td>" + utilisateur.nom + "</td>"
                    + "<td>" + utilisateur.prenom + "</td>"
                    + "<td>" + utilisateur.mail + "</td>"
                    + "<td>" + utilisateur.profil + "</td>"
                    + "<td>" + choixGroupeI.innerHTML + "</td>"
                    + "<td><div class=\"btn-group-vertical\"><button type=\"button\" class=\"btn btn-warning btn-sm\" value=" + utilisateur.id + " onclick=\"informer(event)\">Modifier</button>"
                    + "<button type=\"button\" class=\"btn btn-danger btn-sm\" value=" + utilisateur.id + " onclick=\"supprimerUser(event)\">Supprimer</button></div></td>"
                    + "<td><div class=\"btn-group-vertical\"><button type=\"button\" class=\"btn btn-outline-success btn-sm\" value=" + utilisateur.id + " onclick=\"addGroupes(event)\">+groupe</button>"
                    + "<button type=\"button\" class=\"btn btn-outline-danger btn-sm\" value=" + utilisateur.id + " onclick=\"addGroupes(event)\">-groupe</button></div></td>"
                    + "</tr>";
            })
        })
    
}

/*deconnectionButton.addEventListener("click", (e) =>{
    
    function change() {
        const utilisateur = {
            profil: "Hors-Ligne"
        }
        fetch('http://localhost:8082/utilisateur',{
        method : 'PATCH',
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(utilisateur)
    }).then(response => {
        formulaire.style.display = 'none';
        window.location.reload();
    }); 
      window.location = "connexion.html";  
    }
})*/

function deconnexion()
{
    sessionStorage.setItem('email', "");
    const utilisateur = {
        profil: "Hors-Ligne"
    }
    window.location = "connexion.html";
}