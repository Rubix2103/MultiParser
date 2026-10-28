package com.example.backend

data class Order(
    val id: String,
    val customerName: String,
    val amount: Double,
    val status: String = "PENDING"
)

class OrderController {
    private val orders = mutableListOf<Order>()

    fun createOrder(id: String, customerName: String, amount: Double): Order {
        val order = Order(id, customerName, amount)
        orders.add(order)
        return order
    }

    fun getOrderById(id: String): Order? {
        return orders.find { it.id == id }
    }

    fun listActiveOrders(): List<Order> {
        return orders.filter { it.status != "CANCELLED" }
    }
}

