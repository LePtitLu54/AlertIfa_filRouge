package fr.alertifa.alertIfa.Controller;

import com.fasterxml.jackson.annotation.JsonView;
import fr.alertifa.alertIfa.Dao.DaoGroupe;
import fr.alertifa.alertIfa.Dao.DaoUtilisateur;
import fr.alertifa.alertIfa.Model.Groupe;
import fr.alertifa.alertIfa.Model.Utilisateur;
import fr.alertifa.alertIfa.View.MyJsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
public class UtilisateurController {
    DaoUtilisateur daoUtilisateur;
    DaoGroupe daoGroupe;

    @Autowired
    public UtilisateurController(DaoUtilisateur daoUtilisateur, DaoGroupe daoGroupe) {
        this.daoUtilisateur = daoUtilisateur;
        this.daoGroupe = daoGroupe;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @GetMapping("/utilisateurs")
    public List<Utilisateur> afficher() {
        return daoUtilisateur.findAll();
    }

    @PostMapping("/ajoututilisateur")
    public boolean ajouter(@RequestBody Utilisateur utilisateur) {

        daoUtilisateur.save(utilisateur);
        return true;
    }

    @DeleteMapping("/utilisateur/{id}")
    public boolean deleteUtilisateur(@PathVariable int id) {
        daoUtilisateur.deleteById(id);
        return true;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @GetMapping("/utilisateur/{id}")
    public Utilisateur getUtilisateur(@PathVariable int id) {
        Utilisateur utilisateur = daoUtilisateur.findById(id);
        return utilisateur;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @PatchMapping("/utilisateur")
    public boolean setUtilisateur(@RequestBody Utilisateur utilisateurMod) {
        Utilisateur utilisateur = daoUtilisateur.findById(utilisateurMod.getId());
        utilisateur.setNom(utilisateurMod.getNom());
        utilisateur.setPrenom(utilisateurMod.getPrenom());
        utilisateur.setProfil(utilisateurMod.getProfil());
        utilisateur.setMail(utilisateurMod.getMail());
        daoUtilisateur.save(utilisateur);
        return true;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @PatchMapping("/utilisateur/profil")
    public boolean setUtilisateurProfil(@RequestBody Utilisateur utilisateurMod) {
        Utilisateur utilisateur = daoUtilisateur.findById(utilisateurMod.getId());

        utilisateur.setProfil(utilisateurMod.getProfil());

        daoUtilisateur.save(utilisateur);
        return true;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @PatchMapping("/ajoutergroupe")
    public boolean addGroupe(@RequestBody Utilisateur utilisateurMod) {
        Utilisateur utilisateur = daoUtilisateur.findById(utilisateurMod.getId());
        utilisateur.getListegroupes().add(utilisateurMod.getListegroupes().get(0));
        daoUtilisateur.save(utilisateur);
        return true;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @PatchMapping("/retirergroupe")
    public boolean delGroupe(@RequestBody Utilisateur utilisateurMod) {
        Utilisateur utilisateur = daoUtilisateur.findById(utilisateurMod.getId());
        Groupe groupe = daoGroupe.findById(utilisateurMod.getListegroupes().get(0).getId());

        utilisateur.getListegroupes().remove(groupe);
        daoUtilisateur.save(utilisateur);
        return true;
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @GetMapping("/nbusers")
    public long usersCount() {

        return daoUtilisateur.count();
    }

    @JsonView({MyJsonView.UtilisateurVue.class})
    @GetMapping("/recherche/utilisateurs/{nom}")
    public List<Utilisateur> chercher(@PathVariable String nom) {
        return daoUtilisateur.findByNomContaining(nom);
    }
}
