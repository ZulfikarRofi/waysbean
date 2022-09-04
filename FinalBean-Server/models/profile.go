package models

import "time"

type Profile struct {
	ID        int                 `json:"id"`
	Image     string              `json:"image" gorm:"type:varchar(255)"`
	Fullname  string              `json:"fullname" gorm:"type:varchar(255)"`
	Phone     string              `json:"phone" gorm:"type:varchar(255)"`
	Address   string              `json:"address" gorm:"type:varchar(255)"`
	Postcode  int                 `json:"postcode" gorm:"type:varchar(255)"`
	UserID    int                 `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	User      UserProfileResponse `json:"user"`
	CreatedAt time.Time           `json:"-"`
	UpdatedAt time.Time           `json:"-"`
}

type ProfileResponse struct {
	Fullname string `json:"fullname"`
	Image    string `json:"image"`
	Address  string `json:"address"`
	Phone    string `json:"phone"`
	PostCode int    `json:"postcode"`
	UserID   int    `json:"-"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
