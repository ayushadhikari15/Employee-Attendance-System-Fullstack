// src/main/java/com/backend/Fullstack_project/model/User.java

package com.backend.Fullstack_project.model;

import jakarta.persistence.*; // Imports update karein
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Set; // Set import karein

@Entity
@Table(name = "users")
public class User implements UserDetails { // UserDetails implement karein

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false) // Username unique aur not null hona chahiye
    private String username;

    @Column(unique = true, nullable = false) // Email unique aur not null hona chahiye
    private String email;

    @Column(nullable = false) // Password not null hona chahiye
    private String password;

    // === NAYI RELATIONSHIP ===
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Attendance> attendanceRecords;
    // === END NAYI RELATIONSHIP ===


    // --- UserDetails ke required methods ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Hum abhi roles (like ROLE_ADMIN, ROLE_USER) istemal nahi kar rahe hain,
        // isliye empty list bhej rahe hain.
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // true rakhein
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // true rakhein
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // true rakhein
    }

    @Override
    public boolean isEnabled() {
        return true; // true rakhein
    }

    // --- Purane Getters aur Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // --- Naye Setter ---

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // --- Naye Getter/Setter (Attendance ke liye) ---
    public Set<Attendance> getAttendanceRecords() {
        return attendanceRecords;
    }

    public void setAttendanceRecords(Set<Attendance> attendanceRecords) {
        this.attendanceRecords = attendanceRecords;
    }
}