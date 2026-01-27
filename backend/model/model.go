package model

type AlgorithmType uint8
const (
	AlgorithmBLAKE3 AlgorithmType = iota
	AlgorithmXXH3
	AlgorithmSize
	AlgorithmHybird // size -> BLAKE3
)

type TaskStatus uint8
const (
	TaskStatusPending TaskStatus = iota
	TaskStatusInProgress
	TaskStatusCompleted
	TaskStatusFailed
)

type TaskConfig struct {
	ID uint64 `gorm:"primaryKey"`
	Title string `gorm:"not null"`
	Algorithm AlgorithmType `gorm:"not null"`
	Paths StringSlice `gorm:"type:json;not null"`
	Status TaskStatus `gorm:"not null"`
}

type FileEntry struct {
	ID        uint   `gorm:"primaryKey"`
	Path      string `gorm:"not null;index"`     // 文件路径
	Size      int64  `gorm:"not null;index"`     // 文件大小
	Blake3    []byte `gorm:"type:BLOB"`          // BLAKE3 hash (32 bytes)
	Processed bool   `gorm:"not null;default:0"` // 是否已处理
}
