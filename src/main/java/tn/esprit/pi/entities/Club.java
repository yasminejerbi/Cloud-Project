package tn.esprit.pi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Club implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nomClub;
    private String description;
    private String categorie;
    private String adresse;
    private String site;
    private String adresse_mail;
    private Float cotisation;
    private String logo;
    @ManyToMany
    @JsonIgnore
    private List<Utilisateur> utilisateurs;
    @ManyToMany(mappedBy = "clubs")
    private List<Evenement> evenements;


    // ... getters and setters
}
