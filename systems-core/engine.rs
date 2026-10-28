use crate::buffer::RingBuffer;
use crate::metrics::SystemMetrics;

pub struct ComputeEngine {
    pub workers: usize,
    pub task_count: u64,
    pub history: RingBuffer<String>,
    pub metrics: SystemMetrics,
}

impl ComputeEngine {
    pub fn new(workers: usize) -> Self {
        ComputeEngine {
            workers,
            task_count: 0,
            history: RingBuffer::new(50),
            metrics: SystemMetrics::new(),
        }
    }

    pub fn execute(&mut self, payload: &str) -> String {
        self.task_count += 1;
        let result = format!("Engine processed task #{} with payload: {}", self.task_count, payload);
        self.history.push(result.clone());
        self.metrics.record_success(12.4);
        result
    }

    pub fn status(&self) -> (usize, u64, f64) {
        (self.workers, self.task_count, self.metrics.success_rate())
    }
}
