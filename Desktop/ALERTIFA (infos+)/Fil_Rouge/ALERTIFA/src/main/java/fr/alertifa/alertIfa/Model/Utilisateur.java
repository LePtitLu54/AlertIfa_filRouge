package fr.alertifa.alertIfa.Model;

import com.fasterxml.jackson.annotation.JsonView;
import fr.alertifa.alertIfa.View.MyJsonView;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "utilisateur")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private int id;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String pseudo;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String nom;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String prenom;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String mail;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String statut;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String profil;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String password;


    @OneToMany(mappedBy = "utilisateur")
    private List<Message> Listemessage = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "utilisateurs_groupes",
            joinColumns = @JoinColumn(name = "id_utilisateur"),
            inverseJoinColumns = @JoinColumn(name = "id_groupe")
    )
    @JsonView({MyJsonView.UtilisateurVue.class})
    private List<Groupe> Listegroupes = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public List<Message> getListemessage() {
        return Listemessage;
    }

    public void setListemessage(List<Message> listemessage) {
        Listemessage = listemessage;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getProfil() {
        return profil;
    }

    public void setProfil(String profil) {
        this.profil = profil;
    }

    public List<Groupe> getListegroupes() {
        return Listegroupes;
    }

    public void setListegroupes(List<Groupe> listegroupes) {
        Listegroupes = listegroupes;
    }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }
}
