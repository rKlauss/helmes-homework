package com.rasmus.helmes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDataDto {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotEmpty(message = "At least one sector must be selected")
    private Set<Integer> sectorIds = new HashSet<>();

    @NotNull(message = "Agree is required")
    private Boolean agree;
}