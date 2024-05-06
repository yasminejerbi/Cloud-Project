package tn.esprit.pi.services;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pi.entities.Evenement;
import tn.esprit.pi.entities.Sponsors;
import tn.esprit.pi.repository.IEvenementRepository;
import tn.esprit.pi.repository.ISponsorsRepository;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service

public class GestionEvenementImpl implements IGestionEvenement{


    @Autowired
    IEvenementRepository evenementRepository;
    @Autowired
    ISponsorsRepository sponsorsRepository;

    @Override
    public void removeSponsorsFromEventbyId(Long idEvent,Long idSponsors){
        Evenement evenement=evenementRepository.findById(idEvent).get();
        evenement.getSponsors().remove(sponsorsRepository.findById(idSponsors));
        evenementRepository.save(evenement);
    }
    public List<Evenement> retrieveAllEvenement(){
        return (List<Evenement>) evenementRepository.findAll();
    }


    public Evenement addorUpdateEvenement (Evenement evenement){
            // Check if the event already exists in the database
            for(Evenement e:evenementRepository.findAll()){
                if(e.getId() == evenement.getId()){
                    e = evenement;

                    return evenementRepository.save(e);
                }

            }
            return evenementRepository.save(evenement);

    }
    public void removeEvenement (Long idEvenement){
        evenementRepository.delete(evenementRepository.findById(idEvenement).get());
    }
    public Evenement retrieveEvenement (Long idEvenement){
        return evenementRepository.findById(idEvenement).get();
    }
    @Override
    public void UpdateEvenement(Evenement evenement){
        evenementRepository.updateEvenement(evenement);
    }

    /*@Override
    public Evenement assignEvenementToClub(Long numEvenement, Long numSponsors) {
        Evenement e = evenementRepository.findById(numEvenement).get();
        Sponsors p = sponsorsRepository.findById(numSponsors).get();
        p.getEvenements().add(e);
        sponsorsRepository.save(p);
        return e;
    }*/


}
