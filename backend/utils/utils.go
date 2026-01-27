package utils

import (
	"math/rand"
	"time"
)

var rng = rand.New(rand.NewSource(time.Now().UnixNano()))

func RandUint64ByTime() uint64 {
	return rng.Uint64()
}
