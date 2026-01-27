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
		dbExists = false
	}

	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}

	DB = db

	if !dbExists {
		applogger.Logger.Info("database not found, initializing schema...")
		if err := DB.AutoMigrate(&model.FileEntry{}); err != nil {
			log.Fatalf("failed to migrate database: %v", err)
		}
	} else {
		applogger.Logger.Info("database exists, skip initialization")
	}
}
