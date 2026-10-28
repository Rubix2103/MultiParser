package com.example.shared;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class DataRepository<T> {
    private final Map<String, T> storage = new ConcurrentHashMap<>();

    public void save(String key, T value) {
        storage.put(key, value);
    }

    public T findById(String key) {
        return storage.get(key);
    }

    public boolean delete(String key) {
        return storage.remove(key) != null;
    }

    public int count() {
        return storage.size();
    }
}

