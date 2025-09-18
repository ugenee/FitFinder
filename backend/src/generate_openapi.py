import argparse
import json

from main import app


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate OpenAPI schema for the application without running the app"
    )
    parser.add_argument(
        "filepath",
        type=str,
        help="json file path to save the OpenAPI schema",
    )
    args = parser.parse_args()

    openapi_schema = app.openapi()
    with open(args.filepath, "w") as file:
        json.dump(openapi_schema, file, indent=2)
    print(f"OpenAPI schema generated at {args.filepath}")
