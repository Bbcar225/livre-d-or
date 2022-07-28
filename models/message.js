let db = require('../config/database')
let moment = require('../config/moment')

class Message
{
    constructor (row)
    {
        this.row = row
    }

    get id ()
    {
        return this.row.id
    }
    
    get content ()
    {
        return this.row.content
    }
    
    get created_at ()
    {
        return moment(this.row.created_at).fromNow()
    }
    
    static create(content, callback)
    {
        db.query('INSERT INTO messages SET content = ?', [content], (err, row) => {
            if (err) throw err
            
            callback(row)
        }) 
    }
    
    static all(callback)
    {
        db.query('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
            if (err) throw err
            
            callback(rows.map((row) => new Message(row)))
        })
    }

    static find (id, callback)
    {
        db.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err

            callback(new Message(rows[0]))
        })
    }
}

module.exports = Message