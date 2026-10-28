package com.example.backend;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserService {
    private final List<String> users = new ArrayList<>();

    public UserService() {
        users.add("Alice");
        users.add("Bob");
        users.add("Charlie");
    }

    public List<String> getAllUsers() {
        return new ArrayList<>(users);
    }

    public Optional<String> findUser(String name) {
        return users.stream()
                .filter(u -> u.equalsIgnoreCase(name))
                .findFirst();
    }

    public boolean addUser(String name) {
        if (name != null && !name.trim().isEmpty() && !users.contains(name)) {
            users.add(name);
            return true;
        }
        return false;
    }
}

