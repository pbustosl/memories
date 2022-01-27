# memories
```
root@425b996fde28:/app/memories# ng serve --port 3000 --host 0.0.0.0
root@425b996fde28:/app/memories# ng build


[Jan-26 09:19][pablo:~/git/memories/app]$ scp -r dist/memories rb:www/

# month:
pi@raspberrypi:~/www/memories/files/201506 $ for f in $(ls *.jpg); do echo $f; ~/thumbnails 240 $f thumbnails/$(basename $f); done
pi@raspberrypi:~/www/memories/files $ ~/create_dir_index.rb 201506 > 201506/dir_index.json
pi@raspberrypi:~/www $ vi albums.json

```

migration:
```
pi@raspberrypi:/media/wd500GB/memories/tidy $ for i in $(seq -f "%02g" 1 12); do mkdir -p 2021$i/thumbnails;done

# year:
pi@raspberrypi:/media/wd500GB/memories/tidy $ for f in $(ls 2021*/*.jpg); do echo $f; ~/thumbnails 240 $f $(dirname $f)/thumbnails/$(basename $f); done

# check thumbnails:
pi@raspberrypi:/media/wd500GB/memories/tidy $ for i in $(seq -f "%02g" 1 12); do echo -n $i " "; echo -n $(ls 2021$i/*.jpg|wc -l) " "; echo  $(ls 2021$i/thumbnails/*.jpg|wc -l); done
01  88  88
02  226  226
03  215  215
04  137  137
05  204  204
06  259  259
07  219  219
08  258  258
09  192  192
10  138  138
11  126  126
12  271  271

pi@raspberrypi:/media/wd500GB/memories/tidy $ for i in $(seq -f "%02g" 1 12); do ~/create_dir_index.rb 2021$i > 2021$i/dir_index.json; done

```

Video thumbnails
```
ow=240
oh=240
ffmpeg -ss 00:00:01.000 -i 202112/20211228_114757.mp4 -vframes 1 -vf "scale=max($ow\,a*$oh):max($oh\,$ow/a),crop=$ow:$oh" ~/20211228_114757.jpg
```

Types:
```
pi@raspberrypi:/media/wd500GB/memories $ find photos/ -type f -not -name "*.jpg" -not -name "*.JPG" -not -name "*.mp4" -not -name "*.MOV" -not -name "*.wmv" -not -name "Thumbs.db"  -not -name ".DS_Store"  -not -name "*.3gp"  -not -name "*.AVI"  -not -name "*.pdf"  -not -name "*.WAV"  -not -name "*.png"  -not -name "*.bmp"  -not -name "*.mov"  -not -name "*.jpeg"  -not -name "*.ppt"  -not -name "*.zip" -not -name "._.DS_Store" -not -name "*.mp3" -not -name "*.BMP"  -not -name "*.THM"  -not -name "*.3GP"  -not -name "*.ts"  -not -name "*.ini"

pi@raspberrypi:/media/wd500GB/memories $ for t in jpg JPG mp4 MOV wmv 3gp AVI WAV png bmp mov jpeg mp3 BMP 3GP ts; do
>  echo -n "$t "; (find photos/ -type f -name "*.$t" | wc -l)
> done
jpg 10183
JPG 13897
mp4 824
MOV 90
wmv 8
3gp 232
AVI 16
WAV 1
png 76
bmp 56
mov 36
jpeg 12
mp3 1
BMP 1
3GP 1
ts 2

```