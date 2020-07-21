package entities

type Book struct {
	IdBook   int64  //'db:"IdBook"'
	Isbn     string //'db:"Isbn"'
	Title    string //'db:"Title'
	Author   string //'db:"Author'
	Year     int64  //'db:"Year'
	Genre    string //'sdb:"Genre'
	Quantity int64  //'db:"Quantity'
	Status   bool   //'db:"Status'
}
