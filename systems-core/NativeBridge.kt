package com.example.systems

import com.example.shared.NotificationHandler
import com.example.shared.AuditLogger

class NativeBridge(
    private val notificationHandler: NotificationHandler = NotificationHandler(),
    private val auditLogger: AuditLogger = AuditLogger()
) {
    companion object {
        init {
            // Load Rust native library if present
            try {
                System.loadLibrary("systems_core")
            } catch (e: UnsatisfiedLinkError) {
                // Fallback for mock environments
            }
        }
    }

    external fun nativeExecute(payload: String): String

    fun safeExecute(payload: String): String {
        auditLogger.log("req-" + System.currentTimeMillis(), "NATIVE_EXEC", "NativeBridge")
        return try {
            nativeExecute(payload)
        } catch (e: UnsatisfiedLinkError) {
            val fallback = "Fallback Execution: $payload"
            notificationHandler.sendNotification("ops@system.local", "Native library missing, used fallback")
            fallback
        }
    }
}
