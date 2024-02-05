const biker=async(mobile,certificate)=>{
    let mobile_num="91"+mobile
    const messageData = {
        "messaging_product": "whatsapp",
        "to": mobile_num,
        "type": "template",
        "template": {
            "name": "apprenticeship_organization",
            "language": {
                "code": "en_US"
            },
            "components": [
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "image",
                            "image": {
                                "link": certificate
                            }
                        }
                    ]
                },

                {
                    "type": "button",
                    "sub_type": "url",
                    "index": 1,
                    "parameters": [
                        {
                            "type": "text",
                            "text": "Visit Website"
                        }

                    ]
                }
            ]
        }
    }
    const headers = {
        Authorization: "Bearer EAAEwXBNVMRoBO8RBWBBb2hWvUAkZAIhwsljqPVvAAcYmH76ZAQZBatrE2xBwii0sALTZBXyh84uAQs4ZACTN04j8IdK5fWFAK3wrOZCDkZCZCy0ZAXzPPQNGYofdbQOK4ZAVBFJkpgmfVjOe2OhZBX9Ijvx3md01rqaRqnszWYFDb1ixuxm8GLBHM121G87nFgfrrWR", // Replace with your access token
        'Content-Type': 'application/json'
    };
    try {
        const response = await fetch('https://graph.facebook.com/v17.0/210009328855768/messages?', {
            method: 'POST',
            headers: headers,

            body: JSON.stringify(messageData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const responseData = await response.json();
        console.log('Message sent(responseData):', responseData);
        // console.log('Message_id :' + responseData.messages[0].id);

        let messageContent = ""
        if (type == 1) {
            messageContent=text;
        } else {
            messageContent=template;
        }
        //API for message sended
 

    } catch (error) {
        console.error('Error sending message:', error);
    }
}