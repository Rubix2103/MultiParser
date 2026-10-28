package com.example.shared;

import java.time.Instant;
import java.util.List;

public class AuditLogger {
    public static class AuditEntry {
        private final String id;
        private final String action;
        private final String principal;
        private final String timestamp;

        public AuditEntry(String id, String action, String principal) {
            this.id = id;
            this.action = action;
            this.principal = principal;
            this.timestamp = Instant.now().toString();
        }

        public String getId() { return id; }
        public String getAction() { return action; }
        public String getPrincipal() { return principal; }
        public String getTimestamp() { return timestamp; }

        @Override
        public String toString() {
            return String.format("[%s] Action: %s by %s (ID: %s)", timestamp, action, principal, id);
        }
    }

    private final DataRepository<AuditEntry> repository;

    public AuditLogger() {
        this.repository = new DataRepository<>();
    }

    public AuditLogger(DataRepository<AuditEntry> repository) {
        this.repository = repository;
    }

    public void log(String id, String action, String principal) {
        AuditEntry entry = new AuditEntry(id, action, principal);
        repository.save(id, entry);
    }

    public List<AuditEntry> getEntriesByPrincipal(String principal) {
        return repository.findMatching(entry -> entry.getPrincipal().equalsIgnoreCase(principal));
    }

    public int totalAuditCount() {
        return repository.count();
    }
}

