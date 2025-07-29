let express = require('express');
let mongoose = require('mongoose');
const { enquiryRouter } = require('./App/routes/web/enquiryRoutes');
let cors = require('cors');
require('dotenv').config();
let app = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api/website/enquiry',enquiryRouter);

//connet to MongoDB
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
}).catch((err) => {console.error(err)});


