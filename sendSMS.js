const AfricasTalking = require('africastalking');

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: 'atsk_8b830a7c764a750dcffc93e6e6ab47c12cb74496cbd06d353370f9cad1cc90aa1a1c87a4', 
  username: 'sandbox'
});


module.exports = async function sendSMS(message) {
    
    // TODO: Send message
    try {
      const result=await africastalking.SMS.send({
        to: '+254795718890', 
        message: message,
        from: '27543'
      });
  console.log(result);
} catch(ex) {
  console.error(ex);
} 

};