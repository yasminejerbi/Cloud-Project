package tn.esprit.pi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sponsors implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nomSponsor;
    private int dureeSponsoring;
    private Float montant;
    private String email;
    private String numTel;
    @Enumerated(EnumType.STRING)
    private Sponsoring_type typeSponsoring;

}
