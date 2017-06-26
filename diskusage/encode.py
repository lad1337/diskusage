
try:
    from ujson import JSONEncoder
except:
    from json import JSONEncoder

from diskusage import DiskUsage


class Encoder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj, DiskUsage):
           return obj.__json__()
        return JSONEncoder.default(self, obj)
