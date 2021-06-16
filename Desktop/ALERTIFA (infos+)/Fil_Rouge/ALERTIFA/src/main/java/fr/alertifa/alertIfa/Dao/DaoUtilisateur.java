package fr.alertifa.alertIfa.Dao;

import fr.alertifa.alertIfa.Model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DaoUtilisateur extends JpaRepository<Utilisateur,Integer> {
    Utilisateur findById(int id);
    List<Utilisateur> findByNomContaining(String nom);
}
