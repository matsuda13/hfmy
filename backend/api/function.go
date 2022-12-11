package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	_ "github.com/lib/pq"
)

type Server struct {
	Db *sql.DB
}

type schedulePostRequest struct {
	Month string `json:"month"`
	Date string `json:"date"`
	Time string `json:"time"`
	DeparturePlace string `json:"departurePlace"`
	Destination string `json:"destination"`
	Capacity string `json:"capacity"`	
}

type Schedule struct {
	Month string `json:"month"`
	Date string `json:"date"`
	Time string `json:"time"`
	DeparturePlace string `json:"departurePlace"`
	Destination string `json:"destination"`
	Capacity string `json:"capacity"`	
}

type ScheduleGetResponse struct {
	Schedules []Schedule `json:"schedules"`
}

func (s *Server) PostSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var schedulePostRequest schedulePostRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&schedulePostRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToRegisterSchedule := fmt.Sprintf("INSERT INTO schedules (month, date, time, departure_place, destination, capacity) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')", schedulePostRequest.Month, schedulePostRequest.Date, schedulePostRequest.Time, schedulePostRequest.DeparturePlace, schedulePostRequest.Destination, schedulePostRequest.Capacity)
	_, queryError := s.Db.Exec(queryToRegisterSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) GetSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToFetchSchedules := fmt.Sprintf("SELECT month, date, time, departure_place, destination, capacity FROM schedules")
	rows, queryError := s.Db.Query(queryToFetchSchedules)
	if queryError != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var schedules []Schedule
	for rows.Next() {
		var scheduleTemp Schedule
		if err := rows.Scan(
				&scheduleTemp.Month,
				&scheduleTemp.Date,
				&scheduleTemp.Time,
				&scheduleTemp.DeparturePlace,
				&scheduleTemp.Destination,
				&scheduleTemp.Capacity,
			); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		scheduleTemp.Month = strings.TrimRight(scheduleTemp.Month, " ")
		scheduleTemp.Date = strings.TrimRight(scheduleTemp.Date, " ")
		scheduleTemp.Time = strings.TrimRight(scheduleTemp.Time, " ")
		scheduleTemp.DeparturePlace = strings.TrimRight(scheduleTemp.DeparturePlace, " ")
		scheduleTemp.Destination = strings.TrimRight(scheduleTemp.Destination, " ")
		scheduleTemp.Capacity = strings.TrimRight(scheduleTemp.Capacity, " ")
		schedules = append(schedules, scheduleTemp)
	}
	if err := rows.Err(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	response := ScheduleGetResponse{
		Schedules: schedules,
	}
	responseJson, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJson)
}