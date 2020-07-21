package mappers

import (
	"database/sql"
	"fmt"
	"myapp/app/models/entities"
)

type BookMapper struct {
	//указатель на тип
	db *sql.DB
}

//Метод инициализации мапера
func (m *BookMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}

//Список всех книг
func (m *BookMapper) SelectAll() ([]entities.Book, error) {
	var (
		dbIdBook   sql.NullInt64
		dbIsbn     sql.NullString
		dbTitle    sql.NullString
		dbAuthor   sql.NullString
		dbYear     sql.NullInt64
		dbGenre    sql.NullString
		dbQuantity sql.NullInt64
		dbStatus   sql.NullBool
	)
	// TODO: запрос в бд.
	sqlReq :=
		``

	rows, err := m.db.Query(sqlReq)
	if err != nil {
		fmt.Println("ERR")
		return nil, err
	}
	books := make([]entities.Book, 0)
	for rows.Next() {
		err = rows.Scan(
			&dbIdBook,
			&dbIsbn,
			&dbTitle,
			&dbAuthor,
			&dbYear,
			&dbGenre,
			&dbQuantity,
			&dbStatus)

		if err != nil {
			return nil, err
		}

		thisBook := entities.Book{
			IdBook:   dbIdBook.Int64,
			Isbn:     dbIsbn.String,
			Title:    dbTitle.String,
			Author:   dbAuthor.String,
			Year:     dbYear.Int64,
			Genre:    dbGenre.String,
			Quantity: dbQuantity.Int64,
			Status:   dbStatus.Bool,
		}
		books = append(books, thisBook)
	}
	return books, nil
}
//Одна книга
func (m *BookMapper) Select(IdBook int64) (*entities.Book, error) {
	var (
		dbIdBook   sql.NullInt64
		dbIsbn     sql.NullString
		dbTitle    sql.NullString
		dbAuthor   sql.NullString
		dbYear     sql.NullInt64
		dbGenre    sql.NullString
		dbQuantity sql.NullInt64
		dbStatus   sql.NullBool
	)
	// TODO: запрос в бд.
	sqlReq :=
		``

	err := m.db.QueryRow(sqlReq, IdBook).Scan(
		&dbIdBook,
		&dbIsbn,
		&dbTitle,
		&dbAuthor,
		&dbYear,
		&dbGenre,
		&dbQuantity,
		&dbStatus)

	if err != nil {
		return nil, err
	}

	book := &entities.Book{
		IdBook:   dbIdBook.Int64,
		Isbn:     dbIsbn.String,
		Title:    dbTitle.String,
		Author:   dbAuthor.String,
		Year:     dbYear.Int64,
		Genre:    dbGenre.String,
		Quantity: dbQuantity.Int64,
		Status:   dbStatus.Bool,
	}
	return book, nil
}
//удалить книгу
func (m *BookMapper) Delete(bookId int64) error {

	sqlReq :=
		``
	_, err := m.db.Exec(sqlReq, bookId)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
//изменить книгу
func (m *BookMapper) Update(UpdateBook entities.Book) error {
	// TODO: запрос в бд.
	sqlReq :=
		``

	_, err := m.db.Exec(sqlReq, UpdateBook.Isbn, UpdateBook.Title, UpdateBook.Author, UpdateBook.Genre, UpdateBook.Quantity, UpdateBook.Status)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
//добавить книгу
func (m *BookMapper) Add(addBook entities.Book) error {

	// TODO: запрос в бд.
	sqlReq :=
		``

	_, err := m.db.Exec(sqlReq, addBook.Isbn, addBook.Title, addBook.Author, addBook.Genre, addBook.Quantity, addBook.Status)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
//изменить статус при выдаче и воврате
func (m *BookMapper) ChangeStatus(Change entities.Book) error {
	// TODO: запрос в бд.
	sqlReq :=
		``
	_, err := m.db.Exec(sqlReq, Change.Status)

	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}

	return nil
}
