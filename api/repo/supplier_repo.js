const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '44.211.249.107',
  database: 'postgres',
  password: '123',
  port: 5432,
});

const getSupplier = (request, response) => {
  pool.query('select * from supplier;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getSupplierById =(request, response) => {
  const id = parseInt(request.params.id)
  pool.query('select * from supplier where id= $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createSupplier = (request, response) => {
  const { name, rate_count} = request.body
console.log([name]);
  pool.query('insert into supplier(name,rate_count) values($1,$2) returning id',[name,rate_count], (error, results) => {
    if (error) {
      throw error
    }
    const insertedId = results.rows[0].id;
    response.status(201).send(`Supplier added with ID: ${insertedId}`)
  })
};

const updateSupplierName = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    pool.query(
      'UPDATE supplier SET name = $1 WHERE id = $2 returning id',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Supplier modified with ID: ${id}`)
      }
    )
  };

  const updateSupplierRate = (request, response) => {
    const id = parseInt(request.params.id)
    const { rate_count } = request.body
  
    pool.query(
      'UPDATE supplier SET rate_count = $1 WHERE id = $2 returning id',
      [rate_count, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Supplier modified with ID: ${id}`)
      }
    )
  };
  
  const deleteSupplier = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM supplier WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Supplier deleted with ID: ${id}`)
    })
  }

module.exports = {
  getSupplier,
  getSupplierById,
  createSupplier,
  updateSupplierName,
  updateSupplierRate,
  deleteSupplier
}

