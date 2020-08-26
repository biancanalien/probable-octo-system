
# BBank

Bank API with Node and Mongodb

## Installation

```bash
npm i
```

## Usage

```bash
npm start 
```

Open a terminal or a postman and try something at [http://localhost:8000/](http://localhost:8000/)

```sh
curl --location --request POST 'http://localhost:8000/account/deposit' \
--header 'Content-Type: application/json' \
--data-raw '{
    "depositType": "DOC",
    "value": 200.36,
    "branchNumber": "0001",
    "fullAccountNumber": "987276-0",
    "payingSource": {
        "bankName": "Banco Raiz",
        "bankNumber": "123",
        "branchNumber": "2345",
        "fullAccountNumber": "654321-0",
        "clientName": "José Silva"
    }
}'
```

## Running tests

```bash
npm test
```

# References

Integration tests: https://github.com/pawap90/test-mongoose-inmemory

