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

# image thumbnails year:
pi@raspberrypi:/media/wd500GB/memories/tidy $ for f in $(ls 2021*/*.jpg); do echo $f; ~/thumbnails 240 $f $(dirname $f)/thumbnails/$(basename $f); done

# video thumbnails year:
ow=240
oh=240
for f in $(ls 2021*/*.mp4) $(ls 2021*/*.3gp); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  out=$(dirname $f)/thumbnails/$tn
  echo $f ' -> ' $out
  ffmpeg -ss 00:00:01.000 -i $f -vframes 1 -vf "scale=max($ow\,a*$oh):max($oh\,$ow/a),crop=$ow:$oh" $out
done

# check thumbnails:
pi@raspberrypi:/media/wd500GB/memories/tidy $ for i in $(seq -f "%02g" 1 12); do echo -n $i " "; echo -n $(ls 2021$i/*.*|grep -v dir_index.json | wc -l) " "; echo  $(ls 2021$i/thumbnails/*.jpg|wc -l); done
01  94  94
02  233  233
03  217  217
04  152  152
05  217  217
06  293  293
07  241  241
08  266  266
09  203  203
10  152  152
11  129  129
12  324  324

pi@raspberrypi:/media/wd500GB/memories/tidy $ for i in $(seq -f "%02g" 1 12); do ~/create_dir_index.rb 2021$i > 2021$i/dir_index.json; done

# check unknown datetime patterns:
grep 'unknown filename pattern' 2021*/dir_index.json
# if they look OK, remove warnings:
for f in $(grep 'unknown filename pattern' 2021*/dir_index.json -l); do
  grep -v 'unknown filename pattern' $f > $f.tmp
  mv $f.tmp $f
done

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