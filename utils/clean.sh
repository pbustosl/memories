#!/bin/bash

set -e

WORKING_DIR="$1"
# remove trailing slash if any
WORKING_DIR="${WORKING_DIR%/}"
[ ! -d "$WORKING_DIR" ] && { echo "Provided path is not a directory: $WORKING_DIR"; exit 1; }

echo "working in directory: $WORKING_DIR"
# confirm to proceed
read -p "Are you sure you want to proceed? (y/n) " -n 1 -r
echo    # move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborting."
    exit 1
fi

echo "Converting HEIC files to JPG in directory: $WORKING_DIR"
heic_files=$(ls $WORKING_DIR/*.heic 2>/dev/null || true)
if [ -n "$heic_files" ]; then
    ls $WORKING_DIR/*.heic | while read filename; do
        newname="${filename%.heic}.jpg"
        echo "Converting $filename to $newname"
        [ -f "$newname" ] && { echo "File $newname already exists. Aborting conversion."; exit 1; }
        sips -s format jpeg "$filename" --out "$newname"
        rm "$filename"
    done
fi

echo "Verifying file extensions in directory: $WORKING_DIR"
unknown_files=$(ls $WORKING_DIR/* | grep -vE '\.(jpg|png|mp4)$' || true)
[ -n "$unknown_files" ] && { echo "Unknown files found: ${unknown_files}"; exit 1; }

echo "Removing parentheses from files in directory: $WORKING_DIR"
for file in $(ls $WORKING_DIR/* | egrep '\([0-9]+\).(jpg|png|mp4)'); do
  newname=$(echo $file |  sed 's/(\(0\))/_0/g')
  [ -f $newname ] && { "tried to rename $file, but another file exists with name: ${newname}"; exit 1; }
  echo "Renaming $file to $newname"
  mv -i $file $newname
done

echo "Renaming files to match timestamp format in directory: $WORKING_DIR"
for weird in $(ls $WORKING_DIR/* | egrep -v '[0-9]{8}_[0-9]{6}(_[0-9])?.(jpg|png|mp4)'); do
  extension="${weird##*.}"
  newname=$WORKING_DIR/$(stat -f "%Sm" -t "%Y%m%d_%H%M%S" $weird)"_0.${extension}"
  [ -f $newname ] && { "tried to rename $weird, but another file exists with name: ${newname}"; exit 1; }
  echo "Renaming $weird to $newname"
  mv -i $weird $newname
done
