package model

type FileComputationType string

const (
	FileDisable FileComputationType = "disable"
	FileHybr    FileComputationType = "hybr"
	FileSize    FileComputationType = "size"
	FileBlake3  FileComputationType = "blake3"
)

type PicComputationType string

const (
	PicDisable PicComputationType = "disable"
	PicPhash   PicComputationType = "phash"
	PicVit     PicComputationType = "vit"
	PicResnet  PicComputationType = "resnet"
)

type TaskStatus uint8

const (
	TaskStatusPending TaskStatus = iota
	TaskStatusInProgress
	TaskStatusCompleted
	TaskStatusFailed
)

type FileCfg struct {
	Method FileComputationType `json:"method"`
}

type PicCfg struct {
	Method PicComputationType `json:"method"`
}

type TaskCfgFrontInterface struct {
	FileCfg  FileCfg   `json:"fileCfg"`
	PicCfg   PicCfg    `json:"picCfg"`
	PathCfgs []PathCfg `json:"pathCfgs"`
}

type TaskConfig struct {
	ID             string              `gorm:"primaryKey"`
	CreateTime   int64               `gorm:"not null"`
	FileAlgorithm  FileComputationType `gorm:"not null"`
	PhotoAlgorithm PicComputationType  `gorm:"not null"`
	Paths          StringSlice         `gorm:"type:json;not null"`
	Status         TaskStatus          `gorm:"not null"`
}

func (TaskConfig) TableName() string {
	return "taskConfigs"
}

type FileEntry struct {
	ID        uint   `gorm:"primaryKey"`
	Path      string `gorm:"not null;index"`     // 文件路径
	Size      int64  `gorm:"not null;index"`     // 文件大小
	Blake3    []byte `gorm:"type:BLOB"`          // BLAKE3 hash (32 bytes)
	Processed bool   `gorm:"not null;default:0"` // 是否已处理
}
