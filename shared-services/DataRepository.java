package com.example.shared;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.function.Predicate;

public class DataRepository<T> {
    private final Map<String, T> storage = new ConcurrentHashMap<>();

    public void save(String key, T value) {
        if (key == null || value == null) {
            throw new IllegalArgumentException("Key and value must not be null");
        }
        storage.put(key, value);
    }

    public T findById(String key) {
        return storage.get(key);
    }

    public List<T> findAll() {
        return new ArrayList<>(storage.values());
    }

    public List<T> findMatching(Predicate<T> condition) {
        List<T> results = new ArrayList<>();
        for (T item : storage.values()) {
            if (condition.test(item)) {
                results.add(item);
            }
        }
        return results;
    }

    public boolean delete(String key) {
        return storage.remove(key) != null;
    }

    public int count() {
        return storage.size();
    }

    public void clear() {
        storage.clear();
    }
}
