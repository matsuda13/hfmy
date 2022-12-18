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
	http.HandleFunc("/get-schedule", server.GetSchedule)
	http.HandleFunc("/post-schedule", server.PostSchedule)
	http.HandleFunc("/delete-schedule", server.DeleteSchedule)
	log.Fatal(http.ListenAndServe(":8080", nil))
}