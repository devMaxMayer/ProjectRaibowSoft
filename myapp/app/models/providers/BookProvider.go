package providers

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"myapp/app/models/entities"
	"myapp/app/models/mappers"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "1488"
	dbname   = "BookManager"
)

type BookProvider struct {
	db    *sql.DB
	books *mappers.BookMapper
	events *mappers.EventMapper
}


func (p *BookProvider) InitDB() error {
	//подключение к бд
	dbAdd := fmt.Sprintf("host=%s port=%s user=%s password='%s' dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", dbAdd)
	if err != nil {
		return fmt.Errorf("ошибка инита книги: %v", err)
	}
	p.db = db
	err = p.db.Ping()
	if err != nil {
		return fmt.Errorf("пинг : %v", err)
	}
	p.books = new(mappers.BookMapper)
	err = p.books.Init(p.db)
	if err != nil {
		return fmt.Errorf("ошибка инита в мапере книги: %v", err)
	}
	p.events = new(mappers.EventMapper)
	err = p.events.Init(p.db)
	if err != nil {
		return fmt.Errorf("ошибка инита в мапере события: %v", err)
	}
	return nil
}

//Список книг
func (p *BookProvider) List() ([]entities.Book, error) {
	defer p.db.Close()
	return p.books.SelectAll()
}

//одна книга
func (p *BookProvider) Get(IdBook int64) (*entities.Book, error) {
	defer p.db.Close()
	return p.books.Select(IdBook)
}

//удалить книгу
func (p *BookProvider) Delete(IdBook int64) error {
	defer p.db.Close()

	err := p.events.DeletedWhenDelBook(IdBook)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	err = p.books.Delete(IdBook)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}

//изменить книгу
func (p *BookProvider) Change(UpdateBook entities.Book) error {
	defer p.db.Close()

	err := p.books.Update(UpdateBook)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}

	return nil
}

//добавить книгу
func (p *BookProvider) Add(AddBook entities.Book) error {
	defer p.db.Close()

	err := p.books.Add(AddBook)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}

	return nil
}
