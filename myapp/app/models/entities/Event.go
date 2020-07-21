package entities
// TODO: придумать как сшить даты psql и go
type Event struct {
	IdEvent   int64
	IdBook int64
	IdUser int64
	Name string
	Title string
	GiveOut string
	ExpectedDate string
	Return string

}
