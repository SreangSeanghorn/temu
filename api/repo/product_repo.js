const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '44.211.249.107',
  database: 'postgres',
  password: '123',
  port: 5432,
});

const getProducts = (request, response) => {
  pool.query('select p.*,c.name as cate,s.name as sup from  products p join public.category c on c.id = p.cate_id join public.supplier s on s.id = p.sup_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getProductsById =(request, response) => {
  const id = parseInt(request.params.id)
  pool.query('select p.*,c.name as cate,s.name as sup from products p join category c on c.id = p.cate_id join supplier s on s.id = p.sup_id where p.id= $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getProductsByCategoryId =(request, response) => {
  const id = parseInt(request.params.id)
  pool.query('select p.*,c.name as cate,s.name as sup from products p join category c on c.id = p.cate_id join supplier s on s.id = p.sup_id where c.id= $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createProduct = (request, response) => {
  const { name, des,image, price, dis_price, qty, rate_count, rate_num, buy_count, cate_id, sup_id } = request.body

  pool.query('insert into products(name, des, image, price, dis_price, qty, rate_count, rate_num, buy_count, cate_id, sup_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
  , [name, des,image, price, dis_price, qty, rate_count, rate_num, buy_count, cate_id, sup_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Product added with ID: ${results.insertId}`)
  })
}

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  getProductsByCategoryId,
}

