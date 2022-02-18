#!/usr/bin/env bash

# location: /usr/local/bin/memories.sh

cd /home/pi/www/memories
python3 -m http.server 8000 > /dev/null 2>&1