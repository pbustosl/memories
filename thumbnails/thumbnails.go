// https://gist.github.com/logrusorgru/570d64fd6a051e0441014387b89286ca
package main

import (
	"github.com/nfnt/resize"
	"image"
	"image/jpeg"
	"os"
    "strconv"
)

func read(maxXY uint, path string) image.Image {
    f, err := os.Open(path)
    if err != nil {
        panic(err)
    }
    defer f.Close()
    original_image, _, err := image.Decode(f)
    if err != nil {
        panic(err)
    }
    return resize.Resize(120, 240, original_image, resize.Lanczos3)
}

func write(img image.Image, path string) {
    f, err := os.Create(path)
    if err != nil {
        panic(err)
    }
    defer f.Close()

    err = jpeg.Encode(f, img, nil)
    if err != nil {
        panic(err)
    }
}

func main() {
    maxXY, err := strconv.ParseUint(os.Args[1], 10, 32)
    if err != nil {
        panic(err)
    }
    img := read(uint(maxXY), os.Args[2])
    write(img, os.Args[3])
}
