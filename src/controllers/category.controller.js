import {pool} from '../db.js'

/**
 * Recovers the categories from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getCategories = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM category')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the categories'
        })
    }
}

/**
 * Recovers a specific category from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getCategory = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM category WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the category'
        })
    }
}

/**
 * Creates a new category entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createCategory = async (req, res) => {
    try {
        const {category_name, image, image_url} = req.body

        const [rows] = await pool.query(
            'INSERT INTO category (category_name, image, image_url) VALUES (?, ?, ?)', 
            [category_name, image, image_url])

        res.send({
            id: rows.insertId,
            category_name,
            image,
            image_url
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the category'
        })
    }
}

/**
 * Deletes a specific entry from the category table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteCategory = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM category WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Category not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot delete the category because it is used by a product'
        })
    }
}   

/**
 * Updates an existing category entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateCategory = async (req, res) => {
    try {
        const {id} = req.params
        const {category_name, image, image_url} = req.body
        const [result] = await pool.query('UPDATE category SET category_name = IFNULL(?, category_name), image = IFNULL(?, image), image_url = IFNULL(?, image_url) WHERE id = ?',
        [category_name, image, image_url, id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Category not found'
        })
        const [rows] = await pool.query('SELECT * FROM category WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the category'
        })
    }
}