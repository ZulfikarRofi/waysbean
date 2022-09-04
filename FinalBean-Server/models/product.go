package models

import "time"

type Product struct {
	ID          int       `json:"id"`
	Name        string    `json:"name" gorm:"type:varchar(255)"`
	Description string    `json:"description" gorm:"type:varchar(255)"`
	Image       string    `json:"image" gorm:"type:varchar(255)"`
	Price       int       `json:"price" gorm:"type:varchar(255)"`
	Stock       int       `json:"stock" gorm:"type:varchar(255)"`
	CreatedAt   time.Time `json:"-"`
	UpdatedAt   time.Time `json:"-"`
}

type ProductTransaction struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Stock       int    `json:"stock"`
	Image       string `json:"image"`
}

func (ProductTransaction) TableName() string {
	return "products"
}
