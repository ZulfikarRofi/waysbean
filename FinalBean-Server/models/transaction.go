package models

import "time"

type Transaction struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	User      User      `json:"user"`
	Total     int       `json:"total" gorm:"type:varchar(255)"`
	Carts     []Cart    `json:"carts"`
	Status    string    `json:"status" gorm:"type:varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type TransactionResponse struct {
	ID     int `json:"id"`
	UserID int `json:"user_id"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
