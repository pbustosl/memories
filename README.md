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

### App files

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

```

### service

Laptop:
```
[Feb-16 14:03][pablo:~/git/memories]$ scp utils/memories.service rb:/etc/systemd/system/
[Feb-16 14:03][pablo:~/git/memories]$ scp utils/memories.sh rb:/usr/local/bin/
```

Server:
```
sudo systemctl daemon-reload
sudo systemctl enable memories.service
sudo systemctl start memories.service
sudo systemctl status memories.service
```

# Memories provisioning
```
cd /media/wd500GB/memories/migrating
mkdir thumbnails
# image thumbnails
for f in $(ls *.jpg *.png); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  echo $f "->" $tn;
  ~/thumbnails 240 $f ./thumbnails/$tn
done
# video thumbnails
ow=240
oh=240
for f in $(ls *.mp4 *.3gp *.mov); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  out=$(dirname $f)/thumbnails/$tn
  echo $f ' -> ' $out
  ffmpeg -ss 00:00:01.000 -i $f -vframes 1 -vf "scale=max($ow\,a*$oh):max($oh\,$ow/a),crop=$ow:$oh" $out
done

# check num of thumbnails:
ls|egrep -v 'thumbnails|dir_index.json'|wc -l
ls thumbnails|wc -l

export D=/media/wd500GB/memories/tidy

y=2022
for m in $(seq -f "%02g" 1 12); do mv -i *${y}${m}* $D/${y}.${m}/; done
for m in $(seq -f "%02g" 1 12); do mv -i thumbnails/*${y}${m}* $D/${y}.${m}/thumbnails/; done

cd $D
for y in {2021..2022}; do
  for d in $(ls|grep $y); do
    echo $d
    ~/create_dir_index.rb $d > $d/dir_index.json
  done
done

~/create_albums_index.rb > albums.json; cp albums.json ~/www/memories/assets/albums.json


```

migration:
```
for f in $(ls *.JPG); do mv -i $f $(echo "$f"|sed 's/JPG/jpg/'); done

# sudo apt install imagemagick
function date.images(){
  for f in $(ls *.jpg *.JPG *.png); do
    echo
    echo -n $f" "
    identify -format %[exif:DateTimeOriginal] $f
  done | stdbuf -o0 sed 's/://g' | awk -W interactive '{print "mv "$1" "$1"_"$2"_"$3}'
}

function date.video(){
  for f in $(ls *.MOV *.AVI *.3gp *.mp4 *.mov); do
    echo -n "mv $f ${f}_"
    ffprobe $f 2>&1|grep creation_time -m1|awk '{print $3}' | awk -F. '{print $1}' | stdbuf -o0 sed 's/[-:]//g' | stdbuf -o0 sed 's/T/_/g'
  done
}

for i in $(seq -f "%02g" 1 12); do mkdir -p 2022.$i/thumbnails;done

for m in $(seq -f "%02g" 1 12); do mv -i *2006$m* /media/wd500GB/memories/tidy/2006.$m/; done
for m in $(seq -f "%02g" 1 12); do mv -i *2007$m* /media/wd500GB/memories/tidy/2007.$m/; done
for m in $(seq -f "%02g" 1 12); do mv -i *2008$m* /media/wd500GB/memories/tidy/2008.$m/; done
for m in $(seq -f "%02g" 1 12); do mv -i *2009$m* /media/wd500GB/memories/tidy/2009.$m/; done
for m in $(seq -f "%02g" 1 12); do mv -i *2010$m* /media/wd500GB/memories/tidy/2010.$m/; done

# image thumbnails year:
for d in $(ls -1|grep 2002); do mkdir $d/thumbnails; done

# AVI -> mp4
SAVI=DSCN3623_20021227_140903.AVI; DMP4="${SAVI%.*}.mp4"; ffmpeg -i $SAVI -pix_fmt yuv420p $DMP4

# check types of the year
find * -type f | egrep -v 'jpg|png|bmp|mp4|3gp|mov|dir_index.json|albums.json'

for f in $(ls 19*/*.jpg 19*/*.png 19*/*.bmp); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  echo $f "->" $tn;
  ~/thumbnails 240 $f $(dirname $f)/thumbnails/$tn
done

# video thumbnails year:
ow=240
oh=240
y=2002
for f in $(ls $y*/*.mp4 $y*/*.3gp $y*/*.mov); do
  tn=$(basename $f)
  tn="${tn%.*}.jpg"
  out=$(dirname $f)/thumbnails/$tn
  echo $f ' -> ' $out
  ffmpeg -ss 00:00:01.000 -i $f -vframes 1 -vf "scale=max($ow\,a*$oh):max($oh\,$ow/a),crop=$ow:$oh" $out
done


# check thumbnails:
for d in $(ls|grep -v albums.json); do echo -n $d " "; echo -n $(ls $d/*.*|grep -v dir_index.json | wc -l) " "; echo $(ls $d/thumbnails/*.*|wc -l); done | awk 'd=$2-$3; {print $0" diff:"d}'|grep -v diff:0


for y in {2002..2002}; do
  for d in $(ls|grep $y); do
    echo $d
    ~/create_dir_index.rb $d > $d/dir_index.json
  done
done

~/create_albums_index.rb > albums.json; cp albums.json ~/www/memories/assets/albums.json


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

FYI
```
root@425b996fde28:/# ng --version
Node.js version v17.3.1 detected.
Odd numbered Node.js versions will not enter LTS status and should not be used for production. For more information, please see https://nodejs.org/en/about/releases/.

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 13.1.3
Node: 17.3.1 (Unsupported)
Package Manager: npm 8.3.0
OS: linux x64

Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1301.3 (cli-only)
@angular-devkit/core         13.1.3 (cli-only)
@angular-devkit/schematics   13.1.3 (cli-only)
@schematics/angular          13.1.3 (cli-only)

Warning: The current version of Node (17.3.1) is not supported by Angular.
```
