const express = require('express');
const app = express();
const port = 8000;

//tiktok
const { tiktokdl } = require('tiktokdl')


// Mengatur view engine dan direktori tampilan secara relatif
app.set("view engine", "ejs");
app.set("views", "public");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// path
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/download", (req, res) => {
  res.redirect("/");
});

//POST
app.post("/download", (req, res) => {
  let url = req.body.url

  async function tt(){
        const data = await tiktokdl(url)
        console.log(data)
	const info = str(data.title)
        res.render("download", {url : data, info : info})
  }

  tt()
})


// run server
app.listen(port, () => {
  console.log("Server is running on port", port);
});

function str(url){
const stringData = url;

// Membagi string berdasarkan kata-kunci dan menghapus "meowhandmade"
const parts = stringData.split(/Play Count: |Likes: |Shares: |Comments: /);

// Membuat objek dengan informasi yang terpisah
const dataObj = {
  PlayCount: parseInt(parts[1]),
  Likes: parseInt(parts[2]),
  Shares: parseInt(parts[3]),
  Comments: parseInt(parts[4])
};

return dataObj;

}
