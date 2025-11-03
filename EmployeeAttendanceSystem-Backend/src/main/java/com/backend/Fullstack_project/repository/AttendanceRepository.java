// src/main/java/com/backend/Fullstack_project/repository/AttendanceRepository.java

package com.backend.Fullstack_project.repository;

import com.backend.Fullstack_project.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Ek employee ki saari attendance history fetch karne ke liye
    List<Attendance> findByEmployeeIdOrderByDateDesc(Long employeeId);

    // Yeh check karne ke liye ki aaj ki attendance pehle hi mark ho chuki hai
    Optional<Attendance> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
}