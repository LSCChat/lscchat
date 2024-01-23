import React, { useState } from 'react'
import { createContext } from 'react'

export const createToken = createContext();

function Token() {
    const [token, setToken] = useState();
    setToken("Bearer EAAEwXBNVMRoBO8RBWBBb2hWvUAkZAIhwsljqPVvAAcYmH76ZAQZBatrE2xBwii0sALTZBXyh84uAQs4ZACTN04j8IdK5fWFAK3wrOZCDkZCZCy0ZAXzPPQNGYofdbQOK4ZAVBFJkpgmfVjOe2OhZBX9Ijvx3md01rqaRqnszWYFDb1ixuxm8GLBHM121G87nFgfrrWR")
  return (
    <div>
        
    </div>
  )
}

export default Token