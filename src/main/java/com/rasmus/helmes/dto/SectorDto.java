package com.rasmus.helmes.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectorDto {
    private Integer id;
    private String name;
    private Integer parentId;
}

