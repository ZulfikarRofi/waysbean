package models

import (
	"time"
)

type User struct {
	ID        int             `json:"id"`
	Name      string          `json:"name" gorm:"type:varchar(255)"`
	Email     string          `json:"Email" gorm:"type:varchar(16)"`
	Profile   ProfileResponse `json:"profile"`
	Password  string          `json:"Password" gorm:"type:varchar(255)"`
	Level     string          `json:"level" gorm:"type:varchar(255)"`
	CreatedAt time.Time       `json:"-"`
	UpdatedAt time.Time       `json:"-"`
}

type UserProfileResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}
