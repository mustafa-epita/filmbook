
export const loginUser = async (credentials: any) => {

  try {
    const userRes = await fetch(`http://localhost:8092/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
  
    const user = await userRes.json();
  
    return user
  } catch (error) {
    throw(error)
  }

}

export const registerUser = async (credentials: any) => {

  try {
    const userRes = await fetch(`http://localhost:8092/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
  
    const user = await userRes.json();
  
    return user
  } catch (error) {
    throw(error)
  }
}