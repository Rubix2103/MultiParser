import subprocess
import sys
from typing import Tuple, List
from config_manager import default_config_manager

def run_command(cmd: str) -> Tuple[int, str]:
    """Execute a system command and return (exit_code, output)."""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.returncode, result.stdout.strip()
    except Exception as e:
        return 1, str(e)

def run_pipeline_step(step_name: str, cmd: str) -> bool:
    """Run a pipeline command with configuration checks."""
    app_name = default_config_manager.get("app_name", "App")
    print(f"[{app_name}] Running step '{step_name}': {cmd}")
    code, output = run_command(cmd)
    if code == 0:
        print(f"[{step_name}] Success: {output[:80]}")
        return True
    else:
        print(f"[{step_name}] Failed with code {code}: {output}")
        return False

def batch_execute(commands: List[str]) -> List[Tuple[str, int]]:
    results = []
    for cmd in commands:
        code, _ = run_command(cmd)
        results.append((cmd, code))
    return results

if __name__ == "__main__":
    code, out = run_command("echo Shared runner active")
    print(f"Exit: {code}, Output: {out}")
