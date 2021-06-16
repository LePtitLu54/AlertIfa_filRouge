package fr.alertifa.alertIfa.Dao;

import fr.alertifa.alertIfa.Model.Groupe;
import fr.alertifa.alertIfa.Model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DaoGroupe extends JpaRepository<Groupe,Integer> {
    Groupe findById(int id);
}
