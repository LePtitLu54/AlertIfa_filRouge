package fr.alertifa.alertIfa.Dao;

import fr.alertifa.alertIfa.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DaoMessage extends JpaRepository<Message,Integer> {


}
