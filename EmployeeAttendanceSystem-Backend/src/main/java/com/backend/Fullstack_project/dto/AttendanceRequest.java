// src/main/java/com/backend/Fullstack_project/dto/AttendanceRequest.java

package com.backend.Fullstack_project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AttendanceRequest {

    @NotNull
    private Long employeeId;

    @NotBlank
    private String status;

    // Getters and Setters
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}