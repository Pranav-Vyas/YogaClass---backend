const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();

const completePayment = () => {
    console.log("Payment processing...");
    return new Promise((resolve, reject) => {
        resolve("Payment completed");
    })
}

router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, age, batch } = req.body;
  console.log(firstName, lastName, email, phone, age, batch);
  if (firstName && lastName && email && phone && age && batch) {
    const foundUser = await User.findOne({ email: email });
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var year = dateObj.getUTCFullYear();
    if (foundUser) {
      console.log('foundUser is ',foundUser);
      const {foundMonth, foundYear} = foundUser;
      if (foundMonth === month && foundYear === year) {
        return res.status(500).json({error: "Payment of this user has already been done"});
      }
      completePayment()
      .then(() => {
        foundUser.activeMonth = month;
        foundUser.activeYear = year;
        console.log('payment successful')
        return foundUser.save()
      })
      .then(() => {
        return res.status(200).json({message: 'Payment successful'})
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({error: "Something went wrong"})
      })
    } else {
      const data = {
        name: firstName + ' ' + lastName,
        email: email,
        phone: phone,
        age: age,
        batch: batch,
        activeMonth: month,
        activeYear: year
      };

      completePayment()
      .then(() => {
        return User.create(data)
      })
      .then(() => {
        return res.status(200).json({message: 'Payment successful'})
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({error: 'Something went wrong'})
      })
    }
  }
  else {
      return res.status(500).json({error: "please provide valid data"})
  }
});

module.exports = router;
