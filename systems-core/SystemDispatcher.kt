package com.example.systems

import com.example.shared.EventBus
import com.example.shared.SystemEvent
import com.example.shared.AuditLogger

class SystemDispatcher(
    private val bridge: NativeBridge = NativeBridge(),
    private val eventBus: EventBus = EventBus(),
    private val auditLogger: AuditLogger = AuditLogger()
) {
    fun dispatchTask(taskId: String, taskPayload: String): String {
        auditLogger.log(taskId, "TASK_DISPATCHED", "SystemDispatcher")

        eventBus.publish(
            SystemEvent(
                topic = "NATIVE_TASK_START",
                payload = taskId,
                sender = "SystemDispatcher"
            )
        )

        val output = bridge.safeExecute(taskPayload)

        eventBus.publish(
            SystemEvent(
                topic = "NATIVE_TASK_COMPLETE",
                payload = output,
                sender = "SystemDispatcher"
            )
        )

        return output
    }
}

