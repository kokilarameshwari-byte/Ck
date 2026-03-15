
const express=require("express");
const sqlite3=require("sqlite3").verbose();
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

const db=new sqlite3.Database("./expenses.db");

db.serialize(()=>{
 db.run(`CREATE TABLE IF NOT EXISTS expenses(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  amount REAL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
 )`);
});

app.get("/api/expenses",(req,res)=>{
 db.all("SELECT * FROM expenses ORDER BY created_at DESC",(e,r)=>{
  if(e) return res.status(500).json(e);
  res.json(r);
 });
});

app.post("/api/expenses",(req,res)=>{
 const {title,amount,category}=req.body;
 db.run("INSERT INTO expenses(title,amount,category) VALUES(?,?,?)",
 [title,amount,category],
 function(err){
  if(err) return res.status(500).json(err);
  res.json({id:this.lastID});
 });
});

app.listen(5000,()=>console.log("Backend running http://localhost:5000"));
