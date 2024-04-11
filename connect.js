//Skript zum Erstellen einer SQLite-Datenbank und zum Einfügen von Testdaten mit sqlite3
const sqlite3 = require("sqlite3").verbose()

// Mit der Methode new sqlite3.Database() wird eine neue Datenbankverbindung erstellt.
const db = new sqlite3.Database(
	"./movie.db",
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			return console.error(err.message)
		}
		console.log("Connected to the SQlite database.")
	}
)

// Die Methode serialize() wird aufgerufen, um sicherzustellen, dass alle Datenbankvorgänge nach einander ausgeführt werden.
db.serialize(() => {
	// Erstellt eine Tabelle user, wenn sie noch nicht existiert und fügt Testdaten ein.
	db.run(
		`CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT,
        password_hash TEXT
    )`,
		(err) => {
			if (err) {
				return console.error(err.message)
			}
			console.log("Created user table.")

			db.run(`DELETE FROM user`, (err) => {
				if (err) {
					return console.error(err.message)
				}
				console.log("All rows deleted from user")

				const values1 = ["Loukmane", "loukmane.chaou@web.de", "123456"]
				const insertSql = `INSERT INTO user(username, email, password_hash) VALUES(?,?,?)`
				db.run(insertSql, values1, function (err) {
					if (err) {
						return console.error(err.message)
					}
					const id = this.lastID
					console.log(`Rows inserted, ID ${id}`)
				})
			})
		}
	)
	// Erstellt eine Tabelle movie, wenn sie noch nicht existiert und fügt Testdaten ein.
	db.run(
		`CREATE TABLE IF NOT EXISTS movie (
          movie_id INTEGER PRIMARY KEY,
          user_id INTEGER,
          title TEXT,
          description TEXT,
          release_year INTEGER,
          movie_length INTEGER,
          img TEXT,
          FOREIGN KEY (user_id) REFERENCES user(user_id)
        )`,
		(err) => {
			if (err) {
				return console.error(err.message)
			}
			console.log("Created movie table.")

			db.run(`DELETE FROM movie`, (err) => {
				if (err) {
					return console.error(err.message)
				}
				console.log("All rows deleted from movie")

				const values1 = [
					"1",
					"Spider-Man: Across the Spider-Verse",
					"Miles Morales navigiert durch sein neues Leben als Spider-Man und trifft auf andere Versionen von Spider-Man aus verschiedenen Dimensionen.",
					"2023",
					"140",
					"/posters/spiderverse_poster.jpg",
				]

				const insertSql = `INSERT INTO movie(user_id, title, description, release_year, movie_length, img) VALUES(?,?,?,?,?,?)`

				db.run(insertSql, values1, function (err) {
					if (err) {
						return console.error(err.message)
					}
					const id = this.lastID
					console.log(`Rows inserted, ID ${id}`)
				})
				// Schließt die Datenbankverbindung, wenn alle Vorgänge abgeschlossen sind.
				db.close((err) => {
					if (err) {
						return console.error(err.message)
					}
					console.log("Closed the database connection.")
				})
			})
		}
	)
})
