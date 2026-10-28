import json
from typing import List, Dict, Any

class DataProcessor:
    def __init__(self, batch_size: int = 100):
        self.batch_size = batch_size

    def clean_record(self, record: Dict[str, Any]) -> Dict[str, Any]:
        return {k: v.strip() if isinstance(v, str) else v for k, v in record.items()}

    def process_batch(self, records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        cleaned = [self.clean_record(r) for r in records]
        return [r for r in cleaned if r.get("valid", True)]

if __name__ == "__main__":
    processor = DataProcessor()
    sample = [{"id": 1, "name": " sensor_1 "}, {"id": 2, "name": "sensor_2", "valid": False}]
    print("Processed:", processor.process_batch(sample))

