package com.example.backend

import com.example.systems.NativeBridge
import com.example.shared.NotificationHandler

class ApiGatewayRouter(
    private val userController: UserService = UserService(),
    private val orderController: OrderController = OrderController(),
    private val nativeBridge: NativeBridge = NativeBridge(),
    private val notificationHandler: NotificationHandler = NotificationHandler()
) {
    fun routeRequest(path: String, method: String, payload: Map<String, Any>): String {
        println("Routing [$method] $path")

        return when {
            path.startsWith("/api/users") -> {
                val users = userController.allUsers
                """{"status": 200, "users": $users}"""
            }

            path.startsWith("/api/orders") && method == "POST" -> {
                val id = payload["id"] as? String ?: "ord-default"
                val customer = payload["customer"] as? String ?: "Alice"
                val amount = (payload["amount"] as? Number)?.toDouble() ?: 0.0
                val created = orderController.createOrder(id, customer, amount)
                if (created != null) {
                    """{"status": 201, "orderId": "${created.id}"}"""
                } else {
                    """{"status": 400, "error": "Order creation failed"}"""
                }
            }

            path.startsWith("/api/native/execute") -> {
                val command = payload["cmd"] as? String ?: "ping"
                val result = nativeBridge.safeExecute(command)
                """{"status": 200, "engineOutput": "$result"}"""
            }

            else -> """{"status": 404, "error": "Not Found"}"""
        }
    }

    fun broadcastAlert(message: String): Int {
        val users = userController.allUsers
        return notificationHandler.broadcast(users, message)
    }
}

