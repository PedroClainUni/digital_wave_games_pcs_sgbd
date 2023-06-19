import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '40s', target: 10 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: [
      {
        threshold: 'p(90) < 15000',
        abortOnFail: true,
        delayAbortEval: 100
      }
    ]
  }
}

export default function () {
  const response = http.post('http://webapp:3006/users', {
    email: `${generateRandomWord()}@email.com`,
    name: generateRandomWord(),
    password: 'pass123'
  })
  check(response, { "status is 200": (r) => r.status === 200 })
  sleep(.300)
}

function generateRandomWord() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let word = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    word += randomLetter;
  }

  return word;
}
