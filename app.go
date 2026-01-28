package main

import (
	"RBB-Keeper/backend"
	"RBB-Keeper/backend/applogger"
	"RBB-Keeper/backend/model"
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetUserConfig() (*backend.Config, error) {
	return backend.LoadConfig()
}

func (a *App) SaveUserConfig(cfg *backend.Config) error {
	if err := backend.SaveConfig(cfg); err != nil {
		return err
	}
	runtime.EventsEmit(a.ctx, "saveConfigSuccess")
	return nil
}

func (a *App) PickFold() (string, error) {
	i18nSupport := "Select Folder"
	if t, err := backend.LoadConfig(); err == nil && t != nil && t.Language == "zh" {
		i18nSupport = "选择文件夹"
	} else if err != nil {
		applogger.Logger.Error("LoadConfig error: ", err)
	} else if t == nil {
		applogger.Logger.Warn("LoadConfig returned nil config, but no error")
	}
	return runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: i18nSupport,
	})
}

func (a *App) TaskConfigToFrontInterface(cfg *model.TaskCfgFrontInterface) error {
	if err := backend.CreateTask(cfg); err != nil {
		return err
	}
	return nil
}
