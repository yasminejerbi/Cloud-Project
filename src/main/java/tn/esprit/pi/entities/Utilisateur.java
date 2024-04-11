package tn.esprit.pi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nomUtilisateur;
    private String prenomUtilisateur;
    private String email;
    private String numTel;
    private String motDePasse;
    private String photo;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private Interet interet;
    @ManyToMany(mappedBy = "utilisateurs")
    private List<Club> clubs;
    @ManyToMany(mappedBy = "utilisateurs")
    private List<Evenement> evenements;

    // ... getters and setters
}

