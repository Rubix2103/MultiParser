import subprocess
import sys
from typing import Tuple

def run_command(cmd: str) -> Tuple[int, str]:
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.returncode, result.stdout
    except Exception as e:
        return 1, str(e)

if __name__ == "__main__":
    code, out = run_command("echo Shared runner active")
    print(f"Exit: {code}, Output: {out.strip()}")

