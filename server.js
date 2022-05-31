const express = require('express');
const cors = require('cors');
const uuid = require("uuid").v4;
const stripe=require('stripe')('sk_test_51KwKKsSB8cSximfLPLyobt5joM25dOxjbIAlTnUDLkE3JlTe5Fdbx7y8I1o61yG066jXkDU0oXXyBkeULkkGAywL00CupvdFno');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to our Ecommerce Store');
})

app.post('/checkout',async(req, res)=>{
    let error;
    let status;
    try{
        const {cart, token}=req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const key = uuid();
        const charge = await stripe.charges.create({
            amount: cart.totalPrice*100,
            currency: 'inr',
            payment_intent: 'pm_card_in',
            customer: customer.id,
            receipt_email: token.email,
            description: 'products descriptions here',
            shipping:{
                name: token.card.name ,
                address:{
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
                },
            },
        },{key,})
        status="success";
    }
    catch(error){
        console.log(error);
        status="error"
    }
    res.json({ error, status });
})

app.listen(8080,()=>{
    console.log('your app is running on port no 8080');
})