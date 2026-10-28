import os
import sys
import json
from typing import List, Dict, Any

# Cross-folder dependency imports
SHARED_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'shared-services'))
if SHARED_DIR not in sys.path:
    sys.path.insert(0, SHARED_DIR)

from script_runner import run_pipeline_step
from config_manager import default_config_manager
from aggregator import compute_aggregates, detect_outliers
from transform_rules import normalize_metrics, enrich_with_summary

class DataProcessor:
    def __init__(self, batch_size: int = None):
        self.batch_size = batch_size or default_config_manager.get("batch_limit", 100)

    def clean_record(self, record: Dict[str, Any]) -> Dict[str, Any]:
        cleaned = {k: v.strip() if isinstance(v, str) else v for k, v in record.items()}
        return normalize_metrics(cleaned)

    def process_batch(self, records: List[Dict[str, Any]]) -> Dict[str, Any]:
        cleaned = [self.clean_record(r) for r in records[:self.batch_size]]
        valid_records = [r for r in cleaned if r.get("valid", True)]
        
        numeric_values = [r["val"] for r in valid_records if isinstance(r.get("val"), (int, float))]
        stats = compute_aggregates(numeric_values)
        outliers = detect_outliers(numeric_values)

        return {
            "processed_count": len(valid_records),
            "dropped_count": len(records) - len(valid_records),
            "statistics": stats,
            "outliers_found": len(outliers),
            "records": valid_records,
        }

    def execute_with_audit(self, step_name: str, records: List[Dict[str, Any]]) -> Dict[str, Any]:
        run_pipeline_step(step_name, f"echo 'Processing batch of {len(records)} records'")
        return self.process_batch(records)

if __name__ == "__main__":
    processor = DataProcessor()
    sample = [
        {"id": 1, "name": " sensor_1 ", "val": 12.4},
        {"id": 2, "name": "sensor_2", "valid": False, "val": 99.0},
        {"id": 3, "name": "sensor_3", "val": 105.2},
    ]
    res = processor.execute_with_audit("SampleStep", sample)
    print("Result summary:", json.dumps(res, indent=2))
