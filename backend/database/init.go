package database

import (
	"RBB-Keeper/backend/applogger"
	"RBB-Keeper/backend/model"
	"log"
	"os"
	"path/filepath"

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var DB *gorm.DB

func init() {
	applogger.Logger.Info("Initializing database...")
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("failed to get working directory: ", err)
	}

	configDir := filepath.Join(wd, "config")

	if err := os.MkdirAll(configDir, 0755); err != nil {
		log.Fatalf("failed to create config directory: %v", err)
	}

	dbPath := filepath.Join(configDir, "app.db")
	dbExists := true
	if _, err := os.Stat(dbPath); os.IsNotExist(err) {
		applogger.Logger.Info("database file does not exist, will create new one at ", dbPath)
		dbExists = false
	}
	if dbExists {
		applogger.Logger.Info("database already existed")
	}

	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}

	DB = db

	if !dbExists {
		applogger.Logger.Info("database not found, initializing schema...")
		if err := DB.AutoMigrate(&model.FileEntry{}, &model.TaskConfig{}); err != nil {
			log.Fatalf("failed to migrate database: %v", err)
		}
	} else {
		applogger.Logger.Info("database exists, skip initialization")
	}
}
