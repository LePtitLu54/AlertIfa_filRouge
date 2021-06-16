package fr.alertifa.alertIfa.Model;

import com.fasterxml.jackson.annotation.JsonView;
import fr.alertifa.alertIfa.View.MyJsonView;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "groupe")
@EntityListeners(AuditingEntityListener.class)
public class Groupe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private int id;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private  String libelle;
    @JsonView({MyJsonView.UtilisateurVue.class,MyJsonView.GroupeVue.class})
    private String date;


    @ManyToMany(mappedBy = "Listegroupes")
    @JsonView({MyJsonView.GroupeVue.class})
    private List<Utilisateur> Listeutilisateurs;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<Utilisateur> getListeutilisateurs() {
        return Listeutilisateurs;
    }

    public void setListeutilisateurs(List<Utilisateur> listeutilisateurs) {
        Listeutilisateurs = listeutilisateurs;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
