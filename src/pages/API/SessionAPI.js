//Getting session value from server and return it.

export const getSessionValue = async() => {
    try{
        const response = await fetch('https://backend.lsc-crm.in/lscchat/v1.0/sessionvalues', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        const result = await response.json();
        console.log(result);
        return {userRole: result.userRole}
    } catch(error) {
        console.error('Error fetching contact details: '+ error)
    }
}