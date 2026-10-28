import os
import json
from typing import Dict, Any, Optional

DEFAULT_CONFIG: Dict[str, Any] = {
    "app_name": "MixRepoPolyglot",
    "version": "2.0.0",
    "environment": "development",
    "batch_limit": 500,
    "metrics_interval_sec": 10,
    "services": {
        "api_port": 8080,
        "engine_workers": 4,
        "logging_level": "INFO"
    }
}

class ConfigManager:
    def __init__(self, overrides: Optional[Dict[str, Any]] = None):
        self._config = DEFAULT_CONFIG.copy()
        if overrides:
            self._config.update(overrides)

    def get(self, key: str, default: Any = None) -> Any:
        return self._config.get(key, default)

    def set(self, key: str, value: Any) -> None:
        self._config[key] = value

    def to_json(self) -> str:
        return json.dumps(self._config, indent=2)

    def is_production(self) -> bool:
        return self._config.get("environment") == "production"

default_config_manager = ConfigManager()

