package routes

import (
	"_project_name_/handlers"
	"_project_name_/pkg/middleware"
	"_project_name_/pkg/mysql"
	"_project_name_/repositories"

	"github.com/gorilla/mux"
)

func CartRoute(r *mux.Router) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	r.HandleFunc("/carts", h.FindCart).Methods("GET")
	r.HandleFunc("/cart/{id}", h.GetCart).Methods("GET")
	r.HandleFunc("/cart", middleware.Auth(h.GetCart)).Methods("GET")
	r.HandleFunc("/cart/{id}", h.DeleteCart).Methods("DELETE")
	r.HandleFunc("/cart/{id}", middleware.Auth(h.UpdateCart)).Methods("PATCH")
}
