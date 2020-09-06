import * as express from 'express';
import { connectDB } from './src/config/db';
import { envVariable } from './src/config/configuration';
import { authRouter, productRouter, customerRouter, transactionRouter } from './src/routes/api';


const app = express()
// Connect DataBase
connectDB();
const PORT = envVariable.port

app.use(express.json());
app.get('/', (req, res) => res.send('API running'))

// Define Routes
app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/customer', customerRouter)
app.use('/api/transaction', transactionRouter)

app.listen(PORT, () => console.log('Server started on PORT:', PORT))
