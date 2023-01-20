package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"hfmy/api"
)

const (
	host	 = "db"
	port	 = 5432
	user	 = "postgres"
	password = "postgres"
	dbname	 = "postgres"
)

func main() {
	postqreslInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", postqreslInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	server := api.Server{Db: db}
	http.HandleFunc("/sign-up", server.SignUp)
	http.HandleFunc("/sign-in", server.SignIn)
	http.HandleFunc("/sign-in-with-jwt", server.SignInWithJwt)

	http.HandleFunc("/get-driver-schedule", server.GetDriverSchedule)
	http.HandleFunc("/post-driver-schedule", server.PostDriverSchedule)
	http.HandleFunc("/delete-driver-schedule", server.DeleteDriverSchedule)

	http.HandleFunc("/get-passenger-schedule", server.GetPassengerSchedule)
	http.HandleFunc("/post-passenger-schedule", server.PostPassengerSchedule)
	http.HandleFunc("/delete-passenger-schedule", server.DeletePassengerSchedule)
	
	http.HandleFunc("/delete-expired-schedule", server.DeleteExpiredSchedule)
	log.Fatal(http.ListenAndServe(":8080", nil))
}