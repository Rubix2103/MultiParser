package com.example.backend

import com.example.shared.NotificationHandler
import com.example.shared.EventBus
import com.example.shared.SystemEvent
import com.example.systems.NativeBridge

data class Order(
    val id: String,
    val customerName: String,
    val amount: Double,
    var status: String = "PENDING"
)

class OrderController(
    private val notificationHandler: NotificationHandler = NotificationHandler(),
    private val eventBus: EventBus = EventBus(),
    private val nativeBridge: NativeBridge = NativeBridge(),
    private val userService: UserService = UserService()
) {
    private val orders = mutableListOf<Order>()

    fun createOrder(id: String, customerName: String, amount: Double): Order? {
        val userOpt = userService.findUser(customerName)
        if (userOpt.isEmpty) {
            println("Cannot create order: User $customerName not found")
            return null
        }

        val order = Order(id, customerName, amount)
        orders.add(order)

        // Dispatch system event
        eventBus.publish(
            SystemEvent(
                topic = "ORDER_CREATED",
                payload = "Order $id for $customerName amount $amount",
                sender = customerName
            )
        )

        // Native bridge audit execution
        val engineResult = nativeBridge.safeExecute("Process order $id")
        println("Core engine returned: $engineResult")

        notificationHandler.sendNotification(customerName, "Your order #$id has been received.")
        return order
    }

    fun getOrderById(id: String): Order? {
        return orders.find { it.id == id }
    }

    fun listActiveOrders(): List<Order> {
        return orders.filter { it.status != "CANCELLED" }
    }

    fun cancelOrder(id: String, reason: String): Boolean {
        val order = getOrderById(id) ?: return false
        order.status = "CANCELLED"
        notificationHandler.sendNotification(order.customerName, "Order $id was cancelled: $reason")
        return true
    }
}
