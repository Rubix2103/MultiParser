mod buffer;
mod metrics;
mod engine;
mod pipeline;

use pipeline::CorePipeline;

fn main() {
    let mut pipeline = CorePipeline::new(4);

    pipeline.enqueue_task("init_data_structures");
    pipeline.enqueue_task("warm_up_cache");
    pipeline.enqueue_task("execute_batch_job");

    let results = pipeline.run_all();
    for res in &results {
        println!("{}", res);
    }

    let (workers, tasks, success_rate) = pipeline.engine_status();
    println!(
        "System Core Running -> Workers: {}, Tasks Completed: {}, Success Rate: {:.1}%",
        workers, tasks, success_rate
    );
}
