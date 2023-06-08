export default function handleGetInfo(id, setProfile, setPage) {
    console.log('something')
    fetch(`http://localhost:4000/creator/getCreator/${id}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .then(() => setPage('creator'))
  }