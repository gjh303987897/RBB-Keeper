package backend

import (
	"RBB-Keeper/backend/applogger"
	"RBB-Keeper/backend/database"
	"RBB-Keeper/backend/model"
	"RBB-Keeper/backend/utils"
	"time"
)

func CreateTask(cfgFront *model.TaskCfgFrontInterface) error {
	var cfg model.TaskConfig
	applogger.Logger.Info("CreateTask called with config: ", cfgFront)
	cfg.Status = model.TaskStatusPending
	cfg.CreateTime = time.Now().Unix()
	cfg.ID = utils.GetTaskID()
	cfg.Paths = make([]model.PathCfg, len(cfgFront.PathCfgs))
	copy(cfg.Paths, cfgFront.PathCfgs)
	cfg.FileAlgorithm = cfgFront.FileCfg.Method
	cfg.PhotoAlgorithm = cfgFront.PicCfg.Method
	if err := database.CreateTask(&cfg); err != nil {
		return err
	}

	return nil
}
