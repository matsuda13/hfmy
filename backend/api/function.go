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
	Memo string `json:"memo"`	
}

type scheduleDeleteRequest struct {
	Id string `json:"id"`
}

type Schedule struct {
	Id string `json:"id"`
	Month string `json:"month"`
	Date string `json:"date"`
	Time string `json:"time"`
	DeparturePlace string `json:"departurePlace"`
	Destination string `json:"destination"`
	Capacity string `json:"capacity"`	
	Memo string `json:"memo"`
}

type ScheduleGetResponse struct {
	Schedules []Schedule `json:"schedules"`
}

func (s *Server) DeleteSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var scheduleDeleteRequest scheduleDeleteRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&scheduleDeleteRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	log.Println(scheduleDeleteRequest)
	queryToRegisterSchedule := fmt.Sprintf("DELETE FROM schedules WHERE id=%s",scheduleDeleteRequest.Id)
	_, queryError := s.Db.Exec(queryToRegisterSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
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
	queryToRegisterSchedule := fmt.Sprintf("INSERT INTO schedules (month, date, time, departure_place, destination, capacity, memo) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')", schedulePostRequest.Month, schedulePostRequest.Date, schedulePostRequest.Time, schedulePostRequest.DeparturePlace, schedulePostRequest.Destination, schedulePostRequest.Capacity, schedulePostRequest.Memo)
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
	queryToFetchSchedules := fmt.Sprintf("SELECT id, month, date, time, departure_place, destination, capacity, memo FROM schedules")
	rows, queryError := s.Db.Query(queryToFetchSchedules)
	if queryError != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var schedules []Schedule
	for rows.Next() {
		var scheduleTemp Schedule
		if err := rows.Scan(
				&scheduleTemp.Id,
				&scheduleTemp.Month,
				&scheduleTemp.Date,
				&scheduleTemp.Time,
				&scheduleTemp.DeparturePlace,
				&scheduleTemp.Destination,
				&scheduleTemp.Capacity,
				&scheduleTemp.Memo,
			); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		scheduleTemp.Id = strings.TrimRight(scheduleTemp.Id, " ")
		scheduleTemp.Month = strings.TrimRight(scheduleTemp.Month, " ")
		scheduleTemp.Date = strings.TrimRight(scheduleTemp.Date, " ")
		scheduleTemp.Time = strings.TrimRight(scheduleTemp.Time, " ")
		scheduleTemp.DeparturePlace = strings.TrimRight(scheduleTemp.DeparturePlace, " ")
		scheduleTemp.Destination = strings.TrimRight(scheduleTemp.Destination, " ")
		scheduleTemp.Capacity = strings.TrimRight(scheduleTemp.Capacity, " ")
		scheduleTemp.Memo = strings.TrimRight(scheduleTemp.Memo, " ")
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