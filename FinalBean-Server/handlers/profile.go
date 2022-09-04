package handlers

import (
	profiledto "_project_name_/dto/profile"
	dto "_project_name_/dto/result"
	"_project_name_/models"
	"_project_name_/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) GetProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: profile}
	json.NewEncoder(w).Encode(response)
}

func convertProfileResponse(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:       u.ID,
		Fullname: u.Fullname,
		Image:    u.Image,
		Address:  u.Address,
		PostCode: u.Postcode,
		Phone:    u.Phone,
		UserID:   u.UserID,
	}
}
