import { Router } from "express"; 
import pool from "../db.js";     

const router = Router(); 

router.post("/", async (req, res) => {
    try {
        const { description, completed } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
            [description, completed || false]
        ) ;
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/", async (req, res) =>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { description, completed } =  req.body;
        const updateTodo = await pool.query (
            "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
            [description, completed || false, id]
        );
        res.json({
            message: "Todo was update",
            todo   :updateTodo.rows[0],
        });
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        res.json({
            message: "Todo Deleted sukses",
        });
    } catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;