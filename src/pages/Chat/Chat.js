const messageData = {
    messaging_product: "whatsapp",
    to: "919626974940", // Replace with the recipient's phone number in international format
    type: "text",
    text: {
      body: "Hello, gokul im from React app......."
    }
  };
// const messageData = {
//   messaging_product: "whatsapp",
//   to: "919626974940", // Replace with the recipient's phone number in international format
//   type: "template",
//   template: {
//     name: "colte_text3",
//     language: {
//       code: "en_US"
//     }
//   }
// };
  
  const headers = {
    Authorization: 'Bearer EAAEwXBNVMRoBO11oRZAcZBiZBajpeniVggSA3OPbPZClyL2NwRVl1n9BudFOEqNfwZAVJmdhQ8xrAFMZAbfkx4Rb3qgKFaFWslKfBsMSJiImUAnQVo4alSITLOYPb2aWNUS55VJSruaCFHvxZAdwgwaYb0ZB3TCUmxAtIuyoZCks006n0PM47v7padtZAkP1NIXLN6sDXPy5R4Wz0P0GUfs7kZD', // Replace with your access token
    'Content-Type': 'application/json'
  };
  
  fetch('https://graph.facebook.com/v17.0/201819313012948/messages?', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messageData)
  })
  .then(response => response.json())
  .then(data => console.log('Message sent:', data))
  .catch(error => console.error('Error sending message:', error));
  