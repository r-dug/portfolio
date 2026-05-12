#!/usr/bin/env python3
"""
Start a Cope w/ Claude session log.

Captures Claude Code terminal output by wrapping the process with `script`.
Run this INSTEAD of launching Claude Code directly:

    python3 start_log.py [episode_name]

What it does:
  1. Creates a timestamped log file in vlog/transcripts/
  2. Launches a `script` session that records all terminal I/O to that file
  3. Inside that session, starts Claude Code normally

When the vlog is done, type `exit` to stop recording.
"""

import sys
import os
import subprocess
import datetime
from pathlib import Path

TRANSCRIPTS = Path(__file__).parent / "transcripts"
TRANSCRIPTS.mkdir(exist_ok=True)


def main():
    episode = "_".join(sys.argv[1:]) if len(sys.argv) > 1 else "episode"
    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    log_path = TRANSCRIPTS / f"{episode}_{ts}.log"

    print(f"Recording to: {log_path}")
    print("Type 'exit' when the episode is done to stop recording.\n")

    # `script -q` suppresses the start/stop banners; -e passes through exit code
    os.execvp("script", ["script", "-q", "-e", str(log_path)])


if __name__ == "__main__":
    main()
