package providers

import (
	"database/sql"
	"fmt"
	"myapp/app/models/entities"
	"myapp/app/models/mappers"

	_ "github.com/lib/pq"
)

type UserProvider struct {
	db        *sql.DB
	users *mappers.UserMapper
	events   *mappers.EventMapper
	
}

func (p *UserProvider) InitDB() error {
	dbAdd := fmt.Sprintf("host=%s port=%s user=%s password='%s' dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", dbAdd)
	if err != nil {
		return fmt.Errorf("ошибка инита читателя: %v", err)
	}
	p.db = db
	err = p.db.Ping()
	if err != nil {
		return fmt.Errorf("пинг: %v", err)
	}
	p.users = new(mappers.UserMapper)
	err = p.users.Init(p.db)
	if err != nil {
		return fmt.Errorf("ошибка инита ситателя в мапере: %v", err)
	}
	return nil
}

func (p *UserProvider) List() ([]entities.User, error) {
	defer p.db.Close()
	return p.users.SelectAll()
}

func (p *UserProvider) Get(IdUser int64) (*entities.User, error) {
	defer p.db.Close()
	return p.users.Select(IdUser)
}

func (p *UserProvider) Delete(IdUser int64) error {
	defer p.db.Close()

	err := p.events.DeletedWhenDelUser(IdUser)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	err = p.users.Delete(IdUser)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}
	return nil

}

func (p *UserProvider) Change(UpdateUser entities.User) error {
	defer p.db.Close()
	err := p.users.Update(UpdateUser)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}

	return nil
}

func (p *UserProvider) Add(AddUser entities.User) error {
	defer p.db.Close()

	err := p.users.Add(AddUser)
	if err != nil {
		fmt.Printf("ERR: %s", err)
		return err
	}

	return nil
}
