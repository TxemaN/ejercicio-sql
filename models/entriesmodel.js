const querieEntries = require('./queries.js')
const {pool} = require('../utils/connectPool')



const getAllEntries= async ()=> {
    let client , result;
    try {
        client = await pool.connect();
        const data = await client.query(querieEntries.byTodas);
        result = await data.rows
    } catch (error) {
        console.log(error);
        throw new Error('error')
    } finally {
        client.release()
    }
    return result;
  };

 

const getAllEntriesByEmail= async (email)=> {
    let client , result;
    try {
        client = await pool.connect();
        const data = await client.query(querieEntries.byEmail, [email]);
        result = await data.rows;
       
    } catch (error) {
        console.log(error);
        throw new Error('error')
    } finally {
        client.release()
    }
    
    return result;
  };


  const getById = async (id_entry) => {
    let client , result;
    try {
      client = await pool.connect();
      
      const data = await client.query(querieEntries.byId, [id_entry]);
  
      if (data.rows.length === 0) {
        throw new Error('Ese IID parece no existir');
      }
  
      result = await data.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error al buscar ID');
    } finally {
      client.release();
    }
    return result
  };



const postEntries = async (title, content, id_author, category) => {
  let client, result;
  try {
      client = await pool.connect();

      const insertQuery = 'INSERT INTO entries (title, content, id_author, category) VALUES ($1, $2, $3, $4) RETURNING *';
      const data = await client.query(insertQuery, [title, content, id_author, category]);

      result = data.rows[0]; 

  } catch (error) {
      console.error(error);
      throw new Error('Error al crear la entrada');
  } finally {
      client.release();
  }
  return result;
};




const putEntries = async (title, content, id_entry) => {

  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(querieEntries.byActualizar, [title, content, id_entry]);
    result = data.rows[0]; 
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar la entrada');
  } finally {
    client.release();
  }
  return result;
};




const deleteOne = async (id_entry) => {
  let client, result;
  try {
    client = await pool.connect();
    const selectQuery = 'SELECT id_entry FROM entries WHERE id_entry = $1';
    const selectResult = await client.query(selectQuery, [id_entry]);

    if (selectResult.rows.length === 0) {
     
      result = null; 
    }

    const deleteQuery = 'DELETE FROM entries WHERE id_entry = $1';
    const data = await client.query(deleteQuery, [id_entry]);
    result = data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar la entrada');
  } finally {
    client.release();
  }
  return result;
};


  

  //conectar base de dados


  module.exports = {
    getAllEntries,
    getAllEntriesByEmail,
    getById,
    postEntries,
    putEntries,
    deleteOne,
   
  }