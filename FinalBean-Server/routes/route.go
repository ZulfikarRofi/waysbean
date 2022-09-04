package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	AuthRoutes(r)
	ProfileRoutes(r)
	ProductRoutes(r)
	CartRoute(r)
	TransactionRoutes(r)
}
