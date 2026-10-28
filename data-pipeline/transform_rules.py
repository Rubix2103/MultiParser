from typing import Dict, Any, List
from aggregator import compute_aggregates

def normalize_metrics(record: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize numerical fields in a data record."""
    normalized = record.copy()
    for k, v in record.items():
        if isinstance(v, (int, float)):
            normalized[k] = round(float(v), 4)
    return normalized

def enrich_with_summary(records: List[Dict[str, Any]], target_key: str = "metric_val") -> Dict[str, Any]:
    """Compute aggregates of target key and attach summary to record batch."""
    values = [r[target_key] for r in records if isinstance(r.get(target_key), (int, float))]
    summary = compute_aggregates(values)
    return {
        "record_count": len(records),
        "target_key": target_key,
        "aggregates": summary,
    }

