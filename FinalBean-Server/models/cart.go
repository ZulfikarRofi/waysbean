package models

import "time"

type Cart struct {
	ID            int                 `json:"id"`
	Qty           int                 `json:"qty"`
	Subtotal      int                 `json:"subtotal" gorm:"type:int"`
	ProductID     int                 `json:"product_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Product       ProductTransaction  `json:"product"`
	TransactionID int                 `json:"transaction_id"`
	Transaction   TransactionResponse `json:"transaction" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Status        string              `json:"status" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	CreatedAt     time.Time           `json:"-"`
	UpdatedAt     time.Time           `json:"-"`
}

type CartResponse struct {
	ID            int                `json:"id"`
	UserID        int                `json:"user_id"`
	Total         int                `json:"total"`
	TransactionID int                `json:"transaction_id"`
	ProductID     int                `json:"product_id"`
	Product       ProductTransaction `json:"product"`
	Qty           int                `json:"qty"`
	Subtotal      int                `json:"subtotal"`
}

func (CartResponse) TableName() string {
	return "carts"
}
