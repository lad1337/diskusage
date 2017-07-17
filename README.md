[![Build Status](https://travis-ci.org/lad1337/diskusage.svg?branch=master)](https://travis-ci.org/lad1337/diskusage)

# diskusage
small server that response with disk usage.


# Install
## python
	pip install git+https://github.com/lad1337/diskusage
## docker
	docker pull lad1337/diskusage

does anyone actually manually `pull` the image berore runnning it ?

# Run
## python
	diskusage-server
there are options that look like this (get this with `--help`/`-h`):

```
usage: diskusage-server [-h] [--port PORT]
                        [--unit {BYTE,KILOBYTE,KIBIBYTE,MEGABYTE,MEBIBYTE,GIGABYTE,GIBIBYTE,TERABYTE,TEBIBYTE}]

HTTP sever to get disk usage in JSON

optional arguments:
  -h, --help            show this help message and exit
  --port PORT           port to run on
  --unit {BYTE,KILOBYTE,KIBIBYTE,MEGABYTE,MEBIBYTE,GIGABYTE,GIBIBYTE,TERABYTE,TEBIBYTE}
                        conversion unit
```
ps `BYTE` is the default unit.

## Docker
	docker run --name diskusage lad1337/diskusage
BUT this is quite useless!
Run it with some mountpoints, and the port:

	docker run -d -p 4040:4040 -v /mnt/disk1:/disk1:ro -v /mnt/disk2:/disk2:ro -v /mnt/disk3:/disk3:ro -v /mnt/disk4:/disk4:ro -v /mnt/disk5:/disk5:ro -v /mnt/cache:/cache:ro --name diskusage lad1337/diskusage

# Use
gets diskusage for `/mnt/usb_stick`
	curl localhost:4040/mnt/usb_stick
can look like this

```json
{
    "free": 20021248.0,
    "total": 45047808.0,
    "used": 25026560.0
}
```
# FAQ
### But why ?
i needed my for the unRAID landing page.
### Can it do more ?
no, not really.
### Isn't it bad to request the stats every few seconds ?
honestly i have no idea, but the stats are cached for each drive for 10s.
### Can i cange the unit per reqest ?
nope, just get it in `BYTES` and calculate yourself.
### You said it's for a page, how did you integrate it?
glad you asked! do `curl localhost:4040/plugin.js` and you get a simple jQuery plugin.
on your page your want to add the script and then something like:

```javascript
$('#disks').diskusage({'endpoint': 'http://localhost:4040', 'disks': ['disk1', 'disk2', 'cache']})
```