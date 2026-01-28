package database

import (
	"RBB-Keeper/backend/applogger"
	"RBB-Keeper/backend/model"
)

func CreateTask(data *model.TaskConfig) error {
	applogger.Logger.Info("data of createTask ", data)
	result := DB.Create(data)
	if result.Error != nil {
		applogger.Logger.Error(result.Error)
		return result.Error
	}
	return nil
}
