from decimal import Decimal
from enum import Enum
from shutil import disk_usage

from cachetools import cached
from cachetools import TTLCache
from sanic.log import log


# see https://en.wikipedia.org/wiki/Template:Quantities_of_bytes
class Unit(Enum):
    BYTE = 1
    KILOBYTE = 1000
    KIBIBYTE = 1024
    MEGABYTE = 1000 ** 2
    MEBIBYTE = 1024 ** 2
    GIGABYTE = 1000 ** 3
    GIBIBYTE = 1024 ** 3
    TERABYTE = 1000 ** 4
    TEBIBYTE = 1024 ** 4


def convert(usage, unit):
    divider = unit.value
    return {
        'total': Decimal("%.2f" % (float(usage.total) / divider)),
        'used': Decimal("%.2f" % (float(usage.used) / divider)),
        'free': Decimal("%.2f" % (float(usage.free) / divider)),
    }


@cached(TTLCache(50, ttl=10))
def get_usage(path, unit=Unit.BYTE):
    log.debug("getting usage for '{}' in {}".format(path, unit.name))
    usage = disk_usage(path)
    return convert(usage, unit)
