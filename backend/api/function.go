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
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/lib/pq"
)

type Server struct {
	Db *sql.DB
}

type SignUpRequest struct {
	Name                   string `json:"name"`
	Gender                 string `json:"gender"`
	Grade                  string `json:"grade"`
	Password               string `json:"password"`
	PasswordConfirmination string `json:"passwordConfirmination"`
}

type SignInRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type CarpoolRequest struct {
	Id       string `json:"id"`
	UserName string `json:"userName:`
}

type scheduleDeleteRequest struct {
	Id string `json:"id"`
}

type schedulePostRequest struct {
	Date           string `json:"date"`
	Time           string `json:"time"`
	DeparturePlace string `json:"departurePlace"`
	Destination    string `json:"destination"`
	Capacity       string `json:"capacity"`
	Memo           string `json:"memo"`
	UserName       string `json:"userName"`
	Gender         string `json:"gender"`
	Grade          string `json:"grade"`
}

type Schedule struct {
	Id             string `json:"id"`
	Date           string `json:"date"`
	Time           string `json:"time"`
	DeparturePlace string `json:"departurePlace"`
	Destination    string `json:"destination"`
	Capacity       string `json:"capacity"`
	Memo           string `json:"memo"`
	UserName       string `json:"userName"`
	Gender         string `json:"gender"`
	Grade          string `json:"grade"`
	Candidates     string `json:"candidates"`
}

type SignUpResponse struct {
	Name   string `json:"name"`
	Gender string `json:"gender"`
	Grade  string `json:"grade"`
}

type SignInResponse struct {
	Name string `json:"name"`
}

type Claims struct {
	Name string
	jwt.StandardClaims
}

type ScheduleGetResponse struct {
	Schedules []Schedule `json:"schedules"`
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

func LoadClaimsFromJwt(w http.ResponseWriter, r *http.Request) *Claims {
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
	response := SignUpResponse{
		Name:   signUpRequest.Name,
		Gender: signUpRequest.Gender,
		Grade:  signUpRequest.Grade,
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
	response := SignInResponse{
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

func (s *Server) CancelCarpoolRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	Separator := "さん\n"
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var CarpoolRequest CarpoolRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&CarpoolRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var (
		candidates *string
		capacity   *string
	)
	queryToFetchCandidates := fmt.Sprintf("SELECT capacity, candidates FROM schedules where id=%s", CarpoolRequest.Id)
	err := s.Db.QueryRow(queryToFetchCandidates).Scan(&capacity, &candidates)
	if err != nil {
		log.Println("[ERROR]", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	candidates_list := strings.Split(*candidates, Separator)
	for index, name := range candidates_list {
		if name == CarpoolRequest.UserName {
			candidates_list = append(candidates_list[:index], candidates_list[index+1:]...)
		}
	}
	candidates_updated := strings.Join(candidates_list, Separator)
	queryToCarpoolRequest := fmt.Sprintf("UPDATE schedules SET candidates = '%s'  WHERE id=%s", candidates_updated, CarpoolRequest.Id)
	_, queryError := s.Db.Exec(queryToCarpoolRequest)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) SendCarpoolRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var CarpoolRequest CarpoolRequest
	decoder := json.NewDecoder(r.Body)
	decodeError := decoder.Decode(&CarpoolRequest)
	if decodeError != nil {
		log.Println("[ERROR]", decodeError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	Separator := "さん\n"
	var (
		candidates *string
		capacity   *string
	)
	queryToFetchCandidates := fmt.Sprintf("SELECT capacity, candidates FROM schedules where id=%s", CarpoolRequest.Id)
	err := s.Db.QueryRow(queryToFetchCandidates).Scan(&capacity, &candidates)
	if err != nil {
		log.Println("[ERROR]", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	candidates_list := strings.Split(*candidates, Separator)
	n_req := len(candidates_list)
	for _, name := range candidates_list {
		if name == CarpoolRequest.UserName {
			return
		}
	}
	cap, err := strconv.Atoi(*capacity)
	if err != nil {
		log.Println("[ERROR]", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if cap < n_req {
		return
	}
	queryToCarpoolRequest := fmt.Sprintf("UPDATE schedules SET candidates = COALESCE(candidates,'') || '%s%s'  WHERE id=%s", CarpoolRequest.UserName, Separator, CarpoolRequest.Id)
	_, queryError := s.Db.Exec(queryToCarpoolRequest)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) DeleteSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodPost {
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
	queryToDeleteSchedule := fmt.Sprintf("DELETE FROM schedules WHERE id=%s", scheduleDeleteRequest.Id)
	_, queryError := s.Db.Exec(queryToDeleteSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) DeleteExpiredSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	queryToDeleteExpiredSchedule := fmt.Sprintf("DELETE FROM schedules WHERE cast(date as date) < CURRENT_DATE")
	_, queryError := s.Db.Exec(queryToDeleteExpiredSchedule)
	if queryError != nil {
		log.Println("[ERROR]", queryError)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (s *Server) PostSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != http.MethodPost {
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
	queryToRegisterSchedule := fmt.Sprintf("INSERT INTO schedules (date, time, departure_place, destination, capacity, memo, userName, gender, grade, candidates) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '')", schedulePostRequest.Date, schedulePostRequest.Time, schedulePostRequest.DeparturePlace, schedulePostRequest.Destination, schedulePostRequest.Capacity, schedulePostRequest.Memo, schedulePostRequest.UserName, schedulePostRequest.Gender, schedulePostRequest.Grade)
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
	queryToFetchSchedules := fmt.Sprintf("SELECT id, date, time, departure_place, destination, capacity, memo, userName, gender, grade, candidates FROM schedules ORDER BY id ASC")
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
			&scheduleTemp.Date,
			&scheduleTemp.Time,
			&scheduleTemp.DeparturePlace,
			&scheduleTemp.Destination,
			&scheduleTemp.Capacity,
			&scheduleTemp.Memo,
			&scheduleTemp.UserName,
			&scheduleTemp.Gender,
			&scheduleTemp.Grade,
			&scheduleTemp.Candidates,
		); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		scheduleTemp.Id = strings.TrimRight(scheduleTemp.Id, " ")
		scheduleTemp.Date = strings.TrimRight(scheduleTemp.Date, " ")
		scheduleTemp.Time = strings.TrimRight(scheduleTemp.Time, " ")
		scheduleTemp.DeparturePlace = strings.TrimRight(scheduleTemp.DeparturePlace, " ")
		scheduleTemp.Destination = strings.TrimRight(scheduleTemp.Destination, " ")
		scheduleTemp.Capacity = strings.TrimRight(scheduleTemp.Capacity, " ")
		scheduleTemp.Memo = strings.TrimRight(scheduleTemp.Memo, " ")
		scheduleTemp.UserName = strings.TrimRight(scheduleTemp.UserName, " ")
		scheduleTemp.Gender = strings.TrimRight(scheduleTemp.Gender, " ")
		scheduleTemp.Grade = strings.TrimRight(scheduleTemp.Grade, " ")
		scheduleTemp.Candidates = strings.TrimRight(scheduleTemp.Candidates, " ")
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
