package mappers

import (
	"database/sql"
	"fmt"
	"myapp/app/models/entities"
)

type EventMapper struct {
	db *sql.DB
}

func (m *EventMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}
//все события
func (m *EventMapper) SelectAll() ([]entities.Event, error) {
	var (
		dbIdEvent      sql.NullInt64
		dbIdBook       sql.NullInt64
		dbIdUser       sql.NullInt64
		dbName         sql.NullString
		dbTitle        sql.NullString
		dbGiveOut      sql.NullString
		dbExpectedDate sql.NullString
		dbReturn       sql.NullString
	)
	//TODO: добавить запрос
	sqlReq :=
		``

	rows, err := m.db.Query(sqlReq)
	if err != nil {
		fmt.Println("ERR")
		return nil, err
	}
	events := make([]entities.Event, 0)
	for rows.Next() {
		err = rows.Scan(
			&dbIdEvent,
			&dbIdBook,
			&dbIdUser,
			&dbName,
			&dbTitle,
			&dbGiveOut,
			&dbExpectedDate,
			&dbReturn)

		if err != nil {
			return nil, err
		}


		dateGive := dbGiveOut.String
		dateExp := dbExpectedDate.String
		dateRet := dbReturn.String

		dateGiveValid:= dateGive[:len(dateGive)-6]
		dateExpValid:= dateGive[:len(dateExp)-6]
		dateRetValid:= dateGive[:len(dateRet)-6]

		thisEvent := entities.Event{
			IdEvent: dbIdEvent.Int64,
			IdBook:  dbIdBook.Int64,
			IdUser:  dbIdUser.Int64,
			Name: dbName.String,
			Title:  dbTitle.String,
			GiveOut: dateGiveValid,
			ExpectedDate: dateExpValid,
			Return: dateRetValid,
		}
		events = append(events, thisEvent)
	}
	return events, nil
}
//удалить событие при удалении книги
func (m *EventMapper) DeletedWhenDelBook(IdBook int64) error {
	//TODO: удалить ивент где книга тоже удалена
	sqlReq :=
		``
	_, err := m.db.Exec(sqlReq, IdBook)
	if err != nil {
		fmt.Println("ERR")
		return err
	}
	return nil
}
//удалить событие при удалении юзера
func (m *EventMapper) DeletedWhenDelUser(IdUser int64) error {
	//TODO: удалить ивент где читатель тоже удален
	sqlReq :=
		``
	_, err := m.db.Exec(sqlReq, IdUser)
	if err != nil {
		fmt.Println("ERR")
		return err
	}
	return nil
}
//добавить событие
func (m *EventMapper) Add(AddEvent entities.Event) error {
	// TODO: запрос в бд.
	sqlReq :=
		``

	_, err := m.db.Exec(sqlReq,
		AddEvent.IdBook,
		AddEvent.IdUser,
		AddEvent.GiveOut,
		AddEvent.ExpectedDate)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
//изменить событие
func (m *EventMapper) Update(UpdateEvent entities.Event) error {
	// TODO: запрос в бд.
	sqlReq :=
		``

	_, err := m.db.Exec(sqlReq,
		UpdateEvent.Return,
		)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
