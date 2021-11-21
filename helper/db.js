const mongoose = require("mongoose");
const URI = "mongodb+srv://myBlog:Z1aGdtJAuZyA95SF@myblog.iguvv.mongodb.net/myBlog";



module.exports = async () => {
  try {
      await mongoose.connect(URI);

      const db = mongoose.connection

      db.on('error', console.error.bind(console, 'Console error'))
      db.once('open', function () {
          console.log('MongoDB success connected');
      })

  } catch (error) {
      console.log(error);
  }
}
