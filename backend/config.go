package backend

import (
	"RBB-Keeper/backend/applogger"
	"encoding/json"
	"log"
	"os"
	"path/filepath"
)

type Config struct {
	Language string `json:"language"` // zh / en
	DarkMode bool   `json:"darkMode"` // true = dark, false = light
}

var configFilePath string

func init() {
	execDir, err := os.Getwd()
	if err != nil {
		execDir = "."
	}

	configDir := filepath.Join(execDir, "config")

	if err := os.MkdirAll(configDir, os.ModePerm); err != nil {
		log.Fatal(err)
	}

	configFilePath = filepath.Join(configDir, "user_config.json")
}

func LoadConfig() (*Config, error) {
	if _, err := os.Stat(configFilePath); os.IsNotExist(err) {
		applogger.Logger.Warn("user config not found on path: ",configFilePath)
		
		if _,err := os.Create(configFilePath);err != nil {
			applogger.Logger.Error("failed to create new config file:",err)
		}
		newConfig := Config{
			Language: "en",
			DarkMode: false,
		}
		if err := SaveConfig(&newConfig); err != nil {
			applogger.Logger.Error("failed to save new config file:",err)
		}
		return &newConfig, nil
	}

	data, err := os.ReadFile(configFilePath)
	if err != nil {
		return nil, err
	}

	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, err
	}
	applogger.Logger.Info("Config loaded: ", cfg)
	return &cfg, nil
}

func SaveConfig(cfg *Config) error {
	data, err := json.MarshalIndent(cfg, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(configFilePath, data, 0644)
}
