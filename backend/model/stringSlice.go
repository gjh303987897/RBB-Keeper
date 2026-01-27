package model

import (
	"RBB-Keeper/backend/applogger"
	"database/sql/driver"
	"encoding/json"
	"errors"
)

type StringSlice []PathCfg

type PathCfg struct {
	Path      string `json:"path"`
	Recursion bool   `json:"recursion"`
}

func (s StringSlice) Value() (driver.Value, error) {
	return json.Marshal(s)
}

func (s *StringSlice) Scan(value interface{}) error {
	if value == nil {
		*s = StringSlice{}
		return nil
	}

	bytes, ok := value.([]byte)
	if !ok {
		applogger.Logger.Error("failed to scan StringSlice: ", value)
		return errors.New("failed to scan StringSlice")
	}
	return json.Unmarshal(bytes, s)
}
