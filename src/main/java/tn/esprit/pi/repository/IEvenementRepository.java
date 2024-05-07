package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Evenement;

@Repository
public interface IEvenementRepository extends CrudRepository<Evenement,Long> {
}
