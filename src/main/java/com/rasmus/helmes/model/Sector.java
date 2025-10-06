package com.rasmus.helmes.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sector {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Sector parent;

    @Transient
    public Integer getParentId() {
        return parent != null ? parent.getId() : null;
    }
}
