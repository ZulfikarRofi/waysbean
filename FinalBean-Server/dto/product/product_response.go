package productdto

type ProductResponse struct {
	ID          int    `json:"id"`
	Name        string `json:"name" form:"name" gorm:"type:varchar(255)" validate:"required"`
	Price       int    `json:"price" gorm:"type: int" form:"price" validate:"required"`
	Description string `json:"description" gorm:"type:varchar(255)" form:"description" validate:"required"`
	Stock       int    `json:"stock"`
	Image       string `json:"image" form:"image" gorm:"type:varchar(255)"`
}
