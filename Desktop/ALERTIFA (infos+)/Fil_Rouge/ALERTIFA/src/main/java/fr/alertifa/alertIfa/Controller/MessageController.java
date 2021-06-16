package fr.alertifa.alertIfa.Controller;

import fr.alertifa.alertIfa.Dao.DaoMessage;
import fr.alertifa.alertIfa.Model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MessageController {
    DaoMessage daoMessage;

    @Autowired
    public MessageController(DaoMessage daoMessage) {
        this.daoMessage = daoMessage;
    }

    @GetMapping("/messages")
    public List<Message> afficher(){
        return daoMessage.findAll();
    }

    @PostMapping("/ajoutmessage")
    public boolean ajouter(@RequestBody Message message){
        daoMessage.save(message);
        return true;
    }
}
