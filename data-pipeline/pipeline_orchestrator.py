import os
import sys
import json
from typing import Dict, Any

SHARED_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'shared-services'))
if SHARED_DIR not in sys.path:
    sys.path.insert(0, SHARED_DIR)

from config_manager import default_config_manager
from script_runner import run_pipeline_step
from processor import DataProcessor

class PipelineOrchestrator:
    def __init__(self):
        self.processor = DataProcessor()
        self.environment = default_config_manager.get("environment", "development")

    def run_full_cycle(self) -> Dict[str, Any]:
        print(f"Starting pipeline cycle under environment: {self.environment}")
        run_pipeline_step("Preflight", "echo 'Preflight check completed'")

        raw_events = [
            {"id": 101, "name": " telemetry_ingest ", "val": 45.2, "valid": True},
            {"id": 102, "name": " faulty_reading ", "val": -999.0, "valid": False},
            {"id": 103, "name": " queue_monitor ", "val": 18.5, "valid": True},
            {"id": 104, "name": " engine_ping ", "val": 22.1, "valid": True},
        ]

        batch_result = self.processor.execute_with_audit("TelemetryBatch", raw_events)
        run_pipeline_step("PostProcess", "echo 'Pipeline cycle finished successfully'")

        return {
            "status": "COMPLETED",
            "environment": self.environment,
            "metrics": batch_result["statistics"],
            "processed": batch_result["processed_count"],
        }

if __name__ == "__main__":
    orchestrator = PipelineOrchestrator()
    summary = orchestrator.run_full_cycle()
    print("Orchestration Summary:", json.dumps(summary, indent=2))

