package transactiondto

import "_project_name_/models"

type CreateTransaction struct {
	ID     int    `json:"id"`
	UserID int    `json:"user_id" form:"user_id"`
	Status string `json:"status" form:"status"`
}

type UpdateTransaction struct {
	UserID int    `json:"user_id"`
	Status string `json:"status" form:"status"`
	Total  int    `json:"total" form:"total"`
}

type TransactionResponse struct {
	UserID    int                   `json:"user_id"`
	ProductID int                   `json:"product_id"`
	Cart      []models.CartResponse `json:"order"`
	Product   models.Product        `json:"order"`
}
