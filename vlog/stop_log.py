#!/usr/bin/env python3
"""
Finalize a Cope w/ Claude session log.

Run after typing `exit` in the script session, or call directly to annotate
the most recent log file with an end timestamp and word count.

    python3 stop_log.py [episode_log.log]

If no file is given, annotates the most recently modified .log in transcripts/.
"""

import sys
import datetime
from pathlib import Path

TRANSCRIPTS = Path(__file__).parent / "transcripts"


def annotate(log_path: Path) -> None:
    content = log_path.read_text(errors="replace")
    word_count = len(content.split())
    ended_at = datetime.datetime.now().isoformat()

    footer = (
        f"\n\n--- SESSION END ---\n"
        f"Ended:      {ended_at}\n"
        f"Words (approx): {word_count}\n"
        f"Log file:   {log_path.name}\n"
    )
    with log_path.open("a") as f:
        f.write(footer)

    print(f"Finalized: {log_path}")
    print(f"Words (approx): {word_count}")


def main():
    if len(sys.argv) > 1:
        log_path = Path(sys.argv[1])
        if not log_path.is_absolute():
            log_path = TRANSCRIPTS / log_path
    else:
        logs = sorted(TRANSCRIPTS.glob("*.log"), key=lambda p: p.stat().st_mtime)
        if not logs:
            print("No log files found in", TRANSCRIPTS)
            return
        log_path = logs[-1]
        print(f"No file specified — using most recent: {log_path.name}")

    annotate(log_path)


if __name__ == "__main__":
    main()
