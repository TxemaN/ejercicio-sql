const {Todas, Nombre, Email, Crear, Actualizar, Borrar} = require('../models/authorModel');





    const getAllAuthors = async (req, res) => {
      try {
        const { email, name } = req.body;
        let authors;
    
        if (email) {
          authors = await Email(email);
        } else if (name) {
          authors = await Nombre(name);
        } else {
          authors = await Todas();
        }
    
        if (authors.length === 0) {
          return res.status(404).json({
            ok: false,
            msg: "Nose han encontrado autores",
          });
        }
    
        return res.status(200).json({
          ok: true,
          authors,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          ok: false,
          msg: "Contactar con el admin",
        });
      }
    };

  const createAuthor = async (req, res) => {
    try {
      const { name, surname, email, image } = req.body;
      console.log(req.body)
      const author = await Crear(name, surname, email, image);
  
      res.status(201).json({
        ok: true,
        msg: 'Autor creado',
        data: await author,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "No es posible crear el autor"
      });
    }
  };

  const updateAuthorById = async (req, res) => {
    try {
      const { id_author } = req.params;
      const { name, surname, email, image } = req.body;
      const author = await Actualizar(id_author, name, surname, email, image);
  
      if (author) {
        res.status(200).json({
          ok: true,
          msg: "Autor actualizado",
          data: author,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "autor no existe",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Contacte con el administrador"
      });
    }
  };

  const deleteAuthorById = async (req, res) => {
    try {
      const { id_author } = req.params;
      await Borrar(id_author);
      res.status(200).json({
        ok: true,
        msg: "Autor eliminado",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Contacte con el administrador"
      });
    }
  };
  
  










  module.exports = {
    getAllAuthors,
    createAuthor,
    updateAuthorById,
    deleteAuthorById
    
    
}
  