package mappers

import (
	"database/sql"
	"fmt"
	"myapp/app/models/entities"
)

type UserMapper struct {
	db *sql.DB
}

func (m *UserMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}

func (m *UserMapper) SelectAll() ([]entities.User, error) {
	var (
		dbIdUser   sql.NullInt64
		dbFullName sql.NullString
		dbEmail    sql.NullString
		dbPhone    sql.NullString
	)
	sqlReq :=
		``
	rows, err := m.db.Query(sqlReq)
	if err != nil {
		fmt.Println("ERR")
		return nil, err
	}
	users := make([]entities.User, 0)
	for rows.Next() {
		err = rows.Scan(
			&dbIdUser,
			&dbFullName,
			&dbEmail,
			&dbPhone)
		if err != nil {
			return nil, err
		}
		thisUser := entities.User{
			IdUser:   dbIdUser.Int64,
			FullName: dbFullName.String,
			Email:    dbEmail.String,
			Phone:    dbPhone.String,
		}
		users = append(users, thisUser)
	}
	return users, nil
}

func (m *UserMapper) Select(IdUser int64) (*entities.User, error) {
	var (
		dbIdUser   sql.NullInt64
		dbFullName sql.NullString
		dbEmail    sql.NullString
		dbPhone    sql.NullString
	)
	sqlReq :=
		``
	err := m.db.QueryRow(sqlReq, IdUser).Scan(
		&dbIdUser,
		&dbFullName,
		&dbEmail,
		&dbPhone)
	if err != nil {
		return nil, err
	}
	user := &entities.User{
		IdUser:   dbIdUser.Int64,
		FullName: dbFullName.String,
		Email:    dbEmail.String,
		Phone:    dbPhone.String,
	}
	return user, nil
}

func (m *UserMapper) Delete(IdUser int64) error {
	sqlReq := 
		``
	_, err := m.db.Exec(sqlReq, IdUser)
	if err != nil {
		fmt.Println("ERR")
		return err
	}
	return nil
}

func (m *UserMapper) Update(UpdeteUser entities.User) error {

	sqlReq :=
		``

	_, err := m.db.Exec(sqlReq, UpdeteUser.FullName, UpdeteUser.Email, UpdeteUser.Phone)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}

func (m *UserMapper) Add(AddUser entities.User) error {


	sqlReq :=
		``

	_, err := m.db.Exec(sqlReq, AddUser.FullName, AddUser.Email, AddUser.Phone)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
