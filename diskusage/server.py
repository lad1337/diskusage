import decimal
from pathlib import Path
import json

from sanic import Sanic
from sanic import response

from diskusage import get_usage
from diskusage import Unit

app = Sanic(__name__)
app.static("/plugin.js", str(Path(__file__).parent / "assets/plugin.js"))


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)


@app.route("/<disk:path>", methods=["GET"])
async def usage(request, disk=""):
    path = "/" / Path(disk)

    headers = {"X-unit": app.unit.name.lower(), "X-path": path}
    u = get_usage(str(path), app.unit)
    return response.json(u, headers=headers, cls=DecimalEncoder)


def main():
    import argparse

    parser = argparse.ArgumentParser(description="HTTP sever to get disk usage in JSON")
    parser.add_argument("--port", dest="port", type=int, default=4040, help="port to run on")
    parser.add_argument(
        "--unit",
        dest="unit",
        choices=[u.name for u in Unit],
        default=Unit.BYTE.name,
        help="conversion unit",
    )
    args = parser.parse_args()

    app.unit = getattr(Unit, args.unit)
    app.run(host="0.0.0.0", port=args.port)
