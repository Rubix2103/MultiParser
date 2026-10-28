pub struct ComputeEngine {
    pub workers: usize,
    pub task_count: u64,
}

impl ComputeEngine {
    pub fn new(workers: usize) -> Self {
        ComputeEngine {
            workers,
            task_count: 0,
        }
    }

    pub fn execute(&mut self, payload: &str) -> String {
        self.task_count += 1;
        format!("Engine processed task #{} with payload: {}", self.task_count, payload)
    }

    pub fn status(&self) -> (usize, u64) {
        (self.workers, self.task_count)
    }
}

