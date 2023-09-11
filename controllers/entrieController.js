const { getAllEntries, getAllEntriesByEmail, getById, postEntries, putEntries, deleteOne } = require('../models/entriesModel');



const cogerEntries = async (req, res) => {
      
    let data;
    try {
        const { email } = req.body;
        
        if (email) {
            data = await getAllEntriesByEmail(email);

        }  else {
            data = await getAllEntries();

        }

        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No está recogiendo la query'
        });

    }
};



const crearEntries = async (req, res) => {
    
    try {
        const { id_author, title, content, category } = req.body;

        if (!id_author || !title || !content || !category) {
            return res.status(400).json({
                ok: false,
                msg: "rellene todos los campos"
            });
        }

     const   data = await postEntries(title, content, id_author, category);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Entrada creada',
                data
            });
        } else {
            throw new Error('Error al crear la entrada');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No está creando la query'
        });
    }
};



const actualizarEntries = async (req, res) => {
   
    console.log(req.params.id_entry)
    try {
        const { id_entry } = req.params; 
        const { title, content } = req.body; 

        
        if (!title || !content) {
            return res.status(400).json({
                ok: false,
                msg: ' título  obligatorio',
            });
        }

        
        const originalData = await getById(id_entry);
        console.log(title, originalData.title)
        
        if (title === originalData.title && content === originalData.content) {
            return res.status(200).json({
                ok: true,
                msg: 'noticia actualizada.',
            });
        }
        
       
        data = await putEntries(title, content, id_entry);

        
        const updatedData = await getById(id_entry);

        res.status(200).json({
            ok: true,
            msg: 'Noticia actualizada ',
            data: updatedData, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'no pilla la query'
        });
    }
};


//DELETE OK
const borrarUna = async (req, res) => {
    try {
        let data ;
        const id_entry = req.params.id_entry; 
        if (isNaN(id_entry)) {
            return res.status(400).json({
                ok: false,
                msg: 'Id invalido.',
            });
        }

         data = await deleteOne(id_entry);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Entrada eliminada con éxito',
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'La entrada no existe',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }
};






module.exports = {
    cogerEntries,
    actualizarEntries,
    crearEntries,
    borrarUna
}