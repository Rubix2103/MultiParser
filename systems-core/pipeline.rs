use crate::buffer::RingBuffer;
use crate::engine::ComputeEngine;

pub struct CorePipeline {
    engine: ComputeEngine,
    queue: RingBuffer<String>,
}

impl CorePipeline {
    pub fn new(workers: usize) -> Self {
        CorePipeline {
            engine: ComputeEngine::new(workers),
            queue: RingBuffer::new(100),
        }
    }

    pub fn enqueue_task(&mut self, task: &str) {
        self.queue.push(task.to_string());
    }

    pub fn run_all(&mut self) -> Vec<String> {
        let tasks = self.queue.get_all();
        self.queue.clear();

        tasks
            .into_iter()
            .map(|task| self.engine.execute(&task))
            .collect()
    }

    pub fn engine_status(&self) -> (usize, u64, f64) {
        self.engine.status()
    }
}

