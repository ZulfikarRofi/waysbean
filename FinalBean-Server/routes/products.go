package routes

import (
	"_project_name_/handlers"
	"_project_name_/pkg/middleware"
	"_project_name_/pkg/mysql"
	"_project_name_/repositories"

	"github.com/gorilla/mux"
)

func ProductRoutes(r *mux.Router) {
	productRepository := repositories.RepositoryProduct(mysql.DB)
	h := handlers.HandlerProduct(productRepository)

	r.HandleFunc("/list-products", h.FindProducts).Methods("GET")
	r.HandleFunc("/product/{id}", middleware.Auth(h.GetProduct)).Methods("GET")
	r.HandleFunc("/product", middleware.UploadFile(h.CreateProduct)).Methods("POST")
	r.HandleFunc("/product/{id}", middleware.UploadFile(h.UpdateProduct)).Methods("PATCH")
	r.HandleFunc("/product/{id}", h.DeleteProduct).Methods("DELETE")
}
