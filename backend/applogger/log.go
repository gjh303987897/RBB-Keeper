package applogger

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	log "github.com/sirupsen/logrus"
)

var Logger *log.Logger

func InitLogger(logFile string, level log.Level) {
	Logger = log.New()

	file, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		Logger.Fatal(err)
	}
	Logger.SetOutput(io.MultiWriter(os.Stdout, file))

	Logger.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})

	Logger.SetLevel(level)
}

func init() {
	exePath, err := os.Executable()
	fmt.Print(exePath)
	if err != nil {
		log.Fatal(err)
	}
	exeDir := filepath.Dir(exePath)
	InitLogger(filepath.Join(exeDir, "app.log"), log.InfoLevel)
}
