pub struct RingBuffer<T> {
    capacity: usize,
    items: Vec<T>,
}

impl<T: Clone> RingBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        RingBuffer {
            capacity,
            items: Vec::with_capacity(capacity),
        }
    }

    pub fn push(&mut self, item: T) {
        if self.items.len() >= self.capacity {
            self.items.remove(0);
        }
        self.items.push(item);
    }

    pub fn get_all(&self) -> Vec<T> {
        self.items.clone()
    }

    pub fn len(&self) -> usize {
        self.items.len()
    }

    pub fn is_empty(&self) -> bool {
        self.items.is_empty()
    }

    pub fn clear(&mut self) {
        self.items.clear();
    }
}

