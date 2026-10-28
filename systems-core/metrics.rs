pub struct SystemMetrics {
    pub total_ops: u64,
    pub error_count: u64,
    pub last_latency_ms: f64,
}

impl SystemMetrics {
    pub fn new() -> Self {
        SystemMetrics {
            total_ops: 0,
            error_count: 0,
            last_latency_ms: 0.0,
        }
    }

    pub fn record_success(&mut self, latency_ms: f64) {
        self.total_ops += 1;
        self.last_latency_ms = latency_ms;
    }

    pub fn record_error(&mut self) {
        self.total_ops += 1;
        self.error_count += 1;
    }

    pub fn success_rate(&self) -> f64 {
        if self.total_ops == 0 {
            return 100.0;
        }
        let successful = self.total_ops - self.error_count;
        (successful as f64 / self.total_ops as f64) * 100.0
    }
}

