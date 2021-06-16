package fr.alertifa.alertIfa.Controller;

import com.fasterxml.jackson.annotation.JsonView;
import fr.alertifa.alertIfa.Dao.DaoGroupe;
import fr.alertifa.alertIfa.Model.Groupe;
import fr.alertifa.alertIfa.View.MyJsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GroupeController {
    DaoGroupe daoGroupe;

    @Autowired
    public GroupeController(DaoGroupe daoGroupe) {
        this.daoGroupe = daoGroupe;
    }

    @JsonView({MyJsonView.GroupeVue.class})
    @GetMapping("/groupes")
    public List<Groupe> afficher(){
        return daoGroupe.findAll();
    }

    @PostMapping("/ajoutgroupe")
    public boolean ajouter(@RequestBody Groupe groupe){
        daoGroupe.saveAndFlush(groupe);
        return true;
    }
    @DeleteMapping("/supprimer/{id}")
    public boolean supprimer(@PathVariable int id){
        daoGroupe.deleteById(id);
        return true;
    }

    @GetMapping("/nbgroups")
    public long groupsCount() {

        return daoGroupe.count();
    }
}
