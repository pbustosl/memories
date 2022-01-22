// based on https://github.com/disintegration/imaging
package main

import (
	"github.com/disintegration/imaging"
	"os"
	"strconv"
)

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	maxX, err := strconv.ParseInt(os.Args[1], 10, 32); checkErr(err)
	img, err := imaging.Open(os.Args[2], imaging.AutoOrientation(true)); checkErr(err)
	img = imaging.Resize(img, int(maxX), 0, imaging.Linear)
	err = imaging.Save(img, os.Args[3]); checkErr(err)
}
