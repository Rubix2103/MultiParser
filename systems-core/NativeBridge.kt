package com.example.systems

class NativeBridge {
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
        return try {
            nativeExecute(payload)
        } catch (e: UnsatisfiedLinkError) {
            "Fallback Execution: $payload"
        }
    }
}

