# thumbnails

```
# pi@raspberrypi:~/www $ cat /proc/cpuinfo |grep ARM -m1
# model name  : ARMv7 Processor rev 3 (v7l)

GOOS=linux GOARCH=arm GOARM=7 go build thumbnails.go
```

```
./thumbnails 120 x.jpg x.tn.jp
```