mod engine;
use engine::ComputeEngine;

fn main() {
    let mut engine = ComputeEngine::new(4);
    let output = engine.execute("initialize_system");
    println!("{}", output);

    let (workers, tasks) = engine.status();
    println!("Status -> Workers: {}, Tasks Completed: {}", workers, tasks);
}

