package com.example.backend;

import com.example.shared.DataRepository;
import com.example.shared.AuditLogger;

import java.util.List;
import java.util.Optional;

public class OrderService {
    public static class OrderRecord {
        private final String orderId;
        private final String customerName;
        private final double totalAmount;
        private String status;

        public OrderRecord(String orderId, String customerName, double totalAmount) {
            this.orderId = orderId;
            this.customerName = customerName;
            this.totalAmount = totalAmount;
            this.status = "CREATED";
        }

        public String getOrderId() { return orderId; }
        public String getCustomerName() { return customerName; }
        public double getTotalAmount() { return totalAmount; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    private final DataRepository<OrderRecord> orderRepository;
    private final AuditLogger auditLogger;
    private final UserService userService;

    public OrderService(UserService userService, AuditLogger auditLogger) {
        this.userService = userService;
        this.auditLogger = auditLogger;
        this.orderRepository = new DataRepository<>();
    }

    public Optional<OrderRecord> placeOrder(String orderId, String customerName, double amount) {
        // Validate customer exists in UserService
        if (userService.findUser(customerName).isEmpty()) {
            return Optional.empty();
        }

        OrderRecord order = new OrderRecord(orderId, customerName, amount);
        orderRepository.save(orderId, order);
        auditLogger.log(orderId, "ORDER_PLACED", customerName);
        return Optional.of(order);
    }

    public List<OrderRecord> getOrdersForCustomer(String customerName) {
        return orderRepository.findMatching(o -> o.getCustomerName().equalsIgnoreCase(customerName));
    }

    public boolean updateStatus(String orderId, String newStatus, String actor) {
        OrderRecord order = orderRepository.findById(orderId);
        if (order != null) {
            order.setStatus(newStatus);
            auditLogger.log(orderId, "ORDER_STATUS_" + newStatus, actor);
            return true;
        }
        return false;
    }
}

