#!/bin/bash

set -e

WORKING_DIR="$1"
cd $WORKING_DIR

echo "working in directory: $(pwd)"
# confirm to proceed
read -p "Are you sure you want to proceed? (y/n) " -n 1 -r
echo    # move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborting ❌"
    exit 1
fi

echo "🚀 Converting HEIC files to JPG"
heic_files=$(ls *.heic 2>/dev/null || true)
if [ -n "$heic_files" ]; then
    ls *.heic | while read heicfile; do
        newname="${heicfile%.heic}.jpg"
        echo "Converting $heicfile to $newname"
        [ -f "$newname" ] && { echo "File $newname already exists. Aborting ❌"; exit 1; }
        sips -s format jpeg "$heicfile" --out "$newname"
        rm "$heicfile"
    done
fi

echo "🚀 Renaming jpeg files to jpg"
jpeg_files=$(ls *.jpeg 2>/dev/null || true)
if [ -n "$jpeg_files" ]; then
    ls *.jpeg | while read jpegfile; do
        newname="${jpegfile%.jpeg}.jpg"
        echo "Renaming $jpegfile to $newname"
        [ -f "$newname" ] && { echo "File $newname already exists. Aborting ❌"; exit 1; }
        mv "$jpegfile" "$newname"
    done
fi

echo "🚀 Verifying file extensions"
unknown_files=$(ls * | grep -vE '\.(jpg|png|mp4)$' || true)
[ -n "$unknown_files" ] && { echo "Unknown files found:"; echo ${unknown_files}; echo "Aborting ❌"; exit 1; }

echo "🚀 Replacing strange characters from file names including spaces"
ls * | egrep '[^0-9a-zA-Z_\.]' | while read file; do
  newname=$(echo "$file" |  sed 's/[^0-9a-zA-Z_\.]/_/g')
  # Remove underscore character before the dot in the extension, example: IMG_1234_.jpg to IMG_1234.jpg
  newname=$(echo "$newname" | sed 's/_\./\./g')
  [ -f "$newname" ] && { echo "tried to rename $file, but another file exists with name: ${newname}"; echo "Aborting ❌"; exit 1; }
  echo "replacing strange characters, renaming $file to $newname"
  mv -i "$file" "$newname"
done

echo "🚀 Renaming files to match timestamp format"
ls * | egrep -v '[0-9]{8}_[0-9]{6}(_.*)?.(jpg|png|mp4)' | while read weird; do
  extension="${weird##*.}"
  shorthash=$(echo $weird | sha256sum | cut -c1-5)
  newname="$(stat -f "%Sm" -t "%Y%m%d_%H%M%S" "$weird")"_${shorthash}."${extension}"
  [ -f "$newname" ] && { echo "tried to rename $weird, but another file exists with name: ${newname}"; echo "Aborting ❌"; exit 1; }
  echo "adding date-time, renaming $weird to $newname"
  mv -i "$weird" "$newname"
done
