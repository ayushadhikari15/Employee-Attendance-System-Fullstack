// src/main/java/com/backend/Fullstack_project/controller/AttendanceController.java

package com.backend.Fullstack_project.controller;

import com.backend.Fullstack_project.dto.AttendanceRequest;
import com.backend.Fullstack_project.exception.UserNotFoundException;
import com.backend.Fullstack_project.model.Attendance;
import com.backend.Fullstack_project.model.User;
import com.backend.Fullstack_project.repository.AttendanceRepository;
import com.backend.Fullstack_project.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("http://localhost:3001") // Port 3001
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    // Attendance mark karne ke liye
    @PostMapping("/mark")
    public ResponseEntity<?> markAttendance(@Valid @RequestBody AttendanceRequest request) {
        // Check karein ki employee exist karta hai
        User employee = userRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new UserNotFoundException(request.getEmployeeId()));

        // Check karein ki aaj ki attendance pehle se mark hai ya nahi
        Optional<Attendance> existingAttendance = attendanceRepository.findByEmployeeIdAndDate(
                request.getEmployeeId(), LocalDate.now());

        if (existingAttendance.isPresent()) {
            // Agar hai, toh update karein
            Attendance attendance = existingAttendance.get();
            attendance.setStatus(request.getStatus());
            attendanceRepository.save(attendance);
            return ResponseEntity.ok("Attendance updated successfully for today.");
        } else {
            // Agar nahi, toh nayi banayein
            Attendance newAttendance = new Attendance();
            newAttendance.setEmployee(employee);
            newAttendance.setDate(LocalDate.now());
            newAttendance.setStatus(request.getStatus());
            attendanceRepository.save(newAttendance);
            return ResponseEntity.status(HttpStatus.CREATED).body("Attendance marked successfully for today.");
        }
    }

    // Ek employee ki saari attendance history get karne ke liye
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendanceForEmployee(@PathVariable Long employeeId) {
        if (!userRepository.existsById(employeeId)) {
            throw new UserNotFoundException(employeeId);
        }
        List<Attendance> attendanceHistory = attendanceRepository.findByEmployeeIdOrderByDateDesc(employeeId);
        return ResponseEntity.ok(attendanceHistory);
    }
}