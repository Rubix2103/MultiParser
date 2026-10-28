package com.example.shared

class NotificationHandler {
    fun sendNotification(recipient: String, message: String): Boolean {
        if (recipient.isBlank() || message.isBlank()) {
            return false
        }
        println("Sending notification to $recipient: $message")
        return true
    }

    fun broadcast(recipients: List<String>, message: String): Int {
        return recipients.count { sendNotification(it, message) }
    }
}

