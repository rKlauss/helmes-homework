package com.rasmus.helmes.controller;

import com.rasmus.helmes.dto.SectorDto;
import com.rasmus.helmes.dto.UserDataDto;
import com.rasmus.helmes.model.Sector;
import com.rasmus.helmes.model.UserData;
import com.rasmus.helmes.repository.SectorRepository;
import com.rasmus.helmes.repository.UserDataRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
@RequiredArgsConstructor
public class UserController {

    private final SectorRepository sectorRepo;
    private final UserDataRepository userRepo;

    @GetMapping("/sectors")
    public List<SectorDto> getSectors() {
        return sectorRepo.findAll().stream()
                .map(s -> new SectorDto(s.getId(), s.getName(), s.getParentId()))
                .collect(Collectors.toList());
    }

    @PostMapping("/user")
    public UserDataDto saveUser(@Valid @RequestBody UserDataDto dto) {
        UserData user = new UserData();
        user.setName(dto.getName());
        user.setAgree(dto.getAgree());
        Set<Sector> sectors = dto.getSectorIds().stream()
                .map(id -> sectorRepo.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid sector id: " + id)))
                .collect(Collectors.toSet());
        user.setSectors(sectors);
        UserData saved = userRepo.save(user);
        return toDto(saved);
    }

    @GetMapping("/user/{id}")
    public UserDataDto getUser(@PathVariable Long id) {
        UserData u = userRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toDto(u);
    }

    @GetMapping("/users")
    public List<UserDataDto> getAllUsers() {
        return userRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @PutMapping("/user/{id}")
    public UserDataDto updateUser(@PathVariable Long id, @Valid @RequestBody UserDataDto dto) {
        UserData user = userRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setName(dto.getName());
        user.setAgree(dto.getAgree());
        Set<Sector> sectors = dto.getSectorIds().stream()
                .map(sectorId -> sectorRepo.findById(sectorId)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid sector id: " + sectorId)))
                .collect(Collectors.toSet());
        user.setSectors(sectors);
        UserData updated = userRepo.save(user);
        return toDto(updated);
    }

    private UserDataDto toDto(UserData u) {
        return new UserDataDto(
                u.getId(),
                u.getName(),
                u.getSectors().stream().map(Sector::getId).collect(Collectors.toSet()),
                u.isAgree()
        );
    }
}
