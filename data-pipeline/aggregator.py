import math
from typing import List, Dict, Any

def compute_aggregates(values: List[float]) -> Dict[str, float]:
    """Compute basic statistical aggregations over numeric values."""
    if not values:
        return {"count": 0, "sum": 0.0, "mean": 0.0, "min": 0.0, "max": 0.0, "std_dev": 0.0}

    total = sum(values)
    count = len(values)
    mean = total / count
    variance = sum((x - mean) ** 2 for x in values) / count if count > 1 else 0.0
    std_dev = math.sqrt(variance)

    return {
        "count": count,
        "sum": round(total, 2),
        "mean": round(mean, 2),
        "min": round(min(values), 2),
        "max": round(max(values), 2),
        "std_dev": round(std_dev, 2),
    }

def detect_outliers(values: List[float], threshold_z: float = 2.0) -> List[float]:
    """Identify outliers beyond threshold standard deviations from mean."""
    stats = compute_aggregates(values)
    if stats["std_dev"] == 0:
        return []
    mean = stats["mean"]
    std_dev = stats["std_dev"]
    return [x for x in values if abs(x - mean) / std_dev > threshold_z]

if __name__ == "__main__":
    test_data = [12.5, 45.0, 33.2, 89.1, 102.3, 11.2, 500.0]
    print("Aggregates:", compute_aggregates(test_data))
    print("Outliers:", detect_outliers(test_data))
