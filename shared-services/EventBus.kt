package com.example.shared

import java.util.UUID

data class SystemEvent(
    val eventId: String = UUID.randomUUID().toString(),
    val topic: String,
    val payload: String,
    val sender: String
)

class EventBus(
    private val notificationHandler: NotificationHandler = NotificationHandler(),
    private val auditLogger: AuditLogger = AuditLogger()
) {
    private val subscribers = mutableMapOf<String, MutableList<(SystemEvent) -> Unit>>()

    fun subscribe(topic: String, handler: (SystemEvent) -> Unit) {
        subscribers.computeIfAbsent(topic) { mutableListOf() }.add(handler)
    }

    fun publish(event: SystemEvent) {
        auditLogger.log(event.eventId, "PUBLISH_${event.topic}", event.sender)
        val listeners = subscribers[event.topic] ?: emptyList()
        listeners.forEach { it(event) }
        notificationHandler.sendNotification(event.sender, "Event ${event.topic} dispatched to ${listeners.size} listeners")
    }

    fun subscriberCount(topic: String): Int = subscribers[topic]?.size ?: 0
}

