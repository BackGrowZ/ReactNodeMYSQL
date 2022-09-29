import BASE_URL from "./config.js"
import axios from 'axios'

async function getCourse() {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    return(response);
  } catch (error) {
    console.error(error);
  }
}


// const getCourse = () => {
//     axios.get(`${BASE_URL}/courses`)
//   .then(function (response) {
//     // en cas de réussite de la requête
//     console.log(response);
//   })
//   .catch(function (error) {
//     // en cas d’échec de la requête
//     console.log(error);
//   })
//   .then(function () {
//     // dans tous les cas
//   });
//     // fetch(`${BASE_URL}/courses`)
//     //   .then(response => response.json())
//     //   .then(res => {
//     //     return(res)
//     //   })
// }

export { getCourse }