package com.example.backend;

import com.example.shared.DataRepository;
import com.example.shared.AuditLogger;

import java.util.List;
import java.util.Optional;

public class UserService {
    private final DataRepository<String> userRepository;
    private final AuditLogger auditLogger;

    public UserService() {
        this.userRepository = new DataRepository<>();
        this.auditLogger = new AuditLogger();
        initializeDefaults();
    }

    public UserService(DataRepository<String> repository, AuditLogger auditLogger) {
        this.userRepository = repository;
        this.auditLogger = auditLogger;
        initializeDefaults();
    }

    private void initializeDefaults() {
        addUser("system", "Alice");
        addUser("system", "Bob");
        addUser("system", "Charlie");
    }

    public List<String> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<String> findUser(String name) {
        if (name == null) return Optional.empty();
        return userRepository.findAll().stream()
                .filter(u -> u.equalsIgnoreCase(name))
                .findFirst();
    }

    public boolean addUser(String actor, String name) {
        if (name != null && !name.trim().isEmpty() && findUser(name).isEmpty()) {
            userRepository.save(name.toLowerCase(), name);
            auditLogger.log(name, "USER_CREATED", actor);
            return true;
        }
        return false;
    }

    public boolean removeUser(String actor, String name) {
        boolean removed = userRepository.delete(name.toLowerCase());
        if (removed) {
            auditLogger.log(name, "USER_DELETED", actor);
        }
        return removed;
    }

    public int count() {
        return userRepository.count();
    }
}
