"""Run the hosted Supabase schema files in order.

Usage:
  PGPASSWORD=<db password> python scripts/run_schemas.py <project db host>
  e.g. host is db.<project-ref>.supabase.co (port 5432, user postgres)
"""

import os
import pathlib
import sys

import psycopg

SCHEMAS = ["01_profiles.sql", "02_watchlist.sql", "03_histories.sql"]


def main():
    host = sys.argv[1]
    sql_dir = pathlib.Path(__file__).parent.parent / "supabase" / "schemas"

    with psycopg.connect(
        host=host,
        port=5432,
        dbname="postgres",
        user="postgres",
        password=os.environ["PGPASSWORD"],
        sslmode="require",
        connect_timeout=15,
    ) as conn:
        with conn.cursor() as cur:
            for name in SCHEMAS:
                cur.execute((sql_dir / name).read_text())
                print("OK", name)
            cur.execute(
                "select table_name from information_schema.tables "
                "where table_schema = 'public' order by 1"
            )
            for (table,) in cur.fetchall():
                print("tabla:", table)


if __name__ == "__main__":
    main()
