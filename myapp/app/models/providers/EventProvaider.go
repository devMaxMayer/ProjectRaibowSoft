package providers

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"myapp/app/models/entities"
	"myapp/app/models/mappers"
)

type EventProvider struct {
	db      *sql.DB
	events *mappers.EventMapper
	books *mappers.BookMapper
}


func (p *EventProvider) InitDB() error {
	//подключение к бд
	dbAdd := fmt.Sprintf("host=%s port=%s user=%s password='%s' dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", dbAdd)
	if err != nil {
		return fmt.Errorf("ошибка инита события: %v", err)
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
//список событий
func (p *EventProvider) List() ([]entities.Event, error) {
	defer p.db.Close()
	return p.events.SelectAll()
}
//добавить событие (выдать книгу)
//TODO: добавить изменение статуса при добавлении события
func (p *EventProvider) Add(AddEvent entities.Event) error {
	defer p.db.Close()

	err := p.events.Add(AddEvent)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}

	//err = p.books.ChangeStatus()
	//if err != nil {
	//	fmt.Printf("ERR: %s", err)
	//	return err
	//}

	return nil
}
//изменение события(сдача книги)
//TODO: добавить изменение статуса при изменении события
func (p *EventProvider) Chenge(ChengeEvent entities.Event) error {
	defer p.db.Close()

	err := p.events.Update(ChengeEvent)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil
}
