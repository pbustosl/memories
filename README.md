# memories

# Dev and deploy

## Dev
Create a Docker container
```
cd ~/git/memories/docker/dev
docker build -t memories-dev .
GIT_DIR=/Users/pablo/git
docker run --name memories-dev -d -p 3000:3000 \
  --mount type=bind,source=$GIT_DIR/memories/app,target=/app/memories \
  memories-dev
```
How to get a terminal ("ssh" the container):
```
docker exec -it memories-dev bash
```

How to delete the container:
```
docker stop memories-dev; docker rm memories-dev
```

Start the dev server in the container:
```
root@425b996fde28:/app/memories# ng serve --port 3000 --host 0.0.0.0
```

Write static files to dist/ (shared with laptop)
```
root@425b996fde28:/app/memories# ng build
```

## Deploy

Laptop:
```
[Jan-27 17:45][pablo:~/git/memories/app]$ scp -r dist/memories rb:www/
```

Server:
```
pi@raspberrypi:~/www/memories $ ln -s /media/wd500GB/memories/tidy files
pi@raspberrypi:~/www/memories $ cp /media/wd500GB/memories/tidy/albums.json assets/
pi@raspberrypi:~/www/memories $ ls -l
total 500
-rw-r--r-- 1 pi pi  15179 Jan 27 15:46 3rdpartylicenses.txt
drwxr-xr-x 2 pi pi   4096 Jan 26 09:15 assets
-rw-r--r-- 1 pi pi   4150 Jan 27 15:46 favicon.ico
lrwxrwxrwx 1 pi pi     28 Jan 25 16:25 files -> /media/wd500GB/memories/tidy
-rw-r--r-- 1 pi pi   7180 Jan 27 15:46 index.html
-rw-r--r-- 1 pi pi 356055 Jan 27 15:46 main.6f3efd04ae123090.js
-rw-r--r-- 1 pi pi  37064 Jan 27 15:46 polyfills.7a1c853e679c16b0.js
-rw-r--r-- 1 pi pi   1069 Jan 27 15:46 runtime.ffa194a0def003e5.js
-rw-r--r-- 1 pi pi  73657 Jan 27 15:46 styles.68b2a3d9e76ca2bd.css

pi@raspberrypi:~/www/memories $ python3 -m http.server 8000 > /dev/null 2>&1
# Ctrl-z + bg
```

# Memories provisioning
```
cd /media/wd500GB/memories/tidy
D=2020.08.08.simon.baptism
~/create_dir_index.rb $D > $D/dir_index.json
cd $D
mkdir thumbnails
for f in $(ls *.jpg); do echo $f; ~/thumbnails 240 $f thumbnails/$(basename $f); done

cd /media/wd500GB/memories/tidy

for d in $(ls|grep -v albums.json); do echo $d; ~/create_dir_index.rb $d > $d/dir_index.json; done

~/create_albums_index.rb > albums.json; cp albums.json ~/www/memories/assets/albums.json



# month:
pi@raspberrypi:~/www/memories/files/2015.06 $ for f in $(ls *.jpg); do echo $f; ~/thumbnails 240 $f thumbnails/$(basename $f); done
pi@raspberrypi:~/www/memories/files $ ~/create_dir_index.rb 2015.06 > 2015.06/dir_index.json
pi@raspberrypi:~/www $ vi albums.json

```

migration:
```

for m in $(seq -f "%02g" 1 12); do mv -i *2016$m* /media/wd500GB/memories/tidy/2016.$m/; done
for m in $(seq -f "%02g" 1 12); do mv -i *2017$m* /media/wd500GB/memories/tidy/2017.$m/; done
for m in $(seq -f "%02g" 1 12); do mv -i *2018$m* /media/wd500GB/memories/tidy/2018.$m/; done

for i in $(seq -f "%02g" 1 12); do mkdir -p 2016.$i/thumbnails;done

# image thumbnails year:
for d in $(ls -1|grep 2018); do mkdir $d/thumbnails; done
# check types of the year
find 2018* -type f | egrep -v 'jpg|mp4|dir_index.json'
for f in $(ls 2018*/*.jpg 2018*/*.png); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  echo $f "->" $tn;
  ~/thumbnails 240 $f $(dirname $f)/thumbnails/$tn
done

# video thumbnails year:
ow=240
oh=240
y=2018
for f in $(ls $y*/*.mp4) $(ls $y*/*.3gp) $(ls $y*/*.mov) $(ls $y*/*.ts); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  out=$(dirname $f)/thumbnails/$tn
  echo $f ' -> ' $out
  ffmpeg -ss 00:00:01.000 -i $f -vframes 1 -vf "scale=max($ow\,a*$oh):max($oh\,$ow/a),crop=$ow:$oh" $out
done


# check thumbnails:
y=2018
for d in $(ls |grep $y); do echo -n $d " "; echo -n $(ls $d/*.*|grep -v dir_index.json | wc -l) " "; echo $(ls $d/thumbnails/*.*|wc -l); done
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

# How I created the angular project
```
ng new memories
  ? Would you like to add Angular routing? No
  ? Which stylesheet format would you like to use? CSS
cd memories/
ng add @angular/material
  ? Choose a prebuilt theme: Indigo/Pink
  ? Set up global Angular Material typography styles? Yes
  ? Set up browser animations for Angular Material? Yes
ng generate component albums
ng generate service memories
...
```