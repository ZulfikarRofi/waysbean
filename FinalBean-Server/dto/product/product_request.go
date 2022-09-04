package productdto

type ProductRequest struct {
	Name        string `json:"name" form:"name" gorm:"type:varchar(255)" validate:"required"`
	Price       int    `json:"price" gorm:"type: varchar(255)" form:"price" validate:"required"`
	Description string `json:"description" gorm:"type:varchar(255)" form:"description" validate:"required"`
	Image       string `json:"image" form:"image" gorm:"type:varchar(255)"`
	Stock       int    `json:"stock" form:"stock" gorm:"type:varchar(255)"`
}

type UpdateProduct struct {
	Name        string `json:"name" form:"name"`
	Price       int    `json:"price" form:"price"`
	Description string `json:"description"`
	Image       string `json:"image" form:"image"`
	Stock       int    `json:"stock" form:"stock"`
}
