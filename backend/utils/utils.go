package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"time"
)

func GetTaskID() string {
	raw := fmt.Sprintf("%v%v", time.Now().UnixNano(), rand.Uint64())
	id := sha256.Sum256([]byte(raw))
	return hex.EncodeToString(id[:])
}