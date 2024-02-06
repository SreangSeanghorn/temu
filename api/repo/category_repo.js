const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '44.211.249.107',
  database: 'postgres',
  password: '123',
  port: 5432,
});

const getCategory = (request, response) => {
  pool.query('select * from category;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getCategoryById =(request, response) => {
  const id = parseInt(request.params.id)
  pool.query('select * from category where id= $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createCategory = (request, response) => {
    console.log("the request is:"+request.body.name)
  const { name } = request.body
console.log(name);
  pool.query('insert into category(name) values($1) returning id',[name], (error, results) => {
    if (error) {
      throw error
    }
    const insertedId = results.rows[0].id;
    response.status(201).send(`Category added with ID: ${insertedId}`)
  })
};

const updateCategory = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    pool.query(
      'UPDATE category SET name = $1 WHERE id = $2',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Category modified with ID: ${id}`)
      }
    )
  }
  
  const deleteCategory = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM category WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Category deleted with ID: ${id}`)
    })
  }

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}

