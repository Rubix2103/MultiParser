package com.example.shared

class NotificationHandler {
    private val sentLog = mutableListOf<String>()

    fun sendNotification(recipient: String, message: String): Boolean {
        if (recipient.isBlank() || message.isBlank()) {
            return false
        }
        val record = "To: $recipient | Content: $message"
        sentLog.add(record)
        println("Sending notification: $record")
        return true
    }

    fun broadcast(recipients: List<String>, message: String): Int {
        return recipients.count { sendNotification(it, message) }
    }

    fun getHistory(): List<String> = sentLog.toList()
}
