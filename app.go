package main

import (
	"RBB-Keeper/backend"
	"RBB-Keeper/backend/applogger"
	"context"
	"fmt"

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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetUserConfig() (*backend.Config, error) {
	return backend.LoadConfig()
}

func (a *App) SaveUserConfig(cfg *backend.Config) error {
	return backend.SaveConfig(cfg)
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
