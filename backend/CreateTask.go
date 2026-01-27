package backend

import (
	"RBB-Keeper/backend/applogger"
	"RBB-Keeper/backend/model"
	"RBB-Keeper/backend/utils"
)

func CreateTask(cfg model.TaskConfig) error {
	applogger.Logger.Info("CreateTask called with config: ", cfg)
	cfg.Status = model.TaskStatusPending
	cfg.ID = utils.RandUint64ByTime()

	return nil
}
