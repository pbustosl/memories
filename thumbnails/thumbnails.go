// based on https://gist.github.com/logrusorgru/570d64fd6a051e0441014387b89286ca
package main

import (
	"image"
	"image/jpeg"
	"os"
	"strconv"
    "golang.org/x/image/draw"
)

func read(maxXY uint, path string) image.Image {
	f, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	img, _, err := image.Decode(f)
	if err != nil {
		panic(err)
	}
	rect := image.Rect(0, 0, img.Bounds().Max.X/2, img.Bounds().Max.Y/2)
	dst := image.NewRGBA(rect)
	draw.CatmullRom.Scale(dst, rect, img, img.Bounds(), draw.Over, nil)
	return dst
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
