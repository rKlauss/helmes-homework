package com.rasmus.helmes.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Entity
@Getter
@Setter
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean agree;

    @ManyToMany
    @JoinTable(
            name = "user_sector",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "sector_id")
    )
    private Set<Sector> sectors;
}
