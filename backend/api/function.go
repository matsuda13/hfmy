package api

import (
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"time"
	"strings"
	"github.com/dgrijalva/jwt-go"
	_ "github.com/lib/pq"
)

type Server struct {
	Db *sql.DB
}

type SignUpRequest struct {
	Name					string `json:"name"`
	Gender					string `json:"gender"`
	Grade					string `json:"grade"`
	Password				string `json:"password"`
	PasswordConfirmination	string `json:"passwordConfirmination"`
}

type SignInRequest struct {
	Name		string `json:"name"`
	Password	string `json:"password"`
}

type DriverSchedulePostRequest struct {
	Date			string `json:"date"`
	Time			string `json:"time"`
	DeparturePlace	string `json:"departurePlace"`
	Destination		string `json:"destination"`
	Capacity		string `json:"capacity"`
	Memo			string `json:"memo"`
	UserName		string `json:"userName"`
	Gender			string `json:"gender"`
	Grade			string `json:"grade"` 
}

type DriverSchedule struct {
	Id				string `json:"id"`
	Date			string `json:"date"`
	Time			string `json:"time"`
	DeparturePlace	string `json:"departurePlace"`
	Destination		string `json:"destination"`
	Capacity		string `json:"capacity"`	
	Memo			string `json:"memo"`
	UserName		string `json:"userName"`
	Gender			string `json:"gender"`
	Grade			string `json:"grade"`
}

type DriverScheduleGetResponse struct {
	DriverSchedules []DriverSchedule `json:"driverSchedules"`
}

type DriverScheduleDeleteRequest struct {
	Id string `json:"id"`
}

type PassengerSchedulePostRequest struct {
	Date			string `json:"date"`
	Time			string `json:"time"`
	DeparturePlace	string `json:"departurePlace"`
	Destination		string `json:"destination"`
	Memo			string `json:"memo"`
	UserName		string `json:"userName"`
	Gender			string `json:"gender"`
	Grade			string `json:"grade"` 
}

type PassengerSchedule struct {
	Id				string `json:"id"`
	Date			string `json:"date"`
	Time			string `json:"time"`
	DeparturePlace	string `json:"departurePlace"`
	Destination		string `json:"destination"`	
	Memo			string `json:"memo"`
	UserName		string `json:"userName"`
	Gender			string `json:"gender"`
	Grade			string `json:"grade"`
}

type PassengerScheduleGetResponse struct {
	PassengerSchedules []PassengerSchedule `json:"passengerSchedules"`
}

type PassengerScheduleDeleteRequest struct {
	Id string `json:"id"`
}

type SignUpResponse struct {
	Name	string `json:"name"`
	Gender	string `json:"gender"`
	Grade	string `json:"grade"`
}

type SignInResponse struct {
	Name string `json:"name"`
}

type Claims struct {
	Name string
	jwt.StandardClaims
}

var charset62 = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

var jwtKey = []byte(RandomString(511))

func RandomString(length int) string {
    randomString := make([]rune, length)
    for i := range randomString {
        randomNumber, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset62))))
        if err != nil {
            log.Println(err)
            return ""
        }
        randomString[i] = charset62[int(randomNumber.Int64())]
    }
    return string(randomString)
}

func SetJwtInCookie(w http.ResponseWriter, userName string) {
    expirationTime := time.Now().Add(672 * time.Hour)
    claims := &Claims{
        Name: userName,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        return
    }
    cookie := &http.Cookie{
        Name:    "token",
        Value:   tokenString,
        Expires: expirationTime,
    }
    http.SetCookie(w, cookie)
}

func LoadClaimsFromJwt (w http.ResponseWriter, r *http.Request) (*Claims) {
    c, err := r.Cookie("token")
    if err != nil {
        if err == http.ErrNoCookie {
            w.WriteHeader(http.StatusUnauthorized)
            return &Claims{}
        }
        w.WriteHeader(http.StatusBadRequest)
        return &Claims{}
    }

    tknStr := c.Value
    claims := &Claims{}
    tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })
    if err != nil {
        if err == jwt.ErrSignatureInvalid {
            w.WriteHeader(http.StatusUnauthorized)
            return &Claims{}
        }
        w.WriteHeader(http.StatusBadRequest)
        return &Claims{}
    }
    if !tkn.Valid {
        w.WriteHeader(http.StatusUnauthorized)
        return &Claims{}
    }
    return claims
}


func (s *Server) SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var signUpRequest SignUpRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&signUpRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if signUpRequest.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if signUpRequest.Password != signUpRequest.PasswordConfirmination {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	passwordHash32Byte := sha256.Sum256([]byte(signUpRequest.Password))
	passwordHashURLSafe := base64.URLEncoding.EncodeToString(passwordHash32Byte[:])
	queryToReGisterUser := fmt.Sprintf("INSERT INTO users (name, gender, grade, password_hash) VALUES ('%s', '%s', '%s', '%s')", signUpRequest.Name, signUpRequest.Gender, signUpRequest.Grade, passwordHashURLSafe)
	_, queryError := s.Db.Exec(queryToReGisterUser)
	if queryError != nil {
		log.Println("[ERROR]", queryToReGisterUser)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	SetJwtInCookie(w, signUpRequest.Name)
	w.Header().Set("Content-Type", "application/json")
	response := SignUpResponse {
		Name: signUpRequest.Name,
		Gender: signUpRequest.Gender,
		Grade: signUpRequest.Grade,
	}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Fatalf("Error happend in JSON marshal. Err: %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	w.Write(jsonResponse)
}

func (s *Server) SignIn(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var signInRequest SignInRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&signInRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	passwordHash32Byte := sha256.Sum256([]byte(signInRequest.Password))
	passwordHashURLSafe := base64.URLEncoding.EncodeToString(passwordHash32Byte[:])
	query := fmt.Sprintf("SELECT password_hash FROM users WHERE name = '%s'", signInRequest.Name)
	var correctPasswordHashURLSafe string
	if queryError := s.Db.QueryRow(query).Scan(&correctPasswordHashURLSafe); queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	correctPasswordHashURLSafe = strings.TrimRight(correctPasswordHashURLSafe, " ")
	if passwordHashURLSafe != correctPasswordHashURLSafe {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	SetJwtInCookie(w, signInRequest.Name)
	w.Header().Set("Content-Type", "application/json")
	response := SignInResponse {
		Name: signInRequest.Name,
	}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResponse)
}

func (s *Server) SignInWithJwt(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    claims := LoadClaimsFromJwt(w, r)
    w.Header().Set("Content-Type", "application/json")
    response := SignInResponse{
        Name: claims.Name,
    }
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        log.Fatalf("Error happened in JSON marshal. Err: %s", err)
    }
    w.Write(jsonResponse)
}

func (s *Server) DeleteExpiredSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToDeleteExpiredSchedule := fmt.Sprintf("DELETE FROM driver_schedules WHERE cast(date as date) < CURRENT_DATE")
	_, queryError := s.Db.Exec(queryToDeleteExpiredSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) PostDriverSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var DriverSchedulePostRequest DriverSchedulePostRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&DriverSchedulePostRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToRegisterSchedule := fmt.Sprintf("INSERT INTO driver_schedules (date, time, departure_place, destination, capacity, memo, userName, gender, grade) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", DriverSchedulePostRequest.Date, DriverSchedulePostRequest.Time, DriverSchedulePostRequest.DeparturePlace, DriverSchedulePostRequest.Destination, DriverSchedulePostRequest.Capacity, DriverSchedulePostRequest.Memo, DriverSchedulePostRequest.UserName, DriverSchedulePostRequest.Gender, DriverSchedulePostRequest.Grade)
	_, queryError := s.Db.Exec(queryToRegisterSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) GetDriverSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToFetchSchedules := fmt.Sprintf("SELECT id, date, time, departure_place, destination, capacity, memo, userName, gender, grade FROM driver_schedules")
	rows, queryError := s.Db.Query(queryToFetchSchedules)
	if queryError != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var driverSchedules []DriverSchedule
	for rows.Next() {
		var driverScheduleTemp DriverSchedule
		if err := rows.Scan(
				&driverScheduleTemp.Id,
				&driverScheduleTemp.Date,
				&driverScheduleTemp.Time,
				&driverScheduleTemp.DeparturePlace,
				&driverScheduleTemp.Destination,
				&driverScheduleTemp.Capacity,
				&driverScheduleTemp.Memo,
				&driverScheduleTemp.UserName,
				&driverScheduleTemp.Gender,
				&driverScheduleTemp.Grade,
			); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		driverScheduleTemp.Id = strings.TrimRight(driverScheduleTemp.Id, " ")
		driverScheduleTemp.Date = strings.TrimRight(driverScheduleTemp.Date, " ")
		driverScheduleTemp.Time = strings.TrimRight(driverScheduleTemp.Time, " ")
		driverScheduleTemp.DeparturePlace = strings.TrimRight(driverScheduleTemp.DeparturePlace, " ")
		driverScheduleTemp.Destination = strings.TrimRight(driverScheduleTemp.Destination, " ")
		driverScheduleTemp.Capacity = strings.TrimRight(driverScheduleTemp.Capacity, " ")
		driverScheduleTemp.Memo = strings.TrimRight(driverScheduleTemp.Memo, " ")
		driverScheduleTemp.UserName = strings.TrimRight(driverScheduleTemp.UserName, " ")
		driverScheduleTemp.Gender = strings.TrimRight(driverScheduleTemp.Gender, " ")
		driverScheduleTemp.Grade = strings.TrimRight(driverScheduleTemp.Grade, " ")
		driverSchedules = append(driverSchedules, driverScheduleTemp)
	}
	if err := rows.Err(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	response := DriverScheduleGetResponse{
		DriverSchedules: driverSchedules,
	}
	responseJson, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJson)
}

func (s *Server) DeleteDriverSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var DriverScheduleDeleteRequest DriverScheduleDeleteRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&DriverScheduleDeleteRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToDeleteDriverSchedule := fmt.Sprintf("DELETE FROM driver_schedules WHERE id=%s", DriverScheduleDeleteRequest.Id)
	_, queryError := s.Db.Exec(queryToDeleteDriverSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) PostPassengerSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var PassengerSchedulePostRequest PassengerSchedulePostRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&PassengerSchedulePostRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToRegisterSchedule := fmt.Sprintf("INSERT INTO passenger_schedules (date, time, departure_place, destination, memo, userName, gender, grade) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", PassengerSchedulePostRequest.Date, PassengerSchedulePostRequest.Time, PassengerSchedulePostRequest.DeparturePlace, PassengerSchedulePostRequest.Destination, PassengerSchedulePostRequest.Memo, PassengerSchedulePostRequest.UserName, PassengerSchedulePostRequest.Gender, PassengerSchedulePostRequest.Grade)
	_, queryError := s.Db.Exec(queryToRegisterSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) GetPassengerSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToFetchSchedules := fmt.Sprintf("SELECT id, date, time, departure_place, destination, memo, userName, gender, grade FROM passenger_schedules")
	rows, queryError := s.Db.Query(queryToFetchSchedules)
	if queryError != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var passengerSchedules []PassengerSchedule
	for rows.Next() {
		var passengerScheduleTemp PassengerSchedule
		if err := rows.Scan(
				&passengerScheduleTemp.Id,
				&passengerScheduleTemp.Date,
				&passengerScheduleTemp.Time,
				&passengerScheduleTemp.DeparturePlace,
				&passengerScheduleTemp.Destination,
				&passengerScheduleTemp.Memo,
				&passengerScheduleTemp.UserName,
				&passengerScheduleTemp.Gender,
				&passengerScheduleTemp.Grade,
			); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		passengerScheduleTemp.Id = strings.TrimRight(passengerScheduleTemp.Id, " ")
		passengerScheduleTemp.Date = strings.TrimRight(passengerScheduleTemp.Date, " ")
		passengerScheduleTemp.Time = strings.TrimRight(passengerScheduleTemp.Time, " ")
		passengerScheduleTemp.DeparturePlace = strings.TrimRight(passengerScheduleTemp.DeparturePlace, " ")
		passengerScheduleTemp.Destination = strings.TrimRight(passengerScheduleTemp.Destination, " ")
		passengerScheduleTemp.Memo = strings.TrimRight(passengerScheduleTemp.Memo, " ")
		passengerScheduleTemp.UserName = strings.TrimRight(passengerScheduleTemp.UserName, " ")
		passengerScheduleTemp.Gender = strings.TrimRight(passengerScheduleTemp.Gender, " ")
		passengerScheduleTemp.Grade = strings.TrimRight(passengerScheduleTemp.Grade, " ")
		passengerSchedules = append(passengerSchedules, passengerScheduleTemp)
	}
	if err := rows.Err(); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	response := PassengerScheduleGetResponse{
		PassengerSchedules: passengerSchedules,
	}
	responseJson, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJson)
}

func (s *Server) DeletePassengerSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method!= http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var PassengerScheduleDeleteRequest PassengerScheduleDeleteRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&PassengerScheduleDeleteRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToDeletePassengerSchedule := fmt.Sprintf("DELETE FROM passenger_schedules WHERE id=%s", PassengerScheduleDeleteRequest.Id)
	_, queryError := s.Db.Exec(queryToDeletePassengerSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}