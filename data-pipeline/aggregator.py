from typing import List, Dict

def compute_aggregates(values: List[float]) -> Dict[str, float]:
    if not values:
        return {"count": 0, "sum": 0.0, "mean": 0.0}

    total = sum(values)
    count = len(values)
    return {
        "count": count,
        "sum": round(total, 2),
        "mean": round(total / count, 2),
    }

if __name__ == "__main__":
    test_data = [12.5, 45.0, 33.2, 89.1]
    print("Aggregates:", compute_aggregates(test_data))

