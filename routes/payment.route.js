const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe = stripe('pk_test_51LPiuwJrAgLp47RROP5cCV0FGec4QaTZMrsjcyECBJbuNdjZGhbhGgcUPu3u5lKoXBTUFH2JrOeFqMtrx2bUkx0800QZNcawhc');

router.post('/', async (req, res) => {
    let status, error;
    const { token, amount } = req.body;
    try {
      await Stripe.charges.create({
        source: token.id,
        amount,
        currency: 'usd',
      });
      status = 'success';
    } catch (error) {
      console.log(error);
      status = 'Failure';
    }
    res.json({ error, status });
  });

  module.exports = router;
